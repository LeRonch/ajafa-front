import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tag, TagsObject } from 'src/app/interfaces/interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.page.html',
  styleUrls: ['./tags.page.scss'],
})
export class TagsPage implements OnInit, OnDestroy {

  public tags: Tag[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {

    this.subscriptions.push(
      this.apiService.getTags().subscribe((data: TagsObject) => {
        this.tags = data.results;
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
