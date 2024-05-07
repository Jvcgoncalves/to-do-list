import { ElementRef } from "@angular/core"

export default function checkIfIsPasswordInput(input: ElementRef){
  if(input.nativeElement.id === "user-password-input" && !(input.nativeElement.getAttribute("type") === "text")){
    input.nativeElement.setAttribute("type", "text")
  } else if(input.nativeElement.id === "user-password-input" && input.nativeElement.getAttribute("type") === "text"){
    input.nativeElement.setAttribute("type", "password")
  }
}