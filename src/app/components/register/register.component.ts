import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public email: String;
  public emailExample: String;
  public password: String;
  public passwordHide: boolean;
  public passwordRep: String;

  constructor() {
    this.email = "";
    this.emailExample = environment.login_card_example_email;
    this.password = "";
    this.passwordHide = true;
    this.passwordRep = "";
  }

  ngOnInit(): void {
  }

}
