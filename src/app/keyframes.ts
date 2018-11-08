import { keyframes, style } from '@angular/animations';


export const flipIn = [
    style({transform: 'rotate3d(0,1,0, 90deg)', offset: 0}),
    style({transform: 'rotate3d(0,1,0, -20deg)', offset: .4}),
    style({transform: 'rotate3d(0,1,0, 10deg)', offset: .6}),
    style({transform: 'rotate3d(0,1,0, -5deg)', offset: .8}),
    style({transform: 'none', offset: 1})
]

export const flipUp = [
    style({transform: 'translate3d(0, 100%, 0)', offset: 0, opacity: 0}),
    style({transform: 'translate3d(0, 0, 0)', offset: 1, opacity: 1})
]


export const slideInLeft  = [
    style({transform: 'translate3d(-100%, 0, 0)', offset: 0, visibility: 'visible'}),
    style({transform: 'translate3d(0, 0, 0)', offset: 1})
]

export const slideInRight  = [
    style({transform: 'translate3d(100%, 0, 0)', offset: 0, visibility: 'visible'}),
    style({transform: 'translate3d(0, 0, 0)', offset: 1})
]