import { Component, ElementRef, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UploadPictureDialogComponent } from '../upload-picture-dialog/upload-picture-dialog.component';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class RegisterComponent implements OnInit {

  public email: String;
  public emailExample: String;
  public password: String;
  public passwordHide: boolean;
  public passwordRep: String;
  public genders: String[];
  public profilePicturePath: String;
  public uploadedPicture: File | null;

  constructor(public dialog: MatDialog, private elRef: ElementRef,) {
    this.email = "";
    this.emailExample = environment.login_card_example_email;
    this.password = "";
    this.passwordHide = true;
    this.passwordRep = "";
    this.genders = environment.gender_list;
    this.profilePicturePath = environment.account_icon_basic_URL;
    this.uploadedPicture = null;
  }

  ngOnInit(): void {
  }

  // newPicture(ev: any){
  //   console.log(ev);
  //   if(this.uploadedPicture !== null){
  //     this.uploadedPicture = null;
  //   }
  //   this.uploadedPicture = ev.target?.files[0];
  // }

  openUploadDialog(){
    this.dialog.open(UploadPictureDialogComponent, {
      width: environment.dialog_UploadPhoto_Settings.width,
      height: environment.dialog_UploadPhoto_Settings.height,
      enterAnimationDuration: environment.dialog_UploadPhoto_Settings.openAnimationDuration
    }).afterClosed().subscribe((result: File) => {
      if(result){
        this.uploadedPicture = result;
        let imageTag: any = (<HTMLElement>this.elRef.nativeElement).querySelector(".profile-picture");
        imageTag.src = URL.createObjectURL(result);
      }
    });
    
  }

}
