import { Component, computed, inject } from '@angular/core';
import { GoodDeedComponent } from '../../../components/good-deed/good-deed.component';
import {
  GoodDeed,
  GoodDeedsService,
} from '../../../services/good-deeds.service';

@Component({
  selector: 'app-good-deeds',
  standalone: true,
  imports: [GoodDeedComponent],
  template: `
    <div class="grid  max-lg:gap-[4vw] lg:gap-[1vw]">
      <h1 class="text-center text-text-base">All the Good Deeds</h1>
      @for (goodDeed of goodDeeds(); track $index) {
      <app-good-deed [goodDeed]="goodDeed"></app-good-deed>
      }
    </div>
  `,
  styles: ``,
})
export class GoodDeedsComponent {
  goodDeedsService = inject(GoodDeedsService);
  goodDeeds = computed(
    () => this.goodDeedsService.state().goodDeeds as GoodDeed[]
  );
}
