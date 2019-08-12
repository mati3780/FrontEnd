import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
library.add(faSpinner);

import { HasPermissionDirective } from './has-permission.directive';
import { AuthorizationService } from './authorization.service';
import { TokenInterceptor } from './token-interceptor';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { LogoutRedirectComponent } from './components/logout-redirect/logout-redirect.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    HasPermissionDirective,
    ForbiddenComponent,
    LogoutRedirectComponent,
    RedirectComponent,
    UnauthorizedComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    ForbiddenComponent,
    LogoutRedirectComponent,
    RedirectComponent,
    UnauthorizedComponent
  ],
  providers: [
    AuthorizationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class SecurityModule { }
