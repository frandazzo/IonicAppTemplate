import { Component, OnInit } from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {LoadingController} from '@ionic/angular';
import {UserModel} from './user.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
    isLogin = true;
    isLoading = false;
    loggedUser$: Observable<UserModel>;
  constructor(private authService: AuthService, private  router: Router,  private loadingCtrl: LoadingController) { }

  ngOnInit() {
      this.loggedUser$ = this.authService.loggedUser;
      this.loggedUser$.subscribe(data => console.log('Data from auth service', data));
  }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        console.log(email, password);

        if (this.isLogin) {
            // Send a request to login servers
        } else {
            // Send a request to signup servers
        }
    }

    onLogin() {
        this.isLoading = true;
        this.loadingCtrl
            .create({ keyboardClose: true, message: 'Logging in...' })
            .then(loadingEl => {
                loadingEl.present();

                this.authService.login().subscribe(data => {
                    this.isLoading = false;
                    loadingEl.dismiss();
                    this.router.navigateByUrl('/my-data/tabs/anag');
                });
            });
    }

    onSwitchAuthMode() {
        this.isLogin = !this.isLogin;
    }
}
