import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Employee } from 'src/app/models/employee.model';
import { Role } from 'src/app/models/role.model';
import { EmployeeRequest } from 'src/app/models/employee-request.model';

@Component({
  selector: 'app-employee-registrer',
  templateUrl: './employee-registrer.component.html',
  styleUrls: ['./employee-registrer.component.css']
})
export class EmployeeRegistrerComponent implements OnInit {

  employeeRegisterForm :FormGroup;
  loading = false;
  submitted = false;
  error = '';
  employee :EmployeeRequest;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('password_repeat').value;
    return pass === confirmPass ? null : { notSame: true }     
  }

  ngOnInit(): void {
    this.employee = new EmployeeRequest();
    this.employee.user_attributes = new User();

    this.employeeRegisterForm = this.formBuilder.group({
        name: ['', Validators.required],
        lastname: ['', Validators.required],
        username: ['', Validators.required],
        age: ['', Validators.required],
        password: ['', Validators.required],
        password_repeat: ['', Validators.required],
    },{validators: this.checkPasswords});

  }
  get f() { return this.employeeRegisterForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.employeeRegisterForm.invalid) {
        return;
    }
    this.employee.user_attributes.name = this.f.name.value;
    this.employee.user_attributes.lastname = this.f.lastname.value;
    this.employee.user_attributes.username = this.f.username.value;
    this.employee.user_attributes.password = this.f.password.value;
    this.employee.age =  this.f.age.value;
    this.loading = true;
    this.userService.createEmployee(this.employee)
    .pipe(first())
    .subscribe(data=>{
      this.router.navigate(['/home']);
    },error=>{
      if(this.f.password !== this.f.password_repeat){
        alert("Las contraseñas no coinciden");
      } else{
        alert("Ha occurrido un error");
      }
    }
      );
}

}
