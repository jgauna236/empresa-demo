import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private loginService: LoginService,
  ) { 
      // redirect to home if already logged in
      if (this.loginService.isLoggedIn()) { 
          this.router.navigate(['/home']);
      }
  }

  ngOnInit() {

      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.loginService.login(this.f.username.value, this.f.password.value)
          .pipe(first())
          .subscribe(
              data => { 
                this.loginService.register(this.f.username.value)
                .pipe(first())
                .subscribe(
                  data=>{
                    this.router.navigate(['/home'])
                },error=>{
                    this.error = error;
                    this.loading = false;
                }
                );
              },
              error => {
                  this.error = error;
                  this.loading = false;
              });
  }

  
    public isEmployee() :boolean{
        return (localStorage.getItem("current_user_role")!==null && localStorage.getItem("current_user_role")==="employee")
    }

    public isEmployer() :boolean{
        return (localStorage.getItem("current_user_role")!==null && localStorage.getItem("current_user_role")==="employer")
    }
    
}
