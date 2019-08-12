import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService } from './security/authorization.service';
import { User } from 'oidc-client';
import { BusyService } from './core/services/busy.service';
import { ModalService } from './core/services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularDoder - App';
  isCollapsed = true;
  isLoggedIn: boolean = false;
  user: User;

  constructor(private authService: AuthorizationService, private route: ActivatedRoute, private busyService: BusyService, private modalService: ModalService) {
  }

  ngOnInit() {
    this.busyService.busyBegin.subscribe(() => this.modalService.showBusy("Processing..."));

    this.authService.getUser().subscribe(user => this.user = user);
    this.authService.isLoggedIn().subscribe(loggedIn => this.isLoggedIn = loggedIn);
    this.authService.onUserLoaded.subscribe((user: User) => {
      this.user = user;
      this.isLoggedIn = true;
    });
    this.authService.onAccessTokenExpired.subscribe(() => {
      this.user = null;
      this.isLoggedIn = false;
      var currentRoute = this.route;
      while (currentRoute.firstChild) {
        currentRoute = currentRoute.firstChild;
      }
      if (currentRoute.routeConfig.data && currentRoute.routeConfig.data.security && !currentRoute.routeConfig.data.security.allowAnonymous) {
        this.authService.startAuthentication().subscribe();
      }
    });
  }

  login(): void {
    this.authService.startAuthentication();
  }

  logout(): void {
    this.authService.logout();
  }
}
