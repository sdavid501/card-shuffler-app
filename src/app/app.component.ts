import { Component, AfterViewInit, OnInit } from '@angular/core';
import { trigger, transition, animate, keyframes } from '@angular/animations';
import * as kf from './keyframes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('cardAnimator',[
      transition('* => flipIn', animate(2000, keyframes(kf.flipIn)))
    ])]
})
export class AppComponent implements OnInit {
  aniState: string;
  title = '>>>Card-Shuffler<<<';

  startAnimation(state: string){
    console.log(state);
    if(!this.aniState){
      this.aniState = state;
    }
  }

  resetAnimation() {
    this.aniState = '';
  }

  ngOnInit(){
    this.aniState = 'flipIn';
  }
}
