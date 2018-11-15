import { Component } from "@angular/core";


@Component({
selector: 'app-header',
templateUrl: './header.component.html',


})

export class headerComponent{

}
console.log("fdfdff",typeof(console))
function A(a,b,callback) {
    console.log('step1');
    callback(a,b);
}
function C(x,y) {
    console.log('step3',x)
}
A(1,2,C);
C(3,4);

