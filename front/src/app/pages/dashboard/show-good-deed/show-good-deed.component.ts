import { Component, computed, inject } from '@angular/core';
import {
  GoodDeed,
  GoodDeedsService,
} from '../../../services/good-deeds.service';
import { GoodDeedComponent } from '../../../components/good-deed/good-deed.component';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-show-good-deed',
  standalone: true,
  imports: [GoodDeedComponent],
  template: ` <app-good-deed [goodDeed]="goodDeed()"></app-good-deed> `,
  styles: ``,
})
export class ShowGoodDeedComponent {
  route = inject(ActivatedRoute);
  goodDeedsService = inject(GoodDeedsService);

  idSub = this.route.params
    .pipe(map((params) => params['id'] as string))
    .subscribe((id) => {
      this.goodDeedsService.goodDeedReq$.next(id);
    });

  goodDeed = computed(() => this.goodDeedsService.state().goodDeed as GoodDeed);
}
