import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-edit-task',
  template: `
    <h2 class="text-center m-5">Edit Task</h2>
    <app-task-form [initialState]="task" (formSubmitted)="editTask($event)"></app-task-form>
  `,
  styles: [
  ]
})

export class EditTaskComponent implements OnInit{

  task: BehaviorSubject<Task> = new BehaviorSubject({});
 
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService,
  ) { }
 
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }
 
    this.taskService.getTask(id !).subscribe((task) => {
      this.task.next(task);
    });
  }
  
  //--------------------------------------------------------
  // method for submitting updated task
  // with confirmation message
  //--------------------------------------------------------
  editTask(task: Task) {
    if(confirm('You are about to update this task. Proceed?'))
    this.taskService.updateTask(this.task.value._id || '', task)
      .subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          alert('Failed to update task');
          console.error(error);
        }
      })
  }

}