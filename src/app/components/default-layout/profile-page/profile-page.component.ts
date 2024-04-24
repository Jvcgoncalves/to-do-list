import { CommonModule, Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Users } from '../../../interfaces/users';
import { ActivatedRoute } from '@angular/router';
import { LoaderComponent } from '../../common/loader/loader.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  getResponseError: boolean = false;
  userData!: Users;
  @ViewChild("userNameInput") userNameInput!: ElementRef;
  @ViewChild("userEmailInput") userEmailInput!: ElementRef;

  constructor(private userService: UsersService,private activatedRoute: ActivatedRoute, private location: Location ) { }

  ngOnInit(): void {
    const userId = this.activatedRoute.parent?.snapshot.params['userId']
    this.userService.getUserData({userId}).then(res =>{
      if(typeof res === 'string'){
        this.getResponseError = true;
        return;
      }
      this.userData = res;
    })
  }

  enableEditInput(event: Event){
    const htmlElementTarget = event.target as HTMLElement;
    if (htmlElementTarget.parentElement?.dataset?.['inputTarget']) {
      const inputTargetToManipulate = this.selectInputTargetToEdit(htmlElementTarget.parentElement);
      inputTargetToManipulate.nativeElement.toggleAttribute('readonly');
      this.checkIfNeedToFocusOnInput(inputTargetToManipulate)

    } else if (htmlElementTarget.dataset?.['inputTarget']) {
      const inputTargetToManipulate = this.selectInputTargetToEdit(htmlElementTarget);
      inputTargetToManipulate.nativeElement.toggleAttribute('readonly');
      this.checkIfNeedToFocusOnInput(inputTargetToManipulate)

    } 
  }

  selectInputTargetToEdit(htmlElementTarget: HTMLElement): ElementRef{
    const inputTargetName: keyof ProfilePageComponent = htmlElementTarget?.dataset['inputTarget'] as keyof ProfilePageComponent;
    const inputTargetSelected = this[inputTargetName] as unknown as ElementRef;
    return inputTargetSelected;
  }

  checkIfNeedToFocusOnInput( input: ElementRef){
    if(!input.nativeElement.hasAttribute('readonly')){
      input.nativeElement.focus();
    }
  }

  backPage(){
    this.location.back();
  }
}
