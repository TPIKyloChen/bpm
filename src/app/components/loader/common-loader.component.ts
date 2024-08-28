import { Component, inject, input } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonLoaderService } from 'src/app/service/loader/common-loader.service';

@Component({
  selector: 'common-loader',
  standalone: true,
  imports: [ProgressSpinnerModule],
  templateUrl: './common-loader.component.html',
  styleUrl: './common-loader.component.scss',
})
export class CommonLoaderComponent {
  isDisplayLoader = input(true);

  protected commonLoaderService: CommonLoaderService =
    inject(CommonLoaderService);
}
