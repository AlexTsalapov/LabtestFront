import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {AuthRequest} from "../../models/auth-request.model";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginData = {
        username: '',
        password: '',
    };


    constructor(private router: Router, private authService: AuthService) {
    }

    redirect() {
        this.router.navigate(['/sensors']);
    }

    onSubmit() {
        const authRequest: AuthRequest = {
            username: this.loginData.username,
            password: this.loginData.password
        };

        this.authService.login(authRequest).subscribe((isAuthenticated) => {
            console.log(isAuthenticated)
            if (isAuthenticated) {
                console.log(isAuthenticated)
                this.redirect()
            }
        });
    }
}
