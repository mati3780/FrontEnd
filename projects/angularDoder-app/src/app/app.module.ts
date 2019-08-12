import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faInfoCircle, faUserCircle, faSignOutAlt, faSignInAlt, faUsers, faPlusCircle, faExclamationTriangle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { } from '@fortawesome/free-regular-svg-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { ItemNotFoundComponent } from './components/item-not-found/item-not-found.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CustomersComponent } from './components/customers/customers/customers.component';
import { CustomerComponent } from './components/customers/customer/customer.component';
import { CoreModule } from './core/core.module';

library.add(faHome, faInfoCircle, faUserCircle, faSignOutAlt, faSignInAlt, faUsers, faPlusCircle, faExclamationTriangle, faEdit, faTrash);

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    ItemNotFoundComponent,
    NotFoundComponent,
    CustomersComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
