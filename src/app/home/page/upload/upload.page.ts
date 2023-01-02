import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tag, TagsObject } from 'src/app/interfaces/interface';
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
    description: new FormControl(null),
    tags: new FormArray([], Validators.required),
  });

  public tags: Tag[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.apiService.getTags().subscribe((data: TagsObject) => {
        this.tags = data.results;
      })
    );
  }

  onChange(tag: number, e) {
    const emailFormArray = this.uploadForm.controls.tags;
    if(e.checked) {
      emailFormArray.push(new FormControl(tag));
    } else {
      const index = emailFormArray.controls.findIndex(x => x.value === tag);
      emailFormArray.removeAt(index);
    }
  }

  upload() {
    this.apiService.postCreation(this.uploadForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/home', { replaceUrl: true });
      },
      error: error => {},
    });
  }

}
