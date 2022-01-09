import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class Auth implements CanActivate {
    constructor(private router: Router) { }

    canActivate() {
        const isLogin = localStorage.getItem('tooken');
        const role = localStorage.getItem('role');
        if (isLogin && role && role == "[ROLE_Admin]") {
            return true;
        }
        this.router.navigate(['/passport/login']);
        return false;
    }
}