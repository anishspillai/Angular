import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  constructor(private http: HttpClient) { }

  sendEmail(name, email, message) {
    const uri = 'http://localhost:8000/api/sendEmail';
    const obj = {
      name: name,
      email: email,
      message: message,
    };
    return this.http.post(uri, obj);
  }}
