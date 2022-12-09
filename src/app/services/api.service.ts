import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/interface';

const API_URL = 'http://127.0.0.1:8000';
const ID_KEY = 'user-id';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private userId = localStorage.getItem(ID_KEY);

  constructor(private http: HttpClient) {
	}

  getUser(userId): Observable<any> {
    return this.http.get(`${API_URL}/api/user/${userId}`);
  }

  getTags(): Observable<any> {
    return this.http.get(`${API_URL}/api/tags/`);
  }

  postCreation(uploadForm): Observable<any> {
    const body = new FormData();
    body.append('title', uploadForm.title);
    body.append('description', uploadForm.description);
    body.append('creation', uploadForm.creation);
    body.append('user_id', this.userId);
    console.log(body);

    return;
    // return this.http.post(`${API_URL}/api/upload/`, body);
  }

}
