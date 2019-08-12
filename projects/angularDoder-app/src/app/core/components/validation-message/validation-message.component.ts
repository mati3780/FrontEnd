import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent implements OnInit {
  @Input() form: NgForm;
  @Input() controlName: string;
  @Input() error: string;

  visible: boolean;

  constructor() { }

  ngOnInit() {
  }

  initialize(form: NgForm, controlName: string) {
    this.form = form;
    this.controlName = controlName;

    this.form.form.controls[controlName]
                    .statusChanges.pipe(distinctUntilChanged())
                    .subscribe(value => this.toggleVisibility());
    this.form.ngSubmit.subscribe(() => this.toggleVisibility());
  }

  private toggleVisibility() {
    this.visible = this.form.hasError(this.error, this.controlName);
  }

}