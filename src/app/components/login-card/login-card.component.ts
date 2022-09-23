import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CardType } from 'src/app/models/app-info';
import { selectEmailExample } from 'src/app/store/app/app.selector';
import { AppState } from 'src/app/store/app.state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent implements OnInit {
  
  //public emailControl = new FormControl('', [Validators.required, Validators.email]);
  public email: String;
  public emailExample: String;
  public emailError: boolean;
  public password: String;
  public passwordHide: boolean;
  public passwordError: boolean;
  public fieldError: String;  

  constructor(private store: Store<AppState>) { 
    this.email = "";
    this.emailExample = "";
    this.emailError = false;
    this.password = "";
    this.passwordHide = true;
    this.passwordError = false;
    this.fieldError = environment.login_card_fieldError;
  }

  ngOnInit(): void {
    this.store.select(selectEmailExample).subscribe((state) => {
      this.emailExample = state;
    });
  }

  // getErrorMessage() {
  //   if (this.emailField.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.emailField.hasError('email') ? 'Not a valid email' : '';
  // }

  checkEmail(){
    if(this.email.length === 0){
      this.emailError=true;
    }else{
      this.emailError=false;
    }
  }

  checkPassword(){
    if(this.password.length === 0){
      this.passwordError=true;
    }else{
      this.passwordError=false;
    }
  }

  login(){
    if(!(this.email.length===0) && !(this.password.length===0)){
      
      //obradi login (poziv akcije koja zove servis)
      //prosledjujes im this.email i this.password
    }
  }


}