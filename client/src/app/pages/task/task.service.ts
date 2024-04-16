import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "./model/task";
import {ApiGenericResponse} from "../../core/model/api-generic-response";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8080/api/task'

  constructor(
    private http: HttpClient
  ) {}

  list(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  save(task: Task): Observable<any> {
    if (task.id) {
      return this.http.put<Task>(`${this.baseUrl}/${task.id}`, task)
    }

    return this.http.post<ApiGenericResponse>(this.baseUrl, task);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
