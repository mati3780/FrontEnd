import { Directive, Renderer2, ElementRef, OnInit, Input } from '@angular/core';
import { NgForm, NgControl, FormGroup, FormControl } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';

@Directive({
  selector: '[showValidation]'
})
export class ShowValidationDirective implements OnInit {
  @Input() form: NgForm;
  private formGroup: FormGroup;
  private formControl: FormControl;

  constructor(private renderer: Renderer2, private el: ElementRef, private control: NgControl) {
  }

  ngOnInit() {
    this.formGroup = this.form.form;
    this.formControl = this.formGroup.controls[this.control.name] as FormControl;
    
    this.control.statusChanges.pipe(distinctUntilChanged()).subscribe(value => this.toggleValidity(value));
    this.form.ngSubmit.subscribe(() => this.toggleValidity(this.control.status));
  }

  private toggleValidity(value: any) {
    if (value == "INVALID") {
      this.renderer.removeClass(this.el.nativeElement, "is-valid");
      this.renderer.addClass(this.el.nativeElement, "is-invalid");
    }
    else {
      this.renderer.removeClass(this.el.nativeElement, "is-invalid");
      this.renderer.addClass(this.el.nativeElement, "is-valid");
    }
  }
}
