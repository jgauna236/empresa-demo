import { Component, OnInit } from '@angular/core';
import { EmployerRequest } from 'src/app/models/employer-request.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { first } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  employerRegisterForm :FormGroup;
  loading = false;
  submitted = false;
  error = '';
  employer :EmployerRequest;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private loginService: LoginService
    
    ) {
      if (this.loginService.isLoggedIn()) { 
          this.router.navigate(['/home']);
      }    
    }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('password_repeat').value;
    return pass === confirmPass ? null : { notSame: true }     
  }

  ngOnInit(): void {
    this.employer = new EmployerRequest();
    this.employer.user_attributes = new User();

    this.employerRegisterForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      password_repeat: ['', Validators.required],
    },{validators: this.checkPasswords});

  }
  
  get f() { return this.employerRegisterForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.employerRegisterForm.invalid) {
        return;
    }
    this.employer.user_attributes.name = this.f.name.value;
    this.employer.user_attributes.lastname = this.f.lastname.value;
    this.employer.user_attributes.username = this.f.username.value;
    this.employer.user_attributes.password = this.f.password.value;
    this.loading = true;
    this.userService.createEmployer(this.employer)
    .pipe(first())
    .subscribe(data=>{
      this.router.navigate(['/home']);
    },error=>{
      if(this.f.password !== this.f.password_repeat){
        alert("Las contraseñas no coinciden");
      } else{
        alert("Ha occurrido un error");
      }
      this.loading = false;
      return;
    }
      );
}

}
