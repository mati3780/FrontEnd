import { Component, OnInit, Input } from '@angular/core';
import { BusyService, BusyEndEvent } from '../../services/busy.service';
import { filter } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-busy-modal',
  templateUrl: './busy-modal.component.html',
  styleUrls: ['./busy-modal.component.scss']
})
export class BusyModalComponent implements OnInit {

  constructor(private busyService: BusyService, private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.busyService.busyEnd
                    .pipe(filter(x => x.remaining === 0))
                    .subscribe((endEvent: BusyEndEvent) => this.activeModal.close(endEvent));
  }

  @Input() message: string;

}
