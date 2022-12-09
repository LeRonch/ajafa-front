import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../interfaces/interface';
import { ApiService } from '../services/api.service';

const ID_KEY = 'user-id';
const API_URL = 'http://127.0.0.1:8000';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  public user: User;
  public src: string;
  private subscriptions: Subscription[] = [];
  private userId = localStorage.getItem(ID_KEY);

  constructor(
    private apiService: ApiService
    ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.apiService.getUser(this.userId).subscribe((data: User) => {
        this.user = data;
        this.src = API_URL + data.profile_picture.profile_picture;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
