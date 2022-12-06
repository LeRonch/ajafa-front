import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { Storage } from '@capacitor/storage';

const TOKEN_KEY = 'my-token';
const API_URL = 'http://127.0.0.1:8000';

@Injectable({
	providedIn: 'root'
})

export class AuthenticationService {
	// Init with null to filter out the first value in a guard!
	isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
	token = '';

	constructor(private http: HttpClient) {
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
			map((data: any) => data.token),
			switchMap((token) => from(Storage.set({ key: TOKEN_KEY, value: token }))),
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
		return Storage.remove({ key: TOKEN_KEY });
	}
}
