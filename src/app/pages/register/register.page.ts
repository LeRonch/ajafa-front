import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl(null, Validators.required),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    profile_picture: new FormControl(null, Validators.required)
  });

	constructor(
    private authService: AuthenticationService,
		private alertController: AlertController,
		private router: Router,
	) {}

	ngOnInit() {
	}

  register() {
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/home', { replaceUrl: true });
      },
      error: error => {
        this.alertController.create({
              header: 'Registration failed',
              message: error.error,
              buttons: ['OK']
        });
      },
    });
  }
}
