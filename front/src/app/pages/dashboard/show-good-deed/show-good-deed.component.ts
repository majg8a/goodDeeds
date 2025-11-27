import { Component, computed, inject, signal } from '@angular/core';
import {
  GoodDeed,
  GoodDeedsService,
} from '../../../services/good-deeds.service';
import { GoodDeedComponent } from '../../../components/good-deed/good-deed.component';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-show-good-deed',
  standalone: true,
  imports: [GoodDeedComponent],
  template: `
    <h1 class="text-center text-text-base">
      Good Deed {{ id() }}
    </h1>
    <app-good-deed [goodDeed]="goodDeed()"></app-good-deed>
  `,
  styles: ``,
})
export class ShowGoodDeedComponent {
  route = inject(ActivatedRoute);
  goodDeedsService = inject(GoodDeedsService);

  id = signal('');
  idSub = this.route.params
    .pipe(
      map((params) => params['id'] as string),
      takeUntilDestroyed()
    )
    .subscribe((id) => {
      this.goodDeedsService.goodDeedReq$.next(id);
      this.id.set(id);
    });

  goodDeed = computed(() => this.goodDeedsService.state().goodDeed as GoodDeed);
}
