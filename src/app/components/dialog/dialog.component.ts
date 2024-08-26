import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimengModule } from 'src/share/primeng/primeng.module';
import { InputComponent } from '../input/input.component';
import { TextareaComponent } from '../textarea/textarea.component';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [PrimengModule, InputComponent, TextareaComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  @Input() visible: boolean = false;
  @Output() isSubmitChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  handleClose() {
    console.log('Dialog closed');
  }

  submit(isSubmit: boolean) {
    this.visible = false;
    this.isSubmitChange.emit(isSubmit);
  }
}
