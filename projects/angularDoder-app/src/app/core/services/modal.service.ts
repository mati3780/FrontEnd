import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { MessageModalComponent } from '../components/message-modal/message-modal.component';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';
import { ModalResult } from '../model/modal-result.enum';
import { BusyModalComponent } from '../components/busy-modal/busy-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalSvc: NgbModal) {  }

  private busyModalRef: NgbModalRef;

  showMessage(message: string, title: string): Promise<ModalResult> {
    return this.showModalWindow(message, title, MessageModalComponent).then(() => ModalResult.ok, () => ModalResult.ok);
  }

  showConfirm(message: string, title: string): Promise<ModalResult> {
    return this.showModalWindow(message, title, ConfirmModalComponent).then(() => ModalResult.ok, () => ModalResult.cancel);
  }

  showBusy(message: string): void {
    if (!this.busyModalRef) {
      this.busyModalRef = this.modalSvc.open(BusyModalComponent, { centered: true, backdrop: 'static', keyboard: false });
      this.busyModalRef.result.then(() => this.busyModalRef = null);
      this.busyModalRef.componentInstance.message = message;
    }
  }

  showModal(content: any): Promise<any> {
    const modalRef: NgbModalRef = this.modalSvc.open(content, { centered: true });
    return modalRef.result;
  }

  private showModalWindow(message: string, title: string, content: any): Promise<any> {
    const modalRef: NgbModalRef = this.modalSvc.open(content, { centered: true });
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.title = title;
    console.log(modalRef.componentInstance);
    return modalRef.result;
  }
}