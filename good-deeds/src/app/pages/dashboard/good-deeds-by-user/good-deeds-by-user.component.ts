import { Component, computed, inject, signal } from '@angular/core';
import { GoodDeedComponent } from '../../../components/good-deed/good-deed.component';
import {
  GoodDeed,
  GoodDeedsService,
} from '../../../services/good-deeds.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-good-deeds-by-user',
  standalone: true,
  imports: [GoodDeedComponent],
  template: `
    <div class="grid  max-lg:gap-[4vw] lg:gap-[1vw]">
      <h2 class="text-center text-text-base">
        Good Deeds made by the user {{ id() }}
      </h2>
      @for (goodDeed of goodDeeds(); track $index) {
      <app-good-deed [goodDeed]="goodDeed"></app-good-deed>
      }@empty {
      <h1 class="text-center text-text-base">
       Does not have Good Deeds :C
      </h1>
      }
    </div>
  `,
  styles: ``,
})
export class GoodDeedsByUserComponent {
  route = inject(ActivatedRoute);
  goodDeedsService = inject(GoodDeedsService);

  id = signal<string>('');
  idSub = this.route.params
    .pipe(
      map((params) => params['id'] as string),
      takeUntilDestroyed()
    )
    .subscribe((id) => {
      this.goodDeedsService.goodDeedsByUserReqSubject$.next(id);
      this.id.set(id);
    });

  goodDeeds = computed(
    () => this.goodDeedsService.state().goodDeedsByUser as GoodDeed[]
  );
}
