import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Creation } from 'src/app/interfaces/interface';
import { ApiService } from 'src/app/services/api.service';

const API_URL = 'http://127.0.0.1:8000';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, OnDestroy {

  searchForm = new FormGroup({
    search: new FormControl(null, Validators.minLength(3)),
  });

  public label: string;
  public creations: Creation[] = [];
  public searchActive = false;
  public baseSrc: string = API_URL;
  private tagId: number;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.label = this.router.getCurrentNavigation().extras.state.label;
      this.tagId = this.router.getCurrentNavigation().extras.state.id;
      this.subscriptions.push(
        this.apiService.getCreationByTagId(this.tagId).subscribe((data: Creation[]) => {
          this.creations = data;
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  seeDetail(creation: Creation): void {
    this.router.navigateByUrl(`/home/detail/${creation.id}`);
  }

  search(): void {
    if (this.searchForm.value.search) {
      this.searchActive = true;
      this.subscriptions.push(
        this.apiService.getCreationByName(this.searchForm.value.search).subscribe((data: Creation[]) => {
          this.creations = data;
        })
      );
    }
  }
}
