

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiResponse } from '../models/api-service';
import { environment } from '../../../environment/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    body?: any,
  ): Promise<ApiResponse<T>> {

    let token=localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    });

    const url = `${environment.apiUrl}${endpoint}`;

    try {
      let response: ApiResponse<T>;

      switch (method) {
        case 'GET':
          response = await lastValueFrom(
            this.http.get<ApiResponse<T>>(url, { headers })
          );
          break;

        case 'POST':
          response = await lastValueFrom(
            this.http.post<ApiResponse<T>>(url, body, { headers })
          );
          break;

        case 'PUT':
          response = await lastValueFrom(
            this.http.put<ApiResponse<T>>(url, body, { headers })
          );
          break;

        case 'DELETE':
          response = await lastValueFrom(
            this.http.delete<ApiResponse<T>>(url, { headers })
          );
          break;

        default:
          throw new Error('Invalid method');
      }

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
