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
    <div class="grid  max-sm:gap-[4vw] lg:gap-[1vw]">
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
