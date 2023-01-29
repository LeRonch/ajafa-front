import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, of, Subject, Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { Creation } from 'src/app/interfaces/interface';
import { ApiService } from 'src/app/services/api.service';
import { API_URL } from 'src/app/constants/constants';
const ID_KEY = 'user-id';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, OnDestroy {

  searchForm = new FormGroup({
    search: new FormControl(null, Validators.minLength(3)),
  });

  public creations: Creation[] = [];
  public searchActive = false;
  public baseSrc: string = API_URL;
  public label: string;
  public tagId: number;
  public isCleared = true ;
  private navExtra: boolean;
  private navExtratSubject = new Subject<boolean>();
  private subscriptions: Subscription[] = [];
  private userId = localStorage.getItem(ID_KEY);

  constructor(
    private router: Router,
    private apiService: ApiService,
  ) {

    }

  ngOnInit() {

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd )=> {
      if(this.router.getCurrentNavigation()?.extras?.state) {
        this.navExtratSubject.next(!this.navExtra);
      }
    });

    this.navExtratSubject.subscribe((value) =>{
      this.navExtra = value;
      if (this.navExtra) {
        this.label = this.router.getCurrentNavigation().extras.state.label;
        this.tagId = this.router.getCurrentNavigation().extras.state.id;
        this.isCleared = false;
        this.subscriptions.push(
          this.apiService.getCreationByTagId(this.tagId).subscribe((data: Creation[]) => {
            this.creations = data;
          })
        );
      }
    });
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

  seeUserDetail(userId: number): void {
    if(userId === +this.userId) {
      this.router.navigateByUrl('/home/profile');
    } else {
      this.router.navigateByUrl(`/home/userdetail/${userId}`);
    }
  }

  clear(): void {
    this.isCleared = true;
  }
}
