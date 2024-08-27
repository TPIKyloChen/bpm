import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProcessesComponent } from './pages/main/processes/processes.component';
import { DecisionTablesComponent } from './pages/main/decision-tables/decision-tables.component';
import { MainAppsComponent } from './pages/main/main-apps/main-apps.component';
import { MainFormsComponent } from './pages/main/main-forms/main-forms.component';
import { BpmnFormComponent } from './components/bpmn-form/bpmn-form.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'processes' },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'processes',
        component: ProcessesComponent,
      },
      {
        path: 'main-forms',
        component: MainFormsComponent,
      },
      {
        path: 'decisionTables',
        component: DecisionTablesComponent,
      },
      {
        path: 'main-apps',
        component: MainAppsComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'bpmn-form',
    component: BpmnFormComponent,
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'processes',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
