import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortableHeaderDirective } from './directives/sortable-header.directive';
import { DataTableComponent } from './components/data-table/data-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
library.add(faSpinner);

import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { ValidationMessagesComponent } from './components/validation-messages/validation-messages.component';
import { ShowValidationDirective } from './directives/show-validation.directive';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { MessageModalComponent } from './components/message-modal/message-modal.component';
import { BusyInterceptor } from './interceptors/busy-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BusyService } from './services/busy.service';
import { ModalService } from './services/modal.service';
import { BusyModalComponent } from './components/busy-modal/busy-modal.component';

@NgModule({
  declarations: [
    SortableHeaderDirective,
    DataTableComponent,
    BreadcrumbComponent,
    HeaderComponent,
    ValidationMessageComponent,
    ValidationMessagesComponent,
    ShowValidationDirective,
    ConfirmModalComponent,
    MessageModalComponent,
    BusyModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [
    SortableHeaderDirective,
    DataTableComponent,    
    BreadcrumbComponent,
    HeaderComponent,
    ValidationMessageComponent,
    ValidationMessagesComponent,
    ShowValidationDirective,
    ConfirmModalComponent,
    MessageModalComponent,
    BusyModalComponent
  ],
  providers: [
    BusyService,
    ModalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BusyInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    ConfirmModalComponent,
    MessageModalComponent,
    BusyModalComponent
  ]
})
export class CoreModule { }
