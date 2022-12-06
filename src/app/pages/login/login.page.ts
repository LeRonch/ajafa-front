import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
	credentials: FormGroup;

	constructor(
		private fb: FormBuilder,
		private authService: AuthenticationService,
		private alertController: AlertController,
		private router: Router,
		private loadingController: LoadingController
	) {}

	ngOnInit() {
		this.credentials = this.fb.group({
			username: ['', [Validators.required]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

	async login() {
		const loading = await this.loadingController.create();
		await loading.present();

		this.authService.login(this.credentials.value).subscribe(
			async (res) => {
				await loading.dismiss();
				this.router.navigateByUrl('/home', { replaceUrl: true });
			},
			async (res) => {
				await loading.dismiss();
				const alert = await this.alertController.create({
					header: 'Login failed',
					message: res.error.error,
					buttons: ['OK']
				});

				await alert.present();
			}
		);
	}

  public goRegister(): void {
    this.router.navigateByUrl('/register');
  }

}
