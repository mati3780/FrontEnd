import { BusyInterceptor } from './busy-interceptor';
import { TestBed } from '@angular/core/testing';
import { BusyService } from '../services/busy.service';

describe('BusyInterceptor', () => {
  it('should create an instance', () => {
    const service: BusyService = TestBed.get(BusyService);
    expect(new BusyInterceptor(service)).toBeTruthy();
  });
});
