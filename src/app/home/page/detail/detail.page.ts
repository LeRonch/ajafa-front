import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Creation, Tag } from 'src/app/interfaces/interface';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

const ID_KEY = 'user-id';
const API_URL = 'http://127.0.0.1:8000';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit, OnDestroy {

  public creation: Creation;
  public src: string;
  public tagsArray: string[] = [];
  private subscriptions: Subscription[] = [];
  private userId = localStorage.getItem(ID_KEY);

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.subscriptions.push(
      this.apiService.getCreationById(id).subscribe((data: Creation) => {
        this.creation = data;
        this.src = API_URL + this.creation[0].creation;
        this.creation[0].tags.map(elm => {
          this.apiService.getTagsbyId(elm).subscribe((tag: Tag) => {
            this.tagsArray.push(tag.label);
          });
        });
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

}
