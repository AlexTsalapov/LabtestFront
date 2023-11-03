import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {map, Observable, of, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private http: HttpClient) {
    }
    getAllSensors(): Observable<any> {
        return this.http.get(`http://localhost:8881/sensors/all`)
            .pipe(
                map(() => true),
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        return of(false)
                    }
                    return of(true);
                })
            );
    }

    canActivate(): Observable<boolean> {

       return  this.getAllSensors().pipe(
            map((success) => {
                if (success) {
                    return true; // Доступ разрешен, есть действительный токен.
                } else {
                    this.router.navigate(['/login']);
                    return false; // Доступ запрещен, нет действительного токена.
                }
            })
        );
    }
}
