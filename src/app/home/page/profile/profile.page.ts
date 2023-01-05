import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Creation, User } from 'src/app/interfaces/interface';
import { ApiService } from 'src/app/services/api.service';

const ID_KEY = 'user-id';
const API_URL = 'http://127.0.0.1:8000';
const regPaypal = 'paypal\.me\/[a-zA-Z0-9-_]+$';
const regPatreon = '^https?:\/\/www\.patreon\.com\/[a-zA-Z0-9-_]+$';
const regTwitter = '(https:\/\/twitter.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit, OnDestroy {

  linkForm = new FormGroup({
    paypalLink: new FormControl(null, [Validators.pattern(regPaypal)]),
    patreonLink: new FormControl(null, [Validators.pattern(regPatreon)]),
    twitterLink: new FormControl(null, [Validators.pattern(regTwitter)]),
  });

  descForm = new FormGroup({
    description: new FormControl(null, [Validators.min(5)]),
  });

  public user: User;
  public src: string;
  public baseSrc: string = API_URL;
  public creations: Creation[];
  public formLinkIsOpen = false;
  private subscriptions: Subscription[] = [];
  private userId = localStorage.getItem(ID_KEY);

  constructor(
    private apiService: ApiService,
    private router: Router,
    private alertController: AlertController
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

  addLinks(): void {
    this.apiService.putLinks(this.linkForm.value).subscribe({
      next: () => {
        this.presentAlert();
      },
      error: error => {
        this.failureAlert();
      },
    });
  }

  addDesc(): void {
    this.apiService.putDesc(this.descForm.value).subscribe({
      next: () => {
        this.descAlert();
      },
      error: error => {
        this.failureAlert();
      },
    });
  }

  async descAlert() {
    const alert = await this.alertController.create({
      header: 'Success !',
      message: 'Your description has been successfully updated!',
      buttons: ['Ok !'],
    });

    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Success !',
      message: 'Your links have been successfully updated !',
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

    await alert.present();
  }
}
