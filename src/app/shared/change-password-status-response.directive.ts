import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[changePasswordStatusResponse]',
  standalone: true
})
export class ChangePasswordStatusResponseDirective {

  @Input() changePasswordStatusResponse!: boolean;

  constructor(private _elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnChanges() {
    if (this.changePasswordStatusResponse) {
      this.renderer.addClass(this._elementRef.nativeElement, "success");
      this.renderer.removeClass(this._elementRef.nativeElement, "fail");
    } else {
      this.renderer.removeClass(this._elementRef.nativeElement, "success");
      this.renderer.addClass(this._elementRef.nativeElement, "fail");
    }
  }
}
