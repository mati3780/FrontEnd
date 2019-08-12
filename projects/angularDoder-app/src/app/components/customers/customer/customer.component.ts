import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Customer } from '../../../model/customer';
import { CustomerService } from '../../../services/customer.service';
import { Province } from '../../../model/province';
import { ProvinceService } from '../../../services/province.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  id: number;
  customer: Observable<Customer>;
  @ViewChild("form", { static: false }) form: NgForm;
  formData: FormGroup;
  provinces: Province[];
  notFound: boolean = false;

  constructor(private formBuilder: FormBuilder, private customerService: CustomerService, private provinceService: ProvinceService, 
              private route: ActivatedRoute, private router: Router) {
  }

  async ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.formData = this.formBuilder.group({
      name: ["", [Validators.required, Validators.maxLength(200)]],
      address: ["", [Validators.required, Validators.maxLength(300)]],
      provinceId: [null, Validators.required]
    });

    this.provinceService.query().subscribe(result => this.provinces = result);
    this.customer = (this.id ? this.customerService.get(this.id) : of(new Customer()))
                    .pipe(
                      tap(customer => this.formData.patchValue(customer)),
                      catchError(error => {
                        this.notFound = (error as HttpErrorResponse).status == 404;
                        return of<Customer>();
                      }));   
  }

  async onSubmit() {
    if (this.formData.valid) {
      var dto = this.formData.value as Customer;

      try {
        if (!this.id) {
          await this.customerService.post(dto).toPromise();
        } else {
          await this.customerService.put(this.id, dto).toPromise();
        }
      } catch (error) {
        alert(JSON.stringify(error));
        return;
      }
      
      this.router.navigate(["/customers"]);
    }
  }
}