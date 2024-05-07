import { ElementRef } from "@angular/core";

export default function checkIfNeedToFocusOnInput(input: ElementRef){
  if(!input.nativeElement.hasAttribute('readonly')){
    input.nativeElement.focus();
  }
}