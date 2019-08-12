import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { tap, mergeMap } from 'rxjs/operators';
import { AuthorizationService } from "./authorization.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(private authService: AuthorizationService){
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return this.authService.getAuthorizationHeaderValue()
			.pipe(mergeMap((authHeader: string) => {
				if (authHeader) {
					request = request.clone({setHeaders: { Authorization: authHeader }});
				}
				return next.handle(request)
							.pipe(
								tap((event: HttpEvent<any>) => {
									if (event instanceof HttpResponse) {
										// do stuff with response if needed
									}
								}, (err: any) => {
									if (err instanceof HttpErrorResponse && err.status === 403) {
										alert('No tiene permisos para la operación que intentó realizar');
										// redirect to the login route
										// or show a modal									
									}
								}));
			}));
	}
}
