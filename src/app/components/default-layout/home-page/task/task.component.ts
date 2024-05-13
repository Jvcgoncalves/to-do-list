import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UserTasksService } from '../../../../services/user-tasks.service';
import { UserTasks } from '../../../../interfaces/user-tasks';
import { LoaderComponent } from '../../../common/loader/loader.component';
import filterStatusFormated from '../../../../../scripts/tast_component_scripts/filterStatusFormated';
import disbleFilterButton from '../../../../../scripts/tast_component_scripts/disableFilterButton';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, LoaderComponent],
  templateUrl: "./home-page.component.html",
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  @Input() userId!: string | null;
  @Input() tasksToShow!: UserTasks[] | [];
  @ViewChild('filterOptionsButton') filterOptionsButton!: ElementRef;
  @ViewChild('filterOptions') filterOptionsElement!: ElementRef;
  contentDivClasses: string = 'd-flex';
  userAllTasks!:  UserTasks[] | [];
  searchTasksFormController = new FormGroup({
    searchBar: new FormControl('')
  })

  responseReturnError: boolean | null = null;

  constructor(private taskService: UserTasksService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem("userLoggedId")
    this.taskService.getAllUserTasks({userId: this.userId}).then(res =>{
      if(Array.isArray(res)){
        this.userAllTasks = res
        this.tasksToShow = res
        this.responseReturnError = false
        this.setContentDivClasses(this.userAllTasks)
      } else {
        this.responseReturnError = true
      }
    }).catch( e =>{
      this.responseReturnError = true
    })
  }

  searchByTyping(){    
    if(this.responseReturnError) return;

    const filter = document.querySelector('.available-options[disabled]') as HTMLElement;

    const nameTypedByUser = this.searchTasksFormController.value.searchBar;

    if(filter){
      this.tasksToShow = this.userAllTasks.filter(task => task.name.trim().toLowerCase().startsWith(nameTypedByUser?.trimStart().toLowerCase() || "") && task.done === filterStatusFormated(filter.dataset['filterBy']!));
    } else {
      this.tasksToShow = this.userAllTasks.filter(task => task.name.trim().toLowerCase().startsWith(nameTypedByUser?.trimStart().toLowerCase() || ""));
    }
    
    this.setContentDivClasses(this.tasksToShow);
  }

  toggleFilterOptions(){
    this.filterOptionsElement.nativeElement.classList.toggle('active')
  }

  closeFilterOptions(){
    setTimeout(()=>{
      this.filterOptionsElement.nativeElement.classList.remove('active')
    },100)
  }

  filterTasksByStatusClickFunction(event: Event){
    const buttonTarget = event.target as HTMLElement;
    disbleFilterButton(buttonTarget);
    this.filterByStatus(buttonTarget.dataset?.['filterBy']);
  }

  filterByStatus(filterBy: string | undefined){
    if(filterBy === "all"){
      this.tasksToShow = this.userAllTasks;
      this.filterOptionsButton.nativeElement.classList.remove('filter-applied')
      this.setContentDivClasses(this.tasksToShow)
    } else {
      this.tasksToShow = this.userAllTasks.filter(task => task.done === filterStatusFormated(filterBy!));
      this.filterOptionsButton.nativeElement.classList.add('filter-applied')
      this.setContentDivClasses(this.tasksToShow)
    }
    this.toggleFilterOptions();
  }

  setContentDivClasses(contentArray: any){
    this.contentDivClasses = contentArray.length === 0 ? "d-flex" : "d-grid row-gap-4 column-gap-5"
  }
}
