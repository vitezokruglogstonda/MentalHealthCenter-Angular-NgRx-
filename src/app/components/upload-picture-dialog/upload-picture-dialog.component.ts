import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-picture-dialog',
  templateUrl: './upload-picture-dialog.component.html',
  styleUrls: ['./upload-picture-dialog.component.scss']
})
export class UploadPictureDialogComponent implements OnInit {

  public uploadedPicture: File | null;
  public dragDropArea: Element | null;
  public uploadError: boolean;

  constructor(
    private elRef: ElementRef,
    public dialogRef: MatDialogRef<UploadPictureDialogComponent>
  ) {
    this.uploadedPicture = null;
    this.dragDropArea = null;
    this.uploadError = false;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dragDropArea = (<HTMLElement>this.elRef.nativeElement).querySelector(".drag-drop");
    environment.dragAndDropSettings.eventList_preventDefaults.forEach((eventName) => {
      this.dragDropArea?.addEventListener(eventName, this.preventDefaults, false)
    });
    environment.dragAndDropSettings.eventList_highlight.forEach(eventName => {
      this.dragDropArea?.addEventListener(eventName, () => {
        this.highlight(event);
      }, false)
    });
    environment.dragAndDropSettings.eventList_unhighlight.forEach(eventName => {
      this.dragDropArea?.addEventListener(eventName, () => {
        this.unhighlight(event);
      }, false);
    });
    this.dragDropArea?.addEventListener("drop", () => {
      this.handleDrop(event, this.dialogRef, this.uploadError, this.uploadedPicture);
    }, false);

  }

  preventDefaults(e: Event) {
    e.preventDefault();
    e.stopPropagation();
  }

  highlight(e: any) {
    e.target.classList.add(environment.dragAndDropSettings.onDropClassName)
  }

  unhighlight(e: any) {
    e.target.classList.remove(environment.dragAndDropSettings.onDropClassName)
  }

  handleDrop(e: any, dialogRef: MatDialogRef<UploadPictureDialogComponent>, uploadError: boolean, uploadedPicture: File | null) {
    //ne prihvata "Event" tip jer on "nema property dataTransfer"
    //isto ne prihvata "DropEvent" jer se ne poklapa sa argumentima u addEventListener f-ji
    //mora any
    if (e.dataTransfer.files) {
      let files = e.dataTransfer.files;
      if (files.length > 1) {
        uploadError = true;
      } else {
        uploadError = false;
        uploadedPicture = files.item(0);
        dialogRef.close(uploadedPicture);
      }
    }
  }

  newPicture(ev: any) {
    if(ev.target?.files.length===1){
      this.uploadError = false;
      this.uploadedPicture = ev.target?.files.item(0);
      this.dialogRef.close(this.uploadedPicture);
    }else{
      this.uploadError = true;
    }
  }

}
