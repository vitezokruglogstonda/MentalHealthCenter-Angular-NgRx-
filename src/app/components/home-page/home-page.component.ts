import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
    ]),
    trigger("experience-left", [
      transition("void => *", [
        style({
          opacity: 0,
          transform: "translateX(-100px)"
        }),
        animate(2000)
      ])
    ]),
    trigger("experience-right", [
      transition("void => *", [
        style({
          opacity: 0,
          transform: "translateX(100px)"
        }),
        animate(2000)
      ])
    ])
  ]
})
export class HomePageComponent implements OnInit {

  public videoPath: String;
  public videoTitle: String;
  public introMainText: String;
  public introSubtext: String;
  public scroll_TopOfPage: boolean;
  @Output() scrollEmitter: EventEmitter<boolean>;

  constructor(private sanitizer: DomSanitizer) { 
    //this.videoPath = this.sanitizer.bypassSecurityTrustResourceUrl(environment.video_url_homePage+`?autoplay=1&controls=0&loop=0&mute=1`);
    this.videoPath = environment.home_page.video_url_homePage;
    this.videoTitle = environment.home_page.video_title_homePage;
    this.introMainText = environment.home_page.intro_main_text;
    this.introSubtext = environment.home_page.intro_subtext;
    this.scroll_TopOfPage = true;
    this.scrollEmitter = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    this.scrollEmitter.emit(this.scroll_TopOfPage);
  }

  onScroll(ev: Event){
    let scrollValue: any = document.querySelector(".home-page-container")?.scrollTop;
    if(this.scroll_TopOfPage === true && scrollValue > 0){
      this.scroll_TopOfPage = false;
      this.scrollEmitter.emit(this.scroll_TopOfPage);
    }else if(this.scroll_TopOfPage === false && scrollValue === 0){
      this.scroll_TopOfPage = true;
      this.scrollEmitter.emit(this.scroll_TopOfPage);
    }
  }


}
