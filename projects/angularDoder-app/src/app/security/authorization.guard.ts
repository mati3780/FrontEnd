import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityConfig } from './model/security-config';
import { AuthorizationType } from './model/authorization-type.enum';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private authService: AuthorizationService) {    
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.canActivateAsync(next, state);
  }
  
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.canActivateAsync(next, state);
  }
  
  private async canActivateAsync(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		var securityConfig: SecurityConfig = next.data.security; // as SecurityConfig;
		var result = await this.authService.authorize(securityConfig).toPromise();
		if (result == AuthorizationType.notAuthorized)
			this.router.navigate(["/forbidden"]);
		else if (result == AuthorizationType.loginRequired) {
			window.sessionStorage.setItem("returnUrl", state.url);
			this.authService.startAuthentication();
		}
		return result == AuthorizationType.authorized;
	}
}
