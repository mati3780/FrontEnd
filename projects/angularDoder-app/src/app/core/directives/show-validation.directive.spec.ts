import { ShowValidationDirective } from './show-validation.directive';
import { TestBed } from '@angular/core/testing';

describe('ShowValidationDirective', () => {
  it('should create an instance', () => {
    const directive = TestBed.get(ShowValidationDirective);
    expect(directive).toBeTruthy();
  });
});
