import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BusyService } from '../services/busy.service';

@Injectable()
export class BusyInterceptor implements HttpInterceptor {
	private total: number = 0;
	private completed: number = 0;

	constructor(private busyService: BusyService) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (this.checkIfRequestApplies(req)) {
			this.total++;
			this.busyService.busyBegin.emit({
				request: req.clone()
			});
		}

		return next.handle(req)
				   .pipe(tap((event: HttpEvent<any>) => {
						if (event instanceof HttpResponse && this.checkIfRequestApplies(req)) {
							this.handleResponse((event as HttpResponse<any>).clone());
						}
				   }, (err: any) => {
						if (err instanceof HttpErrorResponse && this.checkIfRequestApplies(req)) {
							var errorResponse = err as HttpErrorResponse;
							this.handleResponse(errorResponse);
						}
				   }));
	}

	private checkIfRequestApplies(request: HttpRequest<any>) {
		return !(request.headers.has("x-notbusy") || request.params.has("x-notbusy"));
	}

	private complete(): void {
		this.total = this.completed = 0;
	}

	private handleResponse(response: HttpResponse<any> | HttpErrorResponse): void {
		this.busyService.busyEnd.emit({
			response: response,
			remaining: this.total - ++this.completed
		});

		if (this.completed >= this.total) {
			this.complete();
		}
	}
}
