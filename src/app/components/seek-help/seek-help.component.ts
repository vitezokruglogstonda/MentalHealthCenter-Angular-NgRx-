import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-seek-help',
  templateUrl: './seek-help.component.html',
  styleUrls: ['./seek-help.component.scss']
})
export class SeekHelpComponent implements OnInit {

  public cardText: String;
  public guestName: String;
  public guestNameError: boolean;
  public guestNameErrorText: String;
  public guestPhoneNumber: String;
  public guestPhoneNumberError: boolean;
  public guestPhoneNumberErrorText: String;
  public phoneNumberLength: number;
  @Output() emmiter: EventEmitter<boolean>;

  constructor() {
    this.cardText = environment.seek_help.text;
    this.guestName = "";
    this.guestNameError = false;
    this.guestNameErrorText = environment.seek_help.guest_name_error_text;
    this.guestPhoneNumber = "";
    this.guestPhoneNumberError = false;
    this.guestPhoneNumberErrorText = environment.seek_help.guest_phone_number_error_text_empty;
    this.phoneNumberLength = environment.seek_help.phone_number_length;
    this.emmiter = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
  }

  checkGuestName() {
    if (this.guestName.length === 0) {
      this.guestNameError = true;
    } else {
      this.guestNameError = false;
    }
  }

  checkChar(ev: KeyboardEvent) {
    let asciiVal = ev.key.charCodeAt(0);
    if (asciiVal >= 48 && asciiVal <= 57) {
      return true;
    }
    return false;
  }

  checkPhoneNumber(){
    if(this.guestPhoneNumber.length === 0){
      this.guestPhoneNumberError = true;
      this.guestPhoneNumberErrorText = environment.seek_help.guest_phone_number_error_text_empty;
    }else if(this.guestPhoneNumber.length < this.phoneNumberLength){
      this.guestPhoneNumberError = true;
      this.guestPhoneNumberErrorText = environment.seek_help.guest_phone_number_error_text_incomplete;
    }else{
      this.guestPhoneNumberError = false;
      this.guestPhoneNumberErrorText = environment.seek_help.guest_phone_number_error_text_empty;
    }
  }

  submit(){
    this.emmiter.emit(true);
  }

}
