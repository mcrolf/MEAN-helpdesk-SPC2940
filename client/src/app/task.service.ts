import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  private url = 'http://localhost:5200';
  private tasks$: Subject<Task[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  //----------------------------------------------
  // refresh tasks:
  // gets task array from server using subscribe method
  //----------------------------------------------
  private refreshTasks() {
    this.httpClient.get<Task[]>(`${this.url}/tasks`)
      .subscribe(tasks => {
        this.tasks$.next(tasks);
      });
  }

  //-------------------------------------
  // method for get tasks
  //-------------------------------------
  getTasks(): Subject<Task[]> {
    this.refreshTasks();
    return this.tasks$;
  }

  //--------------------------------------
  // method for get tasks by id
  //--------------------------------------
  getTask(id: string): Observable<Task> {
    return this.httpClient.get<Task>(`${this.url}/tasks/${id}`);
  }

  //---------------------------------------
  // method for create task
  //---------------------------------------
  createTask(task: Task): Observable<string> {
    return this.httpClient.post(`${this.url}/tasks`, task, { responseType: 'text' });
  }
  
  //----------------------------------------
  // method for update task by id or task obj
  //----------------------------------------
  updateTask(id: string, task: Task): Observable<string> {
    return this.httpClient.put(`${this.url}/tasks/${id}`, task, { responseType: 'text' });
  }
  
  //-----------------------------------------
  // method for delete task by id
  //-----------------------------------------
  deleteTask(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/tasks/${id}`, { responseType: 'text' });
  }

}
