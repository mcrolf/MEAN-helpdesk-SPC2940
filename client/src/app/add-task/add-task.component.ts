import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-add-task',
  template: `
    <h2 class="text-center m-5">Add a New Task</h2>
   <app-task-form (formSubmitted)="addTask($event)"></app-task-form>
  `,
  styles: [
  ]
})

export class AddTaskComponent {

  constructor(private router: Router, private taskService: TaskService){}

  //-----------------------------------------------
  // method to submit task to database
  // confirmation message
  //-----------------------------------------------
  addTask(task: Task) {
    if(confirm('Submit task to database?'))
    this.taskService.createTask(task)
      .subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          alert("Failed to create task");
          console.error(error);
        }
      });
  }

}
