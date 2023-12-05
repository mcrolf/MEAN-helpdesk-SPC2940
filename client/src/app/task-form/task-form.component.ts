import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../task';

@Component({
  selector: 'app-task-form',
  template: `
  <form class="task-form" autocomplete="off" [formGroup]="taskForm" (ngSubmit)="submitForm()">
     
    <div class="form-floating mb-3"> <!-- TITLE -->
      <input class="form-control" type="text" id="title" formControlName="title" placeholder="Title" required>
      <label for="title">Title</label>
    </div>
 
    <div *ngIf="title.invalid && (title.dirty || title.touched)" class="alert alert-danger">
      <div *ngIf="title.errors?.['required']">
        Title is required.
      </div>
      <div *ngIf="title.errors?.['minlength']">
        Title must be at least 3 characters long.
      </div>
    </div>

    <div class="mb-3"> <!-- Department -->
      <div class="form-check">
        <input class="form-check-input" type="radio" formControlName="department" name="department" 
          id="department-dev" value="Dev" required>
        <label class="form-check-label" for="department-dev">Development</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" formControlName="department" name="department" 
          id="department-hr" value="H.R.">
        <label class="form-check-label" for="department-hr">H.R.</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" formControlName="department" name="department" 
          id="department-gen" value="General">
        <label class="form-check-label" for="department-gen">General</label>
      </div>
    </div>
 
    <div class="form-floating mb-3"> <!-- Description -->
      <input class="form-control" type="text" formControlName="description" placeholder="Description" required>
      <label for="description">Description</label>
    </div>
 
    <div *ngIf="description.invalid && (description.dirty || description.touched)" class="alert alert-danger">
      <div *ngIf="description.errors?.['required']">
        Description is required.
      </div>
      <div *ngIf="description.errors?.['minlength']">
        Description must be at least 5 characters long.
      </div>
    </div>

    <div class="form-floating mb-3"> <!-- Date Created -->
      <input class="form-control" type="date" formControlName="created" placeholder="Created" required>
      <label for="created">Created</label>
    </div>
    <div *ngIf="created.invalid && (created.dirty || created.touched)" class="alert alert-danger">
      <div *ngIf="created.errors?.['required']">
        Date is required.
      </div>
    </div>
    
    <div class="mb-3"> <!-- completed -->
      <div class="form-check">
        <input class="form-check-input" type="date" formControlName="completed" name="completed" id="completed-yes"
          value="True" >
        <label class="form-check-label" for="completed">Completed</label>
      </div>
      <div class="form-check mb-3">
        <input class="form-check-input" type="radio" formControlName="completed" name="completed" id="completed-no" 
          value="Incomplete" required>
        <label class="form-check-label" for="completed">Incomplete</label>
      </div>
    </div>

    <div class="form-floating mb-3"> <!-- Technician Notes -->
      <input class="form-control" type="text" formControlName="techNotes" placeholder="TechNotes" required>
      <label for="techNotes">Tech Notes</label>
    </div>
 
    <button class="btn btn-primary" type="submit" [disabled]="taskForm.invalid">Submit</button>
  </form>
  `,
  styles: [
    `.task-form {
      max-width: 560px;
      margin-left: auto;
      margin-right: auto;
    }`
  ]
})

export class TaskFormComponent implements OnInit{

  @Input()
  initialState: BehaviorSubject<Task> = new BehaviorSubject({});
 
  @Output()
  formValuesChanged = new EventEmitter<Task>();
 
  @Output()
  formSubmitted = new EventEmitter<Task>();
 
  taskForm: FormGroup = new FormGroup({});
 
  constructor(private fb: FormBuilder) { }
 
  get title() { return this.taskForm.get('title')!; }
  get department() { return this.taskForm.get('department')!; }
  get description() { return this.taskForm.get('description')!; }
  get created() { return this.taskForm.get('created'); }
  get completed() { return this.taskForm.get('completed'); }
  get techNotes() { return this.taskForm.get('techNotes'); }

 
  ngOnInit() {
    this.initialState.subscribe(task => {
      this.taskForm = this.fb.group({
        title: [ task.title, [Validators.required] ],
        department: [ task.department, [ Validators.required ] ],
        description: [ task.description, [ Validators.required, Validators.minLength(5) ] ],
        created: [ task.created ],
        completed: [ task.completed ],
        techNotes: [ task.techNotes ]
      });
    });
 
    this.taskForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }
 
  submitForm() {
    this.formSubmitted.emit(this.taskForm.value);
  }

}
