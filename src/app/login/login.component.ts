import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ApiserviceService } from '../services/apiservice.service';
import { CustomerserviceService } from '../services/customerservice.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private baseurl: string ='http://localhost:9000/login';

  email = 'demo@gmail.com';
  password = 'demo123';

  constructor(private api: ApiserviceService, private customer: CustomerserviceService, private router: Router) {
  }

  tryLogin() {
    this.api.login(
      this.email,
      this.password
    )
      .subscribe(
        r => {
          if (r.token) {
            this.customer.setToken(r.token);
            this.router.navigateByUrl('/dashboard');
          }
        },
        r => {
          alert(r.error.error);
        });
  }

  ngOnInit() {};

     
  // login(username: string, password: string) {
  //   return  (username, password);
  //  }
}
