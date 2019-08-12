import { Injectable, EventEmitter } from '@angular/core';
import * as Oidc from 'oidc-client';
import { UserManager, User, UserManagerSettings } from 'oidc-client';
import { PermissionCheckType } from './model/permission-check-type.enum';
import { AuthorizationType } from './model/authorization-type.enum';
import { environment } from '../../environments/environment';
import { isArray } from 'util';
import { SecurityConfig } from './model/security-config';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthorizationService {
	private manager: UserManager;

	constructor() {
		if (environment.debugMode) {
			Oidc.Log.logger = console;
			Oidc.Log.level = Oidc.Log.WARN;
		}
		this.manager = new UserManager(getClientSettings());

		this.manager.events.addAccessTokenExpired(event => {
			this.onAccessTokenExpired.emit();
		});
		this.manager.events.addAccessTokenExpiring(event => {
			this.onAccessTokenExpiring.emit();
		});
		this.manager.events.addSilentRenewError(error => {
			this.onSilentRenewError.emit(error);
		});
		this.manager.events.addUserLoaded(user => {
			this.onUserLoaded.emit(user);
		});
		this.manager.events.addUserUnloaded(event => {
			this.onUserUnloaded.emit();
		});
		this.manager.events.addUserSignedOut(user => {
			this.onUserSignedOut.emit(user);
		});
	}

	onUserLoaded: EventEmitter<User> = new EventEmitter(true);
	onUserUnloaded: EventEmitter<any> = new EventEmitter(true);
	onUserSignedOut: EventEmitter<User> = new EventEmitter(true);
	onSilentRenewError: EventEmitter<any> = new EventEmitter(true);
	onAccessTokenExpiring: EventEmitter<any> = new EventEmitter(true);
	onAccessTokenExpired: EventEmitter<any> = new EventEmitter(true);

	getUser(): Observable<User> {
		return from(this.manager.getUser());
	}

	isLoggedIn(): Observable<boolean> {
		return this.getUser().pipe(map(user => !!user && !user.expired));
	}

	getClaims(): Observable<any> {
		return this.getUser().pipe(map(user => !!user ? user.profile : null));
	}

	getAuthorizationHeaderValue(): Observable<string> {
		return this.getUser().pipe(map(user => user ? `${user.token_type} ${user.access_token}` : ""));
	}

	startAuthentication(): Observable<any> {
		return from(this.manager.signinRedirect());
	}

	completeSignIn(): Observable<User> {
		return from(this.manager.signinRedirectCallback());
	}

	completeSignOut(url?: string): Observable<any> {
		return from(this.manager.signoutRedirectCallback(url));
	}

	logout(): Promise<void> {
		return this.manager.signoutRedirect();
	}

	authorize(securityConfig: SecurityConfig): Observable<AuthorizationType> {
		return from(this.authorizeAsync(securityConfig));
	}

	private async authorizeAsync(securityConfig: SecurityConfig): Promise<AuthorizationType> {
		let result = AuthorizationType.authorized;
		let hasPermission = true;

		var isLoggedIn = await this.isLoggedIn().toPromise();
		if (!securityConfig.allowAnonymous && !isLoggedIn) {
			result = AuthorizationType.loginRequired;
		} else if (!securityConfig.allowAnonymous && isLoggedIn && securityConfig.permissions.length === 0) {
			result = AuthorizationType.authorized;
		} else if (securityConfig.permissions.length > 0) {
			let roles: string[] = [];
			var claims = await this.getClaims().toPromise();
			var rolesClaims = claims.role;
			if (isArray(rolesClaims)) { //It may come as a single string if only 1 role
				rolesClaims.forEach(role => roles.push(role.toLowerCase()));
			} else {
				roles = [rolesClaims.toLowerCase()];
			}

			for (let i = 0; i < securityConfig.permissions.length; i++) {
				var permission = securityConfig.permissions[i].toLowerCase();

				if (securityConfig.permissionCheckType == PermissionCheckType.combinationRequired) {
					hasPermission = hasPermission && roles.indexOf(permission) > -1;
					if (!hasPermission) { break; }
				} else if (securityConfig.permissionCheckType == PermissionCheckType.atLeastOne) {
					hasPermission = roles.indexOf(permission) > -1;
					if (hasPermission) { break; }
				}
			}
			result = hasPermission ? AuthorizationType.authorized : AuthorizationType.notAuthorized;
		}
		return result;
	}
}

export function getClientSettings(): UserManagerSettings {
	return {
		authority: environment.authority,
		client_id: environment.client_id,
		redirect_uri: environment.redirect_uri,
		silent_redirect_uri: environment.silent_redirect_uri,
		post_logout_redirect_uri: environment.post_logout_redirect_uri,
		response_type: "id_token token",
		scope: environment.scopes,
		filterProtocolClaims: true,
		loadUserInfo: true,
		automaticSilentRenew: true,
		silentRequestTimeout: environment.silent_renew_offset_in_seconds * 1000,
		userStore: new Oidc.WebStorageStateStore({ store: window.localStorage })
	};
}
