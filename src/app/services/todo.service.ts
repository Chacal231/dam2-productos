import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.models';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private http = inject(HttpClient);

  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  getTodosByStatus(completed: boolean): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}?completed=${completed}`);
  }
}