import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DiagramList } from 'src/app/model/diagram';
import { DiagramService } from 'src/app/service/diagram.service';
import { PrimengModule } from 'src/share/primeng/primeng.module';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogComponent } from '../../../components/dialog/dialog.component';
import { UploadDialogComponent } from '../../../components/upload-dialog/upload-dialog.component';

@Component({
  selector: 'app-processes',
  standalone: true,
  imports: [PrimengModule, DialogComponent, UploadDialogComponent],
  templateUrl: './processes.component.html',
  styleUrl: './processes.component.scss',
})
export class ProcessesComponent {
  visible = false;
  uploadVisible = false;
  items: MenuItem[];
  constructor(private diagramService: DiagramService) {
    this.items = [
      {
        label: 'Last Modified',
        items: [],
        command: () => {
          this.update('Last Modified');
        },
      },
      {
        label: 'Oldest',
        items: [],
        command: () => {
          this.update('Oldest');
        },
      },
      {
        label: 'Name,A-Z',
        items: [],
        command: () => {
          this.update('Name,A-Z');
        },
      },
      {
        label: 'Name,Z-A',
        items: [],
        command: () => {
          this.update('Name,Z-A');
        },
      },
    ];
  }

  diagramsList: DiagramList[] = [
    { name: '1', modifyTime: '4:00', diagram: '' },
    { name: '2', modifyTime: '2:00', diagram: '' },
    { name: '1', modifyTime: '4:00', diagram: '' },
    { name: '2', modifyTime: '3:00', diagram: '' },
  ];
  showImportDialog = signal(false);
  currentSortName = 'Last Modified';
  processes = signal('');

  private _router = inject(Router);

  addDiagram() {
    this.visible = true;
  }

  isSubmitChange(visible: boolean) {
    if (visible) {
      console.log('Visible was closed. 確定要送出:', visible);
      this.diagramsList.push({
        name: 'new',
        modifyTime: '4:00',
        diagram: '',
      });
    }
    this.visible = false;
  }
  isUploadSubmitChange(visible: boolean) {
    if (visible) {
      this._router.navigate(['/dashboard']);
    } else {
      this.uploadVisible = false;
    }
  }

  uploadDiagram() {
    this.uploadVisible = true;
  }

  loadDiagram(diagram: DiagramList) {
    this.diagramService.diagram.set(diagram.diagram);
    this._router.navigate(['/dashboard']);
  }

  getSortName(event: MouseEvent) {
    console.log(event);
  }

  update(name: string) {
    this.currentSortName = name;
  }
}
