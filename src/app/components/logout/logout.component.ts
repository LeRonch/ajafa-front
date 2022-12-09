import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router,

  ) { }

  ngOnInit() {}

  async logout() {
		await this.authService.logout();
		this.router.navigateByUrl('/login', { replaceUrl: true });
    window.location.reload();
	}

}
