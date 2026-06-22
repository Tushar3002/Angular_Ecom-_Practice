import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastr=inject(ToastrService)
  success(message: string) {
    this.toastr.success(message);
  }

  error(message: string) {
    this.toastr.error(message);
  }
}
