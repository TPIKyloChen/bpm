import { Component, Input } from '@angular/core';
import { PrimengModule } from 'src/share/primeng/primeng.module';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() labelName = '';
  @Input() id = '';
}
