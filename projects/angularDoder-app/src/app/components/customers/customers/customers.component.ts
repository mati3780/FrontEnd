import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { Customer } from '../../../model/customer';
import { PageChangedEvent } from '../../../core/components/data-table/data-table.component';
import { SortDirection } from '../../../core/directives/sortable-header.directive';
import { Page } from '../../../core/model/page';
import { ModalService } from '../../../core/services/modal.service';
import { ModalResult } from '../../../core/model/modal-result.enum';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  constructor(private customerService: CustomerService, private modalService: ModalService) { }

  ngOnInit() {
    this.onPageChange({offset: 0, limit: 5, sortCol: "name", sortDir: "asc"});
  }

  loading: boolean = true;
  page: Page<Customer> = new Page<Customer>();
  sortCol: string;
  sortDir: SortDirection;

  onPageChange({offset, limit, sortCol, sortDir}: PageChangedEvent) {
    this.sortCol = sortCol;
    this.sortDir = sortDir;
    this.customerService.queryPage(offset, limit, sortCol, sortDir === 'desc')
                        .subscribe(page => this.page = page);
  }

  async delete(id: number) {
    if (await this.modalService.showConfirm("Are you sure you want to delete the selected item?", 
                                            "Delete customer") == ModalResult.ok) {
      await this.customerService.delete(id).toPromise();
      this.onPageChange({offset: 0, limit: this.page.pager.limit, sortCol: this.sortCol, sortDir: this.sortDir});
    }
  }
}
