import { Component, inject } from '@angular/core';
import {
  Auth,
  AuthErrorCodes,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule, NzButtonComponent } from 'ng-zorro-antd/button';
import { Router, RouterModule } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ThemeService } from '../../services/theme.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzInputModule,
    NzButtonComponent,
    NzButtonModule,
    RouterModule,
  ],
  template: `
    <div class="w-full min-h-screen grid bg-bg-base text-text-base transition-all ease-in-out duration-700">
      <form
        action=""
        [formGroup]="form"
        (ngSubmit)="onSubmit()"
        class="bg-primary text-text-base grid lg:w-[30vw] sm:w-[50vw] max-sm:w-[90vw] lg:p-[2vw] lg:gap-[1vw] max-lg:p-[4vw] max-lg:gap-[2vw] rounded-lg shadow-lg place-self-center"
      >
        <input
          type="text"
          placeholder="email"
          formControlName="email"
          nz-input
        />
        <input
          type="password"
          placeholder="password"
          formControlName="password"
          nz-input
        />
        <button type="submit" nz-button nzType="primary">submit</button>
        <button
          type="button"
          class="bg-accent text-white whitespace-nowrap py-2 px-4 rounded"
          (click)="onSignInWithGoogle()"
        >
          sign in with google :D
        </button>
        <button
          type="button"
          class="bg-accent text-white whitespace-nowrap py-2 px-4 rounded"
          routerLink="/register"
        >
          sign up
        </button>
      </form>
      <button
        (click)="themeService.toggleTheme()"
        class="bg-accent text-white whitespace-nowrap py-2 px-4 rounded place-self-end m-[2vw]"
      >
        Toggle Theme
      </button>
    </div>
  `,
  styles: ``,
})
export class LoginComponent {
  googleAuthProvider = new GoogleAuthProvider();
  auth = inject(Auth);
  router = inject(Router);
  notification = inject(NzNotificationService);
  themeService = inject(ThemeService);

  form = new FormGroup({
    email: new FormControl<string>(''),
    password: new FormControl<string>(''),
  });

  onSubmit = async () => {
    if (this.form.invalid) {
      return;
    }
    const formValue = this.form.value;
    try {
      const res = await signInWithEmailAndPassword(
        this.auth,
        formValue.email as string,
        formValue.password as string
      );
      this.notification.success('Success', `welcome!`, {
        nzPlacement: 'bottomRight',
      });
      this.router.navigate(['dashboard']);
    } catch (error) {
      if (!(error instanceof Error)) {
        return;
      }

      if (error.message.includes(AuthErrorCodes.INVALID_EMAIL)) {
        this.notification.error('Error', 'email is not valid', {
          nzDuration: 0,
          nzPlacement: 'bottomRight',
        });
        return;
      }

      if (error.message.includes(AuthErrorCodes.INVALID_PASSWORD)) {
        this.notification.error('Error', 'password is not valid', {
          nzDuration: 0,
          nzPlacement: 'bottomRight',
        });
        return;
      }

      this.notification.error('Error', 'something went wrong', {
        nzDuration: 0,
        nzPlacement: 'bottomRight',
      });
    }
  };

  onSignInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(this.auth, this.googleAuthProvider);
      this.notification.success('Success', `welcome ${res.user.displayName}!`, {
        nzPlacement: 'bottomRight',
      });
      this.router.navigate(['dashboard']);
    } catch (error) {
      if (!(error instanceof Error)) {
        return;
      }
    }
  };
}
