import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../interfaces/interface';
import { ApiService } from '../services/api.service';
import { API_URL } from 'src/app/constants/constants';

const ID_KEY = 'user-id';


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
