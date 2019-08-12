import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../model/customer';
import { ResourceBaseService } from '../core/services/resource-base.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends ResourceBaseService<Customer> {
  constructor(http: HttpClient) {
		super(http);
	}

	protected apiPath(): string {
		return 'api/v1/customers';
	}

}