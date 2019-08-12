import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CoreModule } from '../core.module';
import { Page } from '../model/page';

@Injectable({
  providedIn: CoreModule
})
export abstract class ResourceBaseService<T> {
	protected constructor(protected http: HttpClient) {
	}

	protected abstract apiPath(): string;

	protected apiUrl(): string {
		return `${environment.apiUrl}${this.apiPath()}`;
	}

	queryPage(offset: number, limit: number, sort: string, sortDesc: boolean = false, params?: {[param:string]: string | string[]}): Observable<Page<T>> {
		var queryParams = new HttpParams({ fromObject: params })
									.set('offset', offset ? offset.toString() : "0")
									.set('limit', limit ? limit.toString() : "10");

		if (sort != '') {
			var sortDir = sortDesc ? '-' : '';
			queryParams = queryParams.set('sort', `${sortDir}${sort}`);
		}
		return this.http.get<Page<T>>(this.apiUrl(), { params: queryParams });
	}

	query(params?: {[param:string]: string | string[]}): Observable<T[]> {
		return this.http.get<T[]>(this.apiUrl(), { params: params });
	}

	get(id: number): Observable<T> {
		return this.http.get<T>(`${this.apiUrl()}/${id}`);
	}

	post(item: T): Observable<HttpResponse<any>> {
		return this.http.post<HttpResponse<any>>(this.apiUrl(), item, { observe: 'response', responseType: 'json' });
	}

	put(id: number, item: T): Observable<HttpResponse<any>> {
		return this.http.put<HttpResponse<any>>(`${this.apiUrl()}/${id}`, item, { observe: 'response', responseType: 'json' });
	}

	delete(id: number): Observable<HttpResponse<any>> {
		return this.http.delete<HttpResponse<any>>(`${this.apiUrl()}/${id}`, { observe: 'response', responseType: 'json' });
	}
}
