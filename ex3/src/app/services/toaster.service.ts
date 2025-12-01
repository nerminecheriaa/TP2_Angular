// core/services/toast.service.ts
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  constructor(private toastr: ToastrService) { }

  showSuccess(message: string, title: string = 'Succès') {
    this.toastr.success(message, title, {
      timeOut: 3000,
      positionClass: 'toast-top-right'
    });
  }

  showError(message: string, title: string = 'Erreur') {
    this.toastr.error(message, title, {
      timeOut: 4000,
      positionClass: 'toast-top-right'
    });
  }

  showWarning(message: string, title: string = 'Attention') {
    this.toastr.warning(message, title, {
      timeOut: 3500,
      positionClass: 'toast-top-right'
    });
  }

  showInfo(message: string, title: string = 'Information') {
    this.toastr.info(message, title, {
      timeOut: 3000,
      positionClass: 'toast-top-right'
    });
  }
}
