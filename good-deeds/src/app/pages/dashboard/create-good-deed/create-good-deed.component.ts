import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  GoodDeed,
  GoodDeedsService,
} from '../../../services/good-deeds.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-create-good-deed',
  standalone: true,
  imports: [ReactiveFormsModule, NzButtonModule],
  template: `
    <div
      class="w-full  grid bg-bg-base text-text-base transition-all ease-in-out duration-700"
    >
      <form
        action=""
        [formGroup]="form"
        (ngSubmit)="onSubmit()"
        class="bg-primary text-text-base grid lg:w-[30vw] sm:w-[50vw] max-sm:w-[90vw] lg:p-[2vw] lg:gap-[1vw] max-lg:p-[4vw] max-lg:gap-[2vw] rounded-lg shadow-lg place-self-center"
      >
        <input
          type="text"
          placeholder="Description"
          formControlName="description"
          nz-input
          class="bg-bg-base"
        />
        <button
          type="submit"
          nz-button
          nzType="primary"
          [disabled]="form.invalid"
        >
          submit
        </button>
      </form>
    </div>
  `,
  styles: ``,
})
export class CreateGoodDeedComponent {
  goodDeedsService = inject(GoodDeedsService);
  route = inject(ActivatedRoute);

  parentId = signal<string | null>(null);
  parentIdSub = this.route.params
    .pipe(map((params) => params['id']))
    .subscribe((id) => this.parentId.set(id));

  form = new FormGroup({
    description: new FormControl<string>('', Validators.required),
  });

  async onSubmit() {
    const parentId = this.parentId();
    const formValue = this.form.value;

    await this.goodDeedsService.createGoodDeed(
      formValue.description as string,
      parentId as string
    );
  }
}
