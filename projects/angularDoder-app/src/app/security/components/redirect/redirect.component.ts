import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../authorization.service';

@Component({
	selector: 'app-redirect',
	templateUrl: './redirect.component.html',
	styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {
	constructor(private authService: AuthorizationService, private router: Router) { }

	async ngOnInit() {
		try {
			var user = await this.authService.completeSignIn().toPromise();
			let returnUrl = window.sessionStorage.getItem("returnUrl");
			if (returnUrl) {
				window.sessionStorage.removeItem("returnUrl");
				this.router.navigateByUrl(returnUrl, { replaceUrl: true });
			} else{
				this.router.navigate(["/"], { replaceUrl: true });
			}
		} catch (error) {
			// this.router.navigateByUrl("", { replaceUrl: true });
			this.router.navigate(["/unauthorized"], { replaceUrl: true });
		}
	}
}