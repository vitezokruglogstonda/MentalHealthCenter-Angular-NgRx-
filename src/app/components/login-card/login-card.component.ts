import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CardType } from 'src/app/models/app-info';
import { selectEmailExample } from 'src/app/store/app/app.selector';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent implements OnInit {

  public emailExample: String;
  public email = new FormControl('', [Validators.required, Validators.email]);
  public passwordHide: boolean;

  constructor(private store: Store<AppState>) { 
    this.emailExample = "";
    this.passwordHide = true;
  }

  ngOnInit(): void {
    this.store.select(selectEmailExample).subscribe((state) => {
      this.emailExample = state;
    });
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  login(){
    
  }

}