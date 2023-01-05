import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Creation } from 'src/app/interfaces/interface';
import { ApiService } from 'src/app/services/api.service';

const API_URL = 'http://127.0.0.1:8000';
const ID_KEY = 'user-id';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.page.html',
  styleUrls: ['./browser.page.scss'],
})
export class BrowserPage implements OnInit, OnDestroy {

  public favCreations: Creation[];
  public lastCreations: Creation[];
  public baseSrc: string = API_URL;
  private subscriptions: Subscription[] = [];
  private userId = localStorage.getItem(ID_KEY);

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.apiService.getTopFiveCreations().subscribe((data: Creation[]) => {
        this.favCreations = data;
      }),
      this.apiService.getFiveLatestCreations().subscribe((data: Creation[]) => {
        this.lastCreations = data;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  seeDetail(creationId: number): void {
    this.router.navigateByUrl(`/home/detail/${creationId}`);
  }

  seeUserDetail(userId: number): void {
    if(userId === +this.userId) {
      this.router.navigateByUrl('/home/profile');
    } else {
      this.router.navigateByUrl(`/home/userdetail/${userId}`);
    }
  }

}
