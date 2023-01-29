import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Creation, Tag, Comment } from 'src/app/interfaces/interface';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { API_URL } from 'src/app/constants/constants';

const ID_KEY = 'user-id';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit, OnDestroy {

  commentForm = new FormGroup({
    comment: new FormControl(null, [Validators.min(3)]),
  });

  public creation: Creation;
  public src: string;
  public formIsOpen = false;
  public comments: Comment[] = [];
  public tagsArray: string[] = [];
  private subscriptions: Subscription[] = [];
  private userId = localStorage.getItem(ID_KEY);

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
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
      this.apiService.getComments(id).subscribe((data: Comment[]) => {
        this.comments = data;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  postComment(creationId: number): void {
    this.apiService.postComment(this.commentForm.value, creationId).subscribe({
      next: () => {
        this.presentAlert();
        this.ngOnInit();
      },
      error: error => {
        this.failureAlert();
      },
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Success !',
      message: 'Your comment has been successfully posted !',
      buttons: ['Ok !'],
    });

    await alert.present();
  }

  async failureAlert() {
    const alert = await this.alertController.create({
      header: 'Woops !',
      message: 'Sorry, it seems something went wrong ! Please refresh and try again !',
      buttons: ['Ok...'],
    });
  }

  seeDetail(creation: Creation): void {
    this.router.navigateByUrl(`/home/detail/${creation.id}`);
  }

  seeUserDetail(userId: number): void {
    if(userId === +this.userId) {
      this.router.navigateByUrl('/home/profile');
    } else {
      this.router.navigateByUrl(`/home/userdetail/${userId}`);
    }
  }
}
