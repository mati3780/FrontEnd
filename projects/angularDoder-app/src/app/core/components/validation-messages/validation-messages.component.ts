import { Component, OnInit, ContentChildren, QueryList, Input, AfterContentInit } from '@angular/core';
import { ValidationMessageComponent } from '../validation-message/validation-message.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'validation-messages',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.scss']
})
export class ValidationMessagesComponent implements OnInit, AfterContentInit {
  @Input() form: NgForm;
  @Input() controlName: string;
  
  @Input()
  @ContentChildren(ValidationMessageComponent)
  messages: QueryList<ValidationMessageComponent>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.messages.forEach(message => {
      message.initialize(this.form, this.controlName);
    });
  }
}
