import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

const ID_KEY = 'user-id';

@Component({
  selector: 'app-image-toolbar',
  templateUrl: './image-toolbar.component.html',
  styleUrls: ['./image-toolbar.component.scss'],
})
export class ImageToolbarComponent implements OnInit {

  @Input() favCount: number;
  @Input() downloadCount: number;
  @Input() creationId: number;
  @Input() userId: number;
  @Input() favorite: [];
  @Input() url: string;
  @Input() imgName: string;

  public currentUserId = +localStorage.getItem(ID_KEY);
  public updatedCount: number;
  public updatedFavCount: number;
  public isFavorite: boolean;

  constructor(
    private apiService: ApiService,
    private alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.updatedCount = this.downloadCount;
    this.updatedFavCount = this.favCount;
    this.isFavorite = this.favorite.find(elm => elm === this.currentUserId) ? true : false;
  }

  addToFav(creationId: number): void {
    this.apiService.postFavorite(creationId, this.currentUserId).subscribe({
      next: () => {
        this.updatedFavCount +=1;
        this.isFavorite = true;
      },
      error: error => {
      },
    });
  }

  deleteFromFav(creationId: number): void {
    this.apiService.deleteFavorite(creationId, this.currentUserId).subscribe({
      next: () => {
        this.updatedFavCount -= 1;
        this.isFavorite = false;
      },
      error: error => {
      },
    });
  }

  deleteCreation(creationId: number): void {
    this.deleteAlert();
  }

  downloadCountIncrease(creationId: number): void {
    this.apiService.postDowloadCountIncrease(creationId).subscribe({
      next: () => {
        this.updatedCount +=1;
        this.downloadImage(this.url, this.imgName);
      },
      error: error => {
      },
    });
  }

  downloadImage(url: string, name: string){
    fetch(url)
      .then(resp => resp.blob())
      .then(blob => {
          const blobUrl = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = blobUrl;
          a.download = name;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(blobUrl);
      })
      .catch(() => alert('Something went wrong, sorry !'));
  }

  async deleteAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you want to delete this creation ?',
      buttons: ['No',
        {
          text: 'Yes',
          handler: () => {
            this.apiService.deleteCreation(this.creationId).subscribe({
              next: () => {
                this.router.navigateByUrl('/home');
              },
              error: error => {
              },
            });
          }
        }
      ],
    });

    await alert.present();
  }
}
