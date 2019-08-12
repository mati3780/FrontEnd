import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  constructor() {
  }

  @Output() busyBegin: EventEmitter<BusyBeginEvent> = new EventEmitter<BusyBeginEvent>(true);
  @Output() busyEnd: EventEmitter<BusyEndEvent> = new EventEmitter<BusyEndEvent>(true);
}

export interface BusyBeginEvent {
	request: HttpRequest<any>;
}

export interface BusyEndEvent {
	response: HttpResponse<any> | HttpErrorResponse;
	remaining: number;
}