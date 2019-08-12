import { Component, OnInit, Input, TemplateRef, Output, EventEmitter, 
         QueryList, AfterViewInit, AfterContentInit, ContentChildren, ViewEncapsulation } from '@angular/core';
import { SortDirection, SortableHeaderDirective, SortEvent } from '../../directives/sortable-header.directive';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataTableComponent implements OnInit, AfterViewInit, AfterContentInit {
  constructor() { }

  ngOnInit() {
    this.limit = this.limits[0];
  }

  ngAfterViewInit(): void {
  }

  ngAfterContentInit(): void {
    this.sortableHeaders.changes.subscribe((headers: QueryList<SortableHeaderDirective>) => {
      headers.forEach(header => header.sort.subscribe((event: SortEvent) => this.onSort(event)));
      var sortHeader = headers.find(h => h.direction !== '');
      if (sortHeader) {
        this.sortColumn = sortHeader.sortable;
        this.sortDirection = sortHeader.direction;
      }      
    });
  }

  @Input() tableClass: string;
  @Input() headerClass: string;
  @Input() tableHeader: TemplateRef<any>;
  @Input() tableBody: TemplateRef<any>;
  @Input() tableBodyEmpty: TemplateRef<any>;
  @Input() tableFoot: TemplateRef<any>;
  @Input() rows: any[];
  @Input() offset: number;
  @Input() limit: number;
  @Input() count: number;
  @Input() limits: number[] = [5,10,15];
  
  @ContentChildren(SortableHeaderDirective, { descendants: true }) sortableHeaders: QueryList<SortableHeaderDirective>;

  @Output() pageChanged: EventEmitter<PageChangedEvent> = new EventEmitter<PageChangedEvent>();
  
  get _limit(): number {
    return this.limit;
  }
  set _limit(value: number) {
    this.pageChanged.emit({offset: 0, limit: value, sortCol: this.sortColumn, sortDir: this.sortDirection});
  }

  get pageNumber(): number {
    return (this.offset / this.limit) + 1;
  }
  set pageNumber(value: number) {
    var offset = (value - 1) * this.limit;
    this.pageChanged.emit({ offset: offset, limit: this.limit, sortCol: this.sortColumn, sortDir: this.sortDirection });
  }

  // private sortColumnValue: string;
  // @Output() sortColumnChange = new EventEmitter();
  @Input() sortColumn: string;
  // get sortColumn(): string {
  //   return this.sortColumnValue;
  // }
  // set sortColumn(value: string) {
  //   console.log("sortColumn_set", this.sortColumnValue, value);
  //   this.sortColumnValue = value;
  //   this.sortColumnChange.emit(this.sortColumnValue);
  // }

  // sortDirectionValue: SortDirection;
  // @Output() sortDirectionChange = new EventEmitter();
  @Input() sortDirection: SortDirection;
  // get sortDirection(): SortDirection {
  //   return this.sortDirectionValue;
  // }
  // set sortDirection(value: SortDirection) {
  //   this.sortDirectionValue = value;
  //   this.sortDirectionChange.emit(this.sortDirectionValue);
  // }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.sortableHeaders.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.sortColumn = column;
    this.sortDirection = direction;
    this.pageChanged.emit({ offset: this.offset, limit: this.limit, sortCol: column, sortDir: direction});
  }
}

export interface PageChangedEvent {
  offset: number;
  limit: number;
  sortCol: string;
  sortDir: SortDirection
}