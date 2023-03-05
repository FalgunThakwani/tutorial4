import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm !:FormGroup;
  username!: FormControl;
  password!: FormControl;
  private postUrl = 'https://express-t4.onrender.com/api/login';
  hide: boolean = true;


  constructor(private http: HttpClient,private fb:FormBuilder,private router: Router) { }

  options = {
    headers: { 'Content-Type': 'application/json' },
    observe: 'response' as 'response',
    responseType: 'json'
  };
  ngOnInit(): void {
    this.loginForm=this.fb.group({
      username: this.username,
      password: this.password
    })
  }

  onSubmit(){
    const body = {
      "username" : this.loginForm.get('username')!.value,
      "password" : this.loginForm.get('password')!.value
      };
    this.http.post(this.postUrl, body).subscribe(response => {
      this.router.navigate(["/profile-listing"]);
    });
  }

}
