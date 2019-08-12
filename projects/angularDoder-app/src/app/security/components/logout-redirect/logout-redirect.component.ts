import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../authorization.service';

@Component({
  selector: 'app-logout-redirect',
  templateUrl: './logout-redirect.component.html',
  styleUrls: ['./logout-redirect.component.scss']
})
export class LogoutRedirectComponent implements OnInit {

  constructor(private authService: AuthorizationService, private router: Router) { }

  async ngOnInit() {
    await this.authService.completeSignOut();
    await this.router.navigateByUrl("", { replaceUrl: true });
  }
}
