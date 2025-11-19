import { Component, inject } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NzButtonModule, RouterModule],
  template: `
    <div
      class="bg-bg-base text-text-base min-h-screen transition-all ease-in-out duration-700"
    >
      <header
        class="bg-primary text-text-base p-4 grid grid-cols-[1fr_min-content_min-content] gap-[2vw]"
      >
        <h1 class="text-2xl">PAY IT FORWARD</h1>
        <button
          (click)="themeService.toggleTheme()"
          class="bg-accent text-white whitespace-nowrap py-2 px-4 rounded"
        >
          Toggle Theme
        </button>
        <button
          (click)="logout()"
          class="bg-accent text-white whitespace-nowrap py-2 px-4 rounded"
        >
          log out
        </button>
      </header>

      <main class="p-4">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: ``,
})
export class DashboardComponent {
  auth = inject(Auth);
  router = inject(Router);
  notification = inject(NzNotificationService);
  themeService = inject(ThemeService);

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
