import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showLoading = false;
  submitted = false;
  serviceError = false;
  
  constructor(private formBuilder: FormBuilder, private apiservice: ApiService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }
  get f() { return this.loginForm.controls; }
  doLogin() {
    this.submitted = true;
    
    if (this.loginForm.invalid) {
        return;
    }
    this.showLoading = true;
    let userName = this.loginForm.get(['name']).value;
    this.apiservice.doLogin(userName).subscribe((res: any)=>{
      this.showLoading = false;
      if(res.id != undefined){
        localStorage.setItem("id",res.id);
        localStorage.setItem("name", userName);
        this.router.navigateByUrl("/messaging");
      } else{
        this.serviceError = true;
      }
     console.log(res);  
    });
}

}
