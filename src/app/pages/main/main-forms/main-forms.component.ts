import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { DiagramList } from 'src/app/model/diagram';
import { PrimengModule } from 'src/share/primeng/primeng.module';

@Component({
  selector: 'app-main-forms',
  standalone: true,
  imports: [PrimengModule, DialogComponent],
  templateUrl: './main-forms.component.html',
  styleUrl: './main-forms.component.scss',
})
export class MainFormsComponent {
  formVisible = false;
  items: MenuItem[];
  currentSortName = 'Last Modified';
  constructor(private router: Router) {
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

  loadDiagramForm(diagram: DiagramList) {
    this.router.navigate(['/bpmn-form']);
  }

  diagramButtonList: DiagramList[] = [
    { name: '表單製作1', modifyTime: '12:00', diagram: '' },
    { name: '表單製作2', modifyTime: '21:00', diagram: '' },
    { name: '表單製作3', modifyTime: '16:00', diagram: '' },
    { name: '表單製作4', modifyTime: '19:00', diagram: '' },
  ];

  isSubmitChange(visible: boolean) {
    if (visible) {
      console.log('Visible was closed. 確定要送出:', visible);
      this.diagramButtonList.push({
        name: 'new',
        modifyTime: '4:00',
        diagram: '',
      });
    }
    this.formVisible = false;
  }

  update(name: string) {
    this.currentSortName = name;
  }

  addDiagram() {
    this.formVisible = true;
  }
}
