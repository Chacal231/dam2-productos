import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonIcon
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import * as icons from 'ionicons/icons';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonIcon
  ]
})
export class InicioPage {
  isDarkMode = false;

  constructor() {
    addIcons({
      'sun-outline': icons.sunnyOutline,
      'moon-outline': icons.moonOutline
    });
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    // Activa la clase nativa de Ionic 9 y también la clase dark por compatibilidad
    document.documentElement.classList.toggle('ion-palette-dark', this.isDarkMode);
    document.body.classList.toggle('dark', this.isDarkMode);
  }
}