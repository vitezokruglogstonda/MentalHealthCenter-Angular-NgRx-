import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Quote } from 'src/app/models/home-page-quotes';
import { AppState } from 'src/app/store/app.state';
import { fetchQuotes } from 'src/app/store/app/app.action';
import { selectQuotes } from 'src/app/store/app/app.selector';
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
        animate("5s 1s", style({
          opacity: 0.85
        }))
      ])
    ]),
    trigger("experience-left", [
      state("hidden-left", style({
        opacity: 0,
        transform: "translateX(-100px)"
      })),
      state("shown-left", style({
        opacity: 1,
        transform: "translateX(0px)"
      })),
      transition("hidden-left => shown-left",
        animate("2s 0s ease")
      )
      // transition("void => *", [
      //   style({
      //     opacity: 0,
      //     transform: "translateX(-100px)"
      //   }),
      //   animate("2s 0s ease")
      // ])
    ]),
    trigger("experience-right", [
      state("hidden-right", style({
        opacity: 0,
        transform: "translateX(100px)"
      })),
      state("shown-right", style({
        opacity: 1,
        transform: "translateX(0px)"
      })),
      transition("hidden-right => shown-right",
        animate("2s 0s ease")
      )
      // transition("void => *", [
      //   style({
      //     opacity: 0,
      //     transform: "translateX(100px)"
      //   }),
      //   animate("2s 0s ease")
      // ])
    ]),
    trigger("seek-help-enter", [
      state("hidden-card", style({
        transform: "translateX(-400px)"
      })),
      state("shown-card", style({
        opacity: 1,
        transform: "translateX(0px)"
      })),
      // state("card-dissapear", style({
      //   opacity: 0,
      //   transform: "translateX(400px)"
      // })),
      transition("hidden-card => shown-card",
        animate("0.5s 0s ease")
      ),
      // transition("shown-card => card-dissapear", animate("0.2s 0s ease"))
      transition(":leave",
        animate("1s 0s ease", style({
          opacity: 0,
          transform: "translateX(1400px)"
        }))
      )
    ]),
  ]
})
export class HomePageComponent implements OnInit {

  public videoPath: String;
  public videoTitle: String;
  public introMainText: String;
  public introSubtext: String;
  public scroll_TopOfPage: boolean;
  @Output() scrollEmitter: EventEmitter<boolean>;
  public xpAppear: boolean;
  public quotes: Quote[];
  public helpCardAppear: boolean;
  //public helpCardDissappear: boolean;
  public helpRequested: boolean;

  constructor(private sanitizer: DomSanitizer, private store: Store<AppState>) {
    //this.videoPath = this.sanitizer.bypassSecurityTrustResourceUrl(environment.video_url_homePage+`?autoplay=1&controls=0&loop=0&mute=1`);
    this.videoPath = environment.home_page.video_url_homePage;
    this.videoTitle = environment.home_page.video_title_homePage;
    this.introMainText = environment.home_page.intro_main_text;
    this.introSubtext = environment.home_page.intro_subtext;
    this.scroll_TopOfPage = true;
    this.scrollEmitter = new EventEmitter<boolean>();
    this.xpAppear = false;
    this.quotes = [];
    this.helpCardAppear = false;
    //this.helpCardDissappear = false;
    this.helpRequested = false;
  }

  ngOnInit(): void {
    this.scrollEmitter.emit(this.scroll_TopOfPage);
    this.store.select(selectQuotes).subscribe((state) => {
      if (state.length === 0) {
        this.store.dispatch(fetchQuotes());
      }
      this.quotes = state;
    });

  }

  onScroll(ev: Event) {
    let scrollValue: any = document.querySelector(".home-page-container")?.scrollTop;
    if (this.scroll_TopOfPage === true && scrollValue > 0) {
      this.scroll_TopOfPage = false;
      this.scrollEmitter.emit(this.scroll_TopOfPage);
    } else if (this.scroll_TopOfPage === false && scrollValue === 0) {
      this.scroll_TopOfPage = true;
      this.scrollEmitter.emit(this.scroll_TopOfPage);
    }
    if (!this.xpAppear) {
      const experience_section: Element | null = document.querySelector(".experience-section");
      const xpRect: DOMRect | undefined = experience_section?.getBoundingClientRect();
      if (xpRect) {
        if (xpRect.top < window.innerHeight) {
          this.xpAppear = true;
        }
      }
    }
    if (!this.helpCardAppear) {
      const heplCard: Element | null = document.querySelector(".seek-help-card");
      const cardRect: DOMRect | undefined = heplCard?.getBoundingClientRect();
      if (cardRect) {
        if (cardRect.top < window.innerHeight) {
          this.helpCardAppear = true;
        }
      }
    }
  }

  triggerCardAnimation() {
    if (this.helpCardAppear) {
      return "shown-card";
    } 
    // else if (this.helpCardDissappear) {
    //   return "card-dissapear";
    // }
    return "hidden-card";
  }

  submited() {
    this.helpCardAppear = false;
    //this.helpCardDissappear = true;
    this.helpRequested = true;
  }


}
