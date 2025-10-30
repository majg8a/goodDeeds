import { Component, inject } from '@angular/core';
import {
  GoogleAuthProvider,
  Auth,
  AuthErrorCodes,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NzButtonComponent, NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzInputModule,
    NzButtonComponent,
    NzButtonModule,
    RouterModule,
  ],
  template: `
    <div class="w-full h-[100vh] grid place-content-center">
      <form
        action=""
        [formGroup]="form"
        (ngSubmit)="onSubmit()"
        class="grid lg:w-[30vw] sm:w-[50vw] max-sm:w-[90vw] p-[2vw] gap-[1vw] shadow-lg"
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
        <button type="button" nz-button (click)="onSignInWithGoogle()">
          sign in with google :D
        </button>
        <button type="button" nz-button routerLink="/login">Sign in</button>
      </form>
    </div>
  `,
  styles: ``,
})
export class RegisterComponent {
  googleAuthProvider = new GoogleAuthProvider();
  auth = inject(Auth);
  router = inject(Router);
  notification = inject(NzNotificationService);

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
      const res = await createUserWithEmailAndPassword(
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
      if (error.message.includes(AuthErrorCodes.WEAK_PASSWORD)) {
        this.notification.error('Error', 'password is weak', {
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
