import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Creation, User } from 'src/app/interfaces/interface';
import { ApiService } from 'src/app/services/api.service';

const ID_KEY = 'user-id';
const API_URL = 'http://127.0.0.1:8000';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {

  public user: User;
  public src: string;
  public baseSrc: string = API_URL;
  public creations: Creation[];
  private subscriptions: Subscription[] = [];
  private userId = localStorage.getItem(ID_KEY);

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {

    this.subscriptions.push(
      this.apiService.getUser(this.userId).subscribe((data: User) => {
        this.user = data;
        this.src = API_URL + data.profile_picture.profile_picture;
      }),
      this.apiService.getCreationsByUser(this.userId).subscribe((data: Creation[]) => {
        this.creations = data;
      })
    );

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  seeDetail(creation: Creation): void {
    this.router.navigateByUrl(`/home/detail/${creation.id}`);
  }
}
