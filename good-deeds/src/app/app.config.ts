import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'trivia-9c64e',
        appId: '1:179978647682:web:2882b60121b826c9ee1c9b',
        databaseURL: 'https://trivia-9c64e-default-rtdb.firebaseio.com',
        storageBucket: 'trivia-9c64e.firebasestorage.app',
        apiKey: 'AIzaSyBJL_U7yCEFywGshJSFlEH9Hrp3ELbvXz0',
        authDomain: 'trivia-9c64e.firebaseapp.com',
        messagingSenderId: '179978647682',
        measurementId: 'G-ZW1MSR6CS4',
        // projectNumber: '179978647682',
        // version: '2',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
};
