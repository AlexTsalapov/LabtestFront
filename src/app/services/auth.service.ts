import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from "rxjs";
import {AuthRequest} from "../models/auth-request.model";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient,private cookieService: CookieService) {}

    public login(authRequest: AuthRequest): Observable<boolean> {
       return  this.http.post('http://localhost:8881/login', authRequest).pipe(
            map((response: any) => {
                this.cookieService.set('token', response.token);
                this.cookieService.set('role', response.role);

                if (response.token !== null) {
                    return true;
                }
                return false;
            })
        );

    }
}
