import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks-list',
  template: `

    <h2 class="text-center m-5">Tickets</h2>
 
 <table class="table table-striped table-bordered">
     <thead>
         <tr>
             <th>Title</th>
             <th>Department</th>
             <th>Description</th>
             <th>Created</th>
             <th>Completed</th>
             <th>Tech Notes</th>
             <th>Action</th>
         </tr>
     </thead>

     <tbody>
         <tr *ngFor="let task of tasks$ | async">
             <td>{{task.title}}</td> <!-- TITLE -->
             
             <td>{{task.department}}</td> <!-- DEPARTMENT -->
             
             <td>{{task.description}}</td> <!-- DESCRIPTION -->

             <td>{{task.created}}</td>

             <td>{{task.completed}}</td>

             <td>{{task.techNotes}}</td>
             
             <td> <!-- ACTION -->
                 <button class="btn btn-primary me-1" [routerLink]="['edit/', task._id]">Edit</button>
                 <button class="btn btn-danger" (click)="deleteTask(task._id || '')">Delete</button>
             </td>
         </tr>
     </tbody>
 </table>

 <button class="btn btn-primary mt-3" [routerLink]="['new']">Add a New Task</button>
  `,
  styles: [
  ]
})


export class TasksListComponent implements OnInit {
  
  tasks$: Observable<Task[]> = new Observable();
 
  constructor(private tasksService: TaskService) { }
  
  //-----------------------------------
  // on init: fetch tasks
  //-----------------------------------
  ngOnInit(): void {
    this.fetchTasks();
  }
  
  //-----------------------------------
  // component method delete task
  //-----------------------------------
  deleteTask(id: string): void {
    this.tasksService.deleteTask(id).subscribe({
      next: () => this.fetchTasks()
    });
  }
  
  //---------------------------------------
  // component method fetch tasks
  //---------------------------------------
  private fetchTasks(): void {
    this.tasks$ = this.tasksService.getTasks();
  }


}
