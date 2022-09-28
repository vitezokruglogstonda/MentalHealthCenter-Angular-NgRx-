import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-picture-dialog',
  templateUrl: './upload-picture-dialog.component.html',
  styleUrls: ['./upload-picture-dialog.component.scss']
})
export class UploadPictureDialogComponent implements OnInit {

  public uploadedPicture: File | null;
  public uploaded: boolean;

  constructor() { 
    this.uploadedPicture = null;
    this.uploaded = false;
  }

  ngOnInit(): void {
  }

  newPicture(ev: any){
    console.log(ev);
    if(this.uploadedPicture !== null){
      this.uploadedPicture = null;
    }
    this.uploadedPicture = ev.target?.files[0];
  }

}
