import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { LogoutComponent } from '../components/logout/logout.component';
import { CreationUploadComponent } from '../components/creation-upload/creation-upload.component';
import { UploadPage } from './page/upload/upload.page';
import { BrowserPage } from './page/browser/browser.page';
import { ProfilePage } from './page/profile/profile.page';
import { FavoritesPage } from './page/favorites/favorites.page';
import { TagsPage } from './page/tags/tags.page';
import { DetailPage } from './page/detail/detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
  ],
  declarations: [
    HomePage,
    LogoutComponent,
    UploadPage,
    BrowserPage,
    ProfilePage,
    FavoritesPage,
    TagsPage,
    DetailPage,
    CreationUploadComponent
  ],

})
export class HomePageModule {}
