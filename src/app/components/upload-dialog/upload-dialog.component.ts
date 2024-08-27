import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DiagramService } from 'src/app/service/diagram.service';
import { PrimengModule } from 'src/share/primeng/primeng.module';

@Component({
  selector: 'app-upload-dialog',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './upload-dialog.component.html',
  styleUrl: './upload-dialog.component.scss',
})
export class UploadDialogComponent {
  @Input() uploadVisible: boolean = false;
  @Output() isUploadSubmitChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  showImportDialog = signal(false);
  constructor(private diagramService: DiagramService, private router: Router) {}

  handleFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsText(file);
    reader.onload = () => {
      this.diagramService.diagram.set(reader.result as string);
      this.showImportDialog.set(false);
      this.router.navigate(['dashboard']);
    };
  }

  cancel(isUpload: boolean) {
    this.isUploadSubmitChange.emit(isUpload);
  }

  onSelectedFiles(event) {
    const file = event.currentFiles[0];
    const reader = new FileReader();

    reader.readAsText(file);
    reader.onload = () => {
      this.diagramService.diagram.set(reader.result as string);
      this.showImportDialog.set(false);
      this.router.navigate(['dashboard']);
    };
  }
}
