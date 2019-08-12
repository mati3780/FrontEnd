import { Directive, OnInit, ElementRef, ViewContainerRef, TemplateRef, Input } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { PermissionCheckType } from './model/permission-check-type.enum';
import { User } from 'oidc-client';
import { SecurityConfig } from './model/security-config';
import { AuthorizationType } from './model/authorization-type.enum';

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective implements OnInit {
  private permissions: string[] = [];
  private permissionCheckType: PermissionCheckType = PermissionCheckType.atLeastOne;
  private isHidden: boolean = true;

  constructor(private authService: AuthorizationService, private element: ElementRef,
              private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {
              }

  ngOnInit(): void {
    this.authService.onUserLoaded.subscribe((user: User) => {
      this.updateView();
    });
  }

  @Input()
  set hasPermission(permissions: string[]){
    this.permissions = permissions;
    this.updateView();
  }

  @Input()
  set hasPermissionPermissionCheckType(permissionCheckType: PermissionCheckType){
    this.permissionCheckType = permissionCheckType;
    this.updateView();
  }

  private async updateView() {
    if (await this.checkPermission()) {
      if (this.isHidden) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.isHidden = false;
      }
    } else {
      this.isHidden = true;
      this.viewContainer.clear();
    }
  }

  private async checkPermission() : Promise<boolean> {    
    var authorization = await this.authService.authorize(new SecurityConfig(false, this.permissions, this.permissionCheckType)).toPromise();
    return authorization == AuthorizationType.authorized;
  }
}
