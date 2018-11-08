import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { trigger, transition, animate, keyframes } from '@angular/animations';
import * as kf from '../keyframes';
import * as _ from 'underscore';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('cardAnimator',[
      transition('* => flipUp', animate(1000, keyframes(kf.flipUp))),
      transition('* => flipIn', animate(1000, keyframes(kf.flipIn))),
      transition('* => slideInLeft', animate(500, keyframes(kf.slideInLeft))),
      transition('* => slideInRight', animate(500, keyframes(kf.slideInRight)))
    ])]
})
export class HomeComponent implements OnInit {

  
  animationState: string;
  suit: any[];
  _cards: any[];
  _suit_cards: any[][];
  image_source: string;
  max_cards: number;
  warning: boolean;
  warning_: boolean;
  constructor(private fb: FormBuilder) { }

  cardForm = this.fb.group({
    suit: this.fb.group({
      clubs: [''],
      diamonds: [false],
      hearts: [false],
      spades: [false]
    }),
    number: [12],
    range: this.fb.group({
      min: [0],
      max: [12]
    })
    
  })

  startAnimation(state: string){
    console.log(state);
    if(!this.animationState){
      this.animationState = state;
    }
  }

  resetAnimation() {
    this.animationState = '';
  }

  updateChecks(i: any, j: any){
    if(i=='clubs')
    {
      this.cardForm.controls['suit'].patchValue({clubs:j?i:''});
    }
    if(i=='diamonds')
    {
      this.cardForm.controls['suit'].patchValue({diamonds:j?i:''});
    }
    if(i=='hearts')
    {
      this.cardForm.controls['suit'].patchValue({hearts:j?i:''});
    }
    if(i=='spades')
    {
      this.cardForm.controls['suit'].patchValue({spades:j?i:''});
    }
  }

  cards = ['Aces', 'Twos', 'Threes', 'Fours', 'Fives',
            'Sixes', 'Sevens', 'Eights', 'Nines', 'Tens',
            'Jacks', 'Queens', 'Kings'
          ];

  ngOnInit() {
    this.cardForm.valueChanges.subscribe((e)=>{
      console.log(e);
      this.deckCards();
    })
    const that = this;
    $("#slider").ionRangeSlider({
      type: "double",
      grid: true,
      from: 0,
      values: this.cards,
      onFinish: function(data){
        that.cardForm.controls['range'].setValue({'min':data.from, 'max': data.to});
      }
  });
  this.image_source = "../../assets/cards/misc/3.JPG";
  this.animationState= "flipIn";
  }

  deckCards(){
    this.suit = new Array<string>();
    let arr = new Array<number>();
    let _suit;
    let i =0;
    let t1=0; let t2= 0;
    let l =0;
    let __cards = [];
    if(this.cardForm.controls['suit'].get('clubs').value){
      this.suit.push('clubs');
    }
    if(this.cardForm.controls['suit'].get('diamonds').value){
      this.suit.push('diamonds');
    }
    if(this.cardForm.controls['suit'].get('hearts').value){
      this.suit.push('hearts');
    }
    if(this.cardForm.controls['suit'].get('spades').value){
      this.suit.push('spades');
    }   
    this.max_cards = this.suit.length * (this.cardForm.controls['range'].get('max').value - this.cardForm.controls['range'].get('min').value);
    console.log(this.max_cards);
    console.log("this.max_cards");
    if(this.suit && this.suit.length && this.cardForm.controls['number'].value && 
      (this.suit.length * (this.cardForm.controls['range'].get('max').value - this.cardForm.controls['range'].get('min').value) >= this.cardForm.controls['number'].value)){
        this.warning = false;
      this._cards = new Array<number>();
      this._suit_cards = new Array<Array<number>>();
      for(let i=0; i<this.suit.length; ++i){
        this._suit_cards[i] = new Array<number>();
      }
      
      _suit = _.random(0, this.suit.length-1);
      for(let i= 0; i<this.cardForm.controls['number'].value; ++i){
        t1 = _.random(0, this.suit.length-1);
        t2 = _.random(this.cardForm.controls['range'].get('min').value, this.cardForm.controls['range'].get('max').value);
        arr = new Array<number>();
        arr = this._suit_cards[t1];
        arr.push(t2);
        l = arr.length;
        arr = _.uniq(arr);
        if(l!=arr.length){
          --i;
        }
        this._suit_cards[t1] = arr;
      }
      console.log(this._suit_cards);
      this.image_source = "../../assets/cards/misc/2.JPG";
      this.animationState= "slideInRight";
    }
    else{
      if(this.suit && this.suit.length==0){
        this.warning = false;
        this.warning_ = true;
      }
      else{
      this.warning = true;
      this.warning_ = false; 
      }
      this.image_source = "../../assets/cards/misc/1.JPG";
      this.animationState= "slideInLeft";

    }
  }

  takeCard(){
    let n1 = 0; let n2 = 0;
    if(this.suit.length>0 && this._suit_cards && this.cardForm.controls['number'].value <= this.max_cards){
      do{
        n1 = _.random(0, this.suit.length-1);
        console.log(n1);
        if(this._suit_cards[n1] && this._suit_cards[n1].length){
          n2 = _.random(0, this._suit_cards[n1].length-1);
          console.log(n2);
        }
      }while(!this._suit_cards[n1].length)
      console.log("this._suit_cards[n1][n2]");
      console.log(this._suit_cards[n1][n2]);
      console.log(this.suit[n1]);
      this.image_source = "../../assets/cards/" + this.suit[n1] +"/"+ this._suit_cards[n1][n2]+ ".JPG";
      this.animationState= "flipUp";
      console.log(this.image_source);
    }
  }
}
