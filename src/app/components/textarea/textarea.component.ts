import { Component, Input } from '@angular/core';
import { PrimengModule } from 'src/share/primeng/primeng.module';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
})
export class TextareaComponent {
  @Input() labelName = '';
  @Input() id = '';
}
