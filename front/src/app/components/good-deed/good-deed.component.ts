import { Component, inject, input } from '@angular/core';
import { GoodDeed } from '../../services/good-deeds.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-good-deed',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div
      class="w-full grid bg-bg-base text-text-base transition-all ease-in-out duration-700"
    >
      <div
        class="bg-primary text-text-base grid lg:w-[30vw] sm:w-[50vw] max-sm:w-[90vw] lg:p-[2vw] lg:gap-[1vw] max-lg:p-[4vw] max-lg:gap-[2vw] rounded-lg shadow-lg place-self-center"
      >
        <p class="font-bold text-center first-letter:uppercase">
          {{ goodDeed()?.description }}
        </p>
        @if (goodDeed()?.parentId) {
        <button
          class="bg-accent text-white whitespace-nowrap py-2 px-4 rounded"
          [routerLink]="['/', 'dashboard', 'goodDeed', goodDeed()?.parentId]"
        >
          See parent Good deed
        </button>
        }

        <button
          class="bg-accent text-white whitespace-nowrap py-2 px-4 rounded"
          [routerLink]="['/', 'dashboard', 'createGoodDeed', goodDeed()?.id]"
        >
          Append child Good deed
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class GoodDeedComponent {
  goodDeed = input<GoodDeed | null>(null);
}
