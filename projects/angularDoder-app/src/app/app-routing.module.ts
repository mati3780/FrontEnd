import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityModule } from './security/security.module';
import { RedirectComponent } from './security/components/redirect/redirect.component';
import { LogoutRedirectComponent } from './security/components/logout-redirect/logout-redirect.component';
import { UnauthorizedComponent } from './security/components/unauthorized/unauthorized.component';
import { ForbiddenComponent } from './security/components/forbidden/forbidden.component';
import { AuthorizationGuard } from './security/authorization.guard';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CustomersComponent } from './components/customers/customers/customers.component';
import { CustomerComponent } from './components/customers/customer/customer.component';

const routes: Routes = [
	{
		path: 'redirect',
		component: RedirectComponent
	},
	{
		path: 'logoutredirect',
		component: LogoutRedirectComponent
	},
	{
		path: 'unauthorized',
		component: UnauthorizedComponent
	},
	{
		path: 'forbidden',
		component: ForbiddenComponent
	},
	{
		path: '',
		component: HomeComponent,
		data: {
			header: {
				title: 'Home',
				subtitle: ''
			},
			breadcrumb: "Home"
		}
	},
	{		
		path: 'customers',
		canActivateChild: [AuthorizationGuard],
		data: {
			breadcrumb: 'Customers'
		},
		children: [			
			{
				path: 'new',
				component: CustomerComponent,
				data: {
					header: {
						title: 'Customers',
						subtitle: 'New'
					},
					breadcrumb: 'New',
					security: {
						permissions: ['admin']
					}
				}
			},
			{
				path: ':id',
				component: CustomerComponent,
				data: {
					header: {
						title: 'Customers',
						subtitle: 'Edit'
					},
					breadcrumb: 'Edit',
					security: {
						permissions: ['admin']
					}
				}
			},
			{
				path: '',
				component: CustomersComponent,
				data: {
					header: {
						title: 'Customers',
						subtitle: 'List'
					},
					//breadcrumb: "List",
					security: {
						permissions: ['admin']
					}
				}
			}
		]	
	},
	{
		path: 'about',
		component: AboutComponent,
		canActivate: [AuthorizationGuard],
		data: {
			header: {
				title: 'About',
				subtitle: ''
			},
			breadcrumb: "About",
			security: {
				permissions: ['admin']
			}
		}
	},
	{
		path: 'notfound',
		component: NotFoundComponent
	},
	{	//NEEDS TO STAY AT THE END!
		path: '**',
		component: NotFoundComponent
	}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    SecurityModule
  ],
  providers: [
    AuthorizationGuard
  ],
  exports: [
    RouterModule,
    SecurityModule
  ]
})
export class AppRoutingModule { }
