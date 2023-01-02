import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { BrowserPage } from './page/browser/browser.page';
import { DetailPage } from './page/detail/detail.page';
import { FavoritesPage } from './page/favorites/favorites.page';
import { ProfilePage } from './page/profile/profile.page';
import { SearchPage } from './page/search/search.page';
import { TagsPage } from './page/tags/tags.page';
import { UploadPage } from './page/upload/upload.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {path: '', component: BrowserPage, pathMatch: 'prefix'},
      {path: 'upload', component: UploadPage},
      {path: 'favorites', component: FavoritesPage},
      {path: 'profile', component: ProfilePage},
      {path: 'tags', component: TagsPage},
      {path: 'search', component: SearchPage},
      {path: 'detail/:id', component: DetailPage},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
