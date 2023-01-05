import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Creation, User } from 'src/app/interfaces/interface';
import { ApiService } from 'src/app/services/api.service';

const API_URL = 'http://127.0.0.1:8000';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.page.html',
  styleUrls: ['./userdetail.page.scss'],
})
export class UserDetailPage implements OnInit, OnDestroy {

  public user: User;
  public src: string;
  public baseSrc: string = API_URL;
  public creations: Creation[];
  public formLinkIsOpen = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.subscriptions.push(
      this.apiService.getUser(id).subscribe((data: User) => {
        this.user = data;
        this.src = API_URL + data.profile_picture.profile_picture;
      }),
      this.apiService.getCreationsByUser(id).subscribe((data: Creation[]) => {
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
