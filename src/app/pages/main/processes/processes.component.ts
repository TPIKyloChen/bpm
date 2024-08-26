import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DiagramList } from 'src/app/model/diagram';
import { DiagramService } from 'src/app/service/diagram.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';

@Component({
  selector: 'app-processes',
  standalone: true,
  imports: [DashboardComponent],
  templateUrl: './processes.component.html',
  styleUrl: './processes.component.scss',
})
export class ProcessesComponent {
  constructor(private diagramService: DiagramService) {}

  diagramsList: DiagramList[] = [
    { name: '1', modifyTime: '4:00', diagram: '' },
    { name: '2', modifyTime: '1:00', diagram: '' },
  ];
  showImportDialog = signal(false);
  processes = signal('');

  private _router = inject(Router);

  addDiagram() {
    this.diagramsList.push({
      name: 'new',
      modifyTime: '4:00',
      diagram: '',
    });
  }

  handleFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsText(file);
    reader.onload = () => {
      this.diagramService.diagram.set(reader.result as string);
      this.showImportDialog.set(false);
      this._router.navigate(['dashboard']);
    };
  }

  loadDiagram(diagram: DiagramList) {
    this.diagramService.diagram.set(diagram.diagram);
    this._router.navigate(['dashboard']);
  }
}
