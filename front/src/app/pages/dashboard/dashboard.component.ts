import { Component, inject } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NzButtonModule],
  template: `
    <header>
      <button nz-button nzType="primary" (click)="logout()">log out</button>
    </header>
  `,
  styles: ``,
})
export class DashboardComponent {
  auth = inject(Auth);
  router = inject(Router);
  notification = inject(NzNotificationService);

  logout = async () => {
    try {
      await signOut(this.auth);
      this.notification.warning('Warning', `goodbye :C`, {
        nzPlacement: 'bottomRight',
      });
      this.router.navigate(['login']);
    } catch (error) {}
  };
}
