import {CdkDragDrop,  moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ITask } from '../model/task';



@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit{

  todoForm !: FormGroup;
  tasks : ITask []=[]; 
  inprogess : ITask []=[]; 
  done : ITask []= [];

  constructor(private fb : FormBuilder){}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required]
    })
  }

  addTask(){
    this.tasks.push({
      description:this.todoForm.value.item,
      done:false
    })
  }

  deleteTask(i:number){
    this.tasks.splice(i,1)
  }
  deleteInProgress(i:number){
    this.inprogess.splice(i,1)
  }
  deleteDone(i:number){
    this.done.splice(i,1)
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
