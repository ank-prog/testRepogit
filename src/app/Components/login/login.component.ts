import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  login!: FormGroup;
  email = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/),
  ]);
  pwdPattern = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$";
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(this.pwdPattern)
  ]);
  submitted : boolean = false;

  constructor(
    private http: HttpClient,
    private route: Router,
    private fb: FormBuilder
  ) {
    this.login = this.fb.group({
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit() {}

  loginData(login: FormGroup) {
    this.submitted = true;
    if (this.login.invalid) {
      return;
    }
    if(this.submitted){
      console.log('djkshdu', login);
      this.http.get<any>('http://localhost:3000/signup').subscribe((res) => {
        console.log('res', res);
        const user = res.find((a: any) => {
          console.log('a', a);
          return (
            a.email === this.login.value.email &&
            a.password === this.login.value.password
          );
        });
  
        if (user) {
          alert('you are successfully logged In !!');
          this.login.reset();
          this.route.navigateByUrl('/dashboard');
        } else {
          alert('user not found');
          this.route.navigate(['login']);
        }
      });
    }
   
  }
}
