import { HasPermissionDirective } from './has-permission.directive';
import { AuthorizationService } from './authorization.service';
import { ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';

describe('HasPermissionDirective', () => {
  it('should create an instance', () => {
    const directive = new HasPermissionDirective(new AuthorizationService(), new ElementRef<any>(""), {} as TemplateRef<any>, {} as ViewContainerRef);
    expect(directive).toBeTruthy();
  });
});
