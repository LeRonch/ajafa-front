import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { Storage } from '@capacitor/storage';
import { API_URL } from 'src/app/constants/constants';

const TOKEN_KEY = 'my-token';
const ID_KEY = 'user-id';

@Injectable({
	providedIn: 'root'
})

export class AuthenticationService {
	isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
	token = '';

	constructor(
    private http: HttpClient
  ) {
		this.loadToken();
	}

	async loadToken() {
		const token = await Storage.get({ key: TOKEN_KEY });
		if (token && token.value) {
			this.token = token.value;
			this.isAuthenticated.next(true);
		} else {
			this.isAuthenticated.next(false);
		}
	}

	login(credentials: { email; password }): Observable<any> {
		return this.http.post(`${API_URL}/api/login/`, credentials).pipe(
      map((data: any) =>
        {
          from(Storage.set({ key: TOKEN_KEY, value: data.access }));
          localStorage.setItem(ID_KEY, data.id);
        }
      ),
			tap((_) => {
				this.isAuthenticated.next(true);
			})
		);
	}

  register(registerForm): Observable<any> {
    const body = new FormData();
    body.append('email', registerForm.email);
    body.append('username', registerForm.username);
    body.append('password', registerForm.password);
    body.append('profile_picture', registerForm.profile_picture);
    return this.http.post(`${API_URL}/api/register/`, body);
  }

	logout(): Promise<void> {
		this.isAuthenticated.next(false);
    localStorage.removeItem(ID_KEY);
		return Storage.remove({ key: TOKEN_KEY });
	}
}
