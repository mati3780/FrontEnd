import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Province } from '../model/province';
import { ResourceBaseService } from '../core/services/resource-base.service';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService extends ResourceBaseService<Province> {
  constructor(http: HttpClient) {
    super(http);
  }

  protected apiPath(): string {
    return 'api/v1/provinces';
  }

}