import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import {CanActivate, Router,} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  
  
  constructor(public auth:AuthService, public router:Router ) { }
  canActivate():boolean {
    if(this.auth.isLoggedIn()){
      return true
    }else{
      this.router.navigate(['/login'])
    }
  }
}
