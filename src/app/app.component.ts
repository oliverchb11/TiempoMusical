import { Component, OnInit } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {


  pages = [
    {
      title: 'Perfil',
      url: '/perfil',
      icon: 'person-circle-outline'
    },
    {
      title: 'Practica',
      url: '/practicar',
      icon: 'musical-notes-outline'
    },
    {
      title: 'Estadisticas',
      url: '/estadisticas',
      icon: 'stats-chart-outline'
    },
    {
      title: 'Cerrar sesión',
      url: '/',
      icon: 'exit-outline'
    }
  ];

 
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public auth: AuthService,
    private menu: MenuController,
  ) {
   
    this.initializeApp();
  }

  ngOnInit() {
    //this.auth.localAuthSetup();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openFirst() {
    this.menu.enable(true, 'practicar');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

}
