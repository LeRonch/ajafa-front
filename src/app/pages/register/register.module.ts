import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegisterPageRoutingModule } from './register-routing.module';
import { ProfilePicUploadComponent } from '../../components/profile-pic-upload/profile-pic-upload.component';
import { RegisterPage } from './register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    RegisterPage,
    ProfilePicUploadComponent
  ]
})
export class RegisterPageModule {}
