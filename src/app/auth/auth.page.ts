import { Component, OnInit } from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {LoadingController, ToastController} from '@ionic/angular';
import {UserModel} from './user.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
    isLoading = false;
    /*loggedUser$: Observable<UserModel>;*/
  constructor(private authService: AuthService, private  router: Router,
              private loadingCtrl: LoadingController,
              private toastContoller: ToastController) { }

  ngOnInit() {
      /*this.loggedUser$ = this.authService.loggedUser;
      this.loggedUser$.subscribe(data => console.log('Data from auth service', data));*/
  }

    onSubmit(form: NgForm) {
        this.isLoading = true;
        const email = form.value.email;
        const password = form.value.password;
        /*this.loadingCtrl
            .create({ keyboardClose: true, message: 'Logging in...' })
            .then(loadingEl => {
                loadingEl.present();

                this.authService.login(email, password).subscribe(data => {
                    this.isLoading = false;
                    loadingEl.dismiss();
                    this.router.navigateByUrl('/my-data/tabs/anag');
                }, (error) => {
                    this.isLoading = false;
                    loadingEl.dismiss();
                    const toast = this.toastContoller.create({
                        message: error,
                        duration: 2000
                    });
                    toast.then((d) => d.present());
                    console.error(error);
                });
            });*/
        const self = this;
        let loadingElement = null;
        this.loadingCtrl
            .create({ keyboardClose: true, message: 'Logging in...' })
            .then(loadingEl => {
                loadingElement = loadingEl;
                loadingEl.present();
                return self.authService.login(email, password).toPromise();
            })
            .then(loginData => {
                    self.isLoading = false;
                    loadingElement.dismiss();
                    return this.toastContoller.create({
                        message: 'benvenuto',
                        duration: 2000,
                    });
                }, error => {
                    self.isLoading = false;
                    loadingElement.dismiss();
                    const toast = this.toastContoller.create({
                        message: error,
                        duration: 2000,
                    });
                    toast.then((d) => {
                        d.present();
                    });
                    return null;
                })
            .then(d => {
                d.present();
                return d.onDidDismiss();
            })
            .then(details => {
                console.log(details);
                self.router.navigateByUrl('/my-data/tabs/anag');
            });
    }


    navigateToRegisterPage() {
        this.router.navigateByUrl('/register');
    }
}
