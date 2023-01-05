import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Creation } from 'src/app/interfaces/interface';
import { ApiService } from 'src/app/services/api.service';

const ID_KEY = 'user-id';
const API_URL = 'http://127.0.0.1:8000';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit, OnDestroy {

  public creations: Creation[] = [];
  public baseSrc: string = API_URL;
  private subscriptions: Subscription[] = [];
  private userId = localStorage.getItem(ID_KEY);

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.apiService.getFavCreation(this.userId).subscribe((data: Creation[]) => {
        this.creations = data;
        console.log(this.creations);

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
