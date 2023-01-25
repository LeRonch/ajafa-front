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

  getTopFiveCreations(): Observable<any> {
    return this.http.get(`${API_URL}/api/creationsfav/`);
  }

  getFiveLatestCreations(): Observable<any> {
    return this.http.get(`${API_URL}/api/creationslatest/`);
  }

  getCreationsByUser(userId): Observable<any> {
    return this.http.get(`${API_URL}/api/usercreations/${userId}`);
  }

  getCreationById(creationId): Observable<any> {
    return this.http.get(`${API_URL}/api/creation/${creationId}`);
  }

  getTagsbyId(tagId): Observable<any> {
    return this.http.get(`${API_URL}/api/tag/${tagId}`);
  }

  getCreationByTagId(tagId): Observable<any> {
    return this.http.get(`${API_URL}/api/creationtag/${tagId}`);
  }

  getFavCreation(userId): Observable<any> {
    return this.http.get(`${API_URL}/api/favcreation/${userId}`);
  }

  getCreationByName(name): Observable<any> {
    return this.http.get(`${API_URL}/api/creationname/${name}`);
  }

  postFavorite(creationId: number, userId: number): Observable<any> {
    const body = {
      creation_id: creationId,
      user_id: userId
    };
    return this.http.post(`${API_URL}/api/postfavorite/`, body);
  }

  deleteFavorite(creationId: number, userId: number): Observable<any> {
    const options = {
      body: {
        creation_id: creationId,
        user_id: userId
      }
    };
    return this.http.delete(`${API_URL}/api/deletefavorite/`, options);
  }

  deleteCreation(creationId: number): Observable<any> {
    const options = {
      body: {
        creation_id: creationId,
      }
    };
    return this.http.delete(`${API_URL}/api/deletecreation/`, options);
  }

  postDowloadCountIncrease(creationId: number): Observable<any> {
    const body = {
      creation_id: creationId,
    };
    return this.http.post(`${API_URL}/api/dowloadcount/`, body);
  }

  postComment(commentForm, creationId): Observable<any> {
    const body = new FormData();
    body.append('comment', commentForm.comment);
    body.append('creation_id', creationId);
    body.append('user_id', this.userId);

    return this.http.post(`${API_URL}/api/comment/`, body);
  }

  getComments(creationId): Observable<any> {
    return this.http.get(`${API_URL}/api/comments/${creationId}`);
  }

  putLinks(linkForm): Observable<any> {
    const body = new FormData();
    body.append('paypal_link', linkForm.paypalLink ? linkForm.paypalLink : 'null');
    body.append('patreon_link', linkForm.patreonLink ? linkForm.patreonLink : 'null');
    body.append('twitter_link', linkForm.twitterLink ? linkForm.twitterLink : 'null');
    body.append('user_id', this.userId);

    return this.http.put(`${API_URL}/api/links/`, body);
  }

  putDesc(descForm): Observable<any> {
    const body = new FormData();
    body.append('description', descForm.description ? descForm.description : 'null');
    body.append('user_id', this.userId);

    return this.http.put(`${API_URL}/api/desc/`, body);
  }

  postCreation(uploadForm): Observable<any> {
    const body = new FormData();
    body.append('title', uploadForm.title);
    body.append('description', uploadForm.description);
    body.append('creation', uploadForm.creation);
    body.append('user_id', this.userId);
    body.append('tags_list', uploadForm.tags);
    body.append('type', uploadForm.creation.name.endsWith('pdf') ? 'pdf' : 'img');

    return this.http.post(`${API_URL}/api/upload/`, body);
  }

}
