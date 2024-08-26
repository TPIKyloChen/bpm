import { Component, inject, signal } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Router, RouterOutlet } from '@angular/router';
import { DiagramService } from 'src/app/service/diagram.service';
import { DiagramList } from 'src/app/model/diagram';
import { TabsComponent } from 'src/app/components/tabs/tabs.component';
import { MenuItem } from 'primeng/api';
import { PrimengModule } from 'src/share/primeng/primeng.module';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [TabsComponent, RouterOutlet, PrimengModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  constructor(private diagramService: DiagramService) {}

  items: MenuItem[] | undefined = [
    { label: 'Processes', routerLink: '/processes' },
    { label: 'Forms', routerLink: '/main-forms' },
    { label: 'Decision Tables', routerLink: '/decisionTables' },
    { label: 'Apps', routerLink: '/main-apps' },
  ];
}
