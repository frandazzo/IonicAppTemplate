import {Component, OnDestroy, OnInit} from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AuthService} from './auth/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UserModel} from './auth/user.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private previousAuth = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
  }



  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

    onLogout() {
        this.authService.logout();
    }

  ngOnInit(): void {
    this.subscription = this.authService.IsAuthenticated.subscribe(auth => {
        if (!auth && this.previousAuth !== auth) {
          this.router.navigateByUrl('/auth');
        }
        this.previousAuth = auth;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
