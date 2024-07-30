import { Component } from '@angular/core';
import { DiagramComponent } from '../components/diagram/diagram.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DiagramComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  diagramUrl =
    'https://cdn.statically.io/gh/bpmn-io/bpmn-js-examples/dfceecba/starter/diagram.bpmn';
  importError?: Error;

  handleImported(event: any) {
    const { type, error, warnings } = event;
    if (type === 'success') {
      console.log(`Rendered diagram (%s warnings)`, warnings.length);
    }
    if (type === 'error') {
      console.error('Failed to render diagram', error);
    }
    this.importError = error;
  }
}
