import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [
    trigger("title-fade-in", [
      //state(),
      transition("void => *", [
        style({
          opacity: 0
        }),
        animate(3000, style({
          opacity: 0.85
        }))
      ])
    ])
  ]
})
export class HomePageComponent implements OnInit {

  public videoPath: String;
  public videoTitle: String;

  constructor(private sanitizer: DomSanitizer) { 
    //this.videoPath = this.sanitizer.bypassSecurityTrustResourceUrl(environment.video_url_homePage+`?autoplay=1&controls=0&loop=0&mute=1`);
    this.videoPath = environment.video_url_homePage;
    this.videoTitle = environment.video_title_homePage;
  }

  ngOnInit(): void {
  }

}
