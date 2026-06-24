import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiResponse } from '../../models/api-service';
import { environment } from '../../../../environment/environment';
import { lastValueFrom } from 'rxjs';
import { LoadService } from '../LoadService/load-service';
import { ToastService } from '../ToastService/toast-service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // private baseUrl = 'http://localhost:5000/api';
  apiOptions = {
    showToaster: true,
    showLoader: true,
    useToken: true,
  };

  constructor(
    private http: HttpClient,
    private loader: LoadService,
    private toast: ToastService,
  ) {}

  async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    body?: any,
    apiOptions: Partial<typeof this.apiOptions> = {},
  ): Promise<ApiResponse<T>> {
    // let token = localStorage.getItem('token');
    const options = {
      ...this.apiOptions,
      ...apiOptions,
    };
    if (options.showLoader) {
      this.loader.show();
    }

    let token: string | null = null;

    if (options.useToken) {
      token = localStorage.getItem('token');
    }
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   ...(token && { Authorization: `Bearer ${token}` }),
    // });

    // const headersConfig: any = {
    //   ...(token && { Authorization: `Bearer ${token}` }),
    // };

    // if (!(body instanceof FormData)) {
    //   headersConfig['Content-Type'] = 'application/json';
    // }

    // const headers = new HttpHeaders(headersConfig);

    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    const url = `${environment.apiUrl}${endpoint}`;

    try {
      let response: ApiResponse<T>;

      switch (method) {
        case 'GET':
          response = await lastValueFrom(this.http.get<ApiResponse<T>>(url, { headers }));
          break;

        case 'POST':
          response = await lastValueFrom(this.http.post<ApiResponse<T>>(url, body, { headers }));
          break;

        case 'PUT':
          response = await lastValueFrom(this.http.put<ApiResponse<T>>(url, body, { headers }));
          break;

        case 'DELETE':
          response = await lastValueFrom(this.http.delete<ApiResponse<T>>(url, { headers }));
          break;

        default:
          throw new Error('Invalid method');
      }

      if (options.showToaster) {
        this.toast.success(response.message!);
      }

      return response;
    } catch (error: any) {
      if (options.showToaster) {
        this.toast.error(error.error?.message || error.message || 'Request failed');
      }

      throw error;
    } finally {
      if (options.showLoader) {
        this.loader.hide();
      }
    }
  }
}
