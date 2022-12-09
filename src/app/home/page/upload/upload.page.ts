import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  uploadForm = new FormGroup({
    creation: new FormControl(null, Validators.required),
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, [Validators.required]),
  });

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  upload() {
    this.apiService.postCreation(this.uploadForm.value).subscribe();
  }

}
