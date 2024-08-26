import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenubarModule } from 'primeng/menubar';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabMenuModule } from 'primeng/tabmenu';

const primengModules = [
  CommonModule,
  AutoCompleteModule,
  ButtonModule,
  CalendarModule,
  CardModule,
  CheckboxModule,
  ChipsModule,
  ColorPickerModule,
  ConfirmDialogModule,
  DialogModule,
  DropdownModule,
  FileUploadModule,
  GalleriaModule,
  InputTextModule,
  InputTextareaModule,
  ListboxModule,
  MegaMenuModule,
  MenubarModule,
  MultiSelectModule,
  OverlayPanelModule,
  PanelModule,
  PasswordModule,
  ProgressBarModule,
  RadioButtonModule,
  SliderModule,
  TableModule,
  TabViewModule,
  ToastModule,
  ToggleButtonModule,
  TooltipModule,
  TreeModule,
  TreeTableModule,
  ProgressSpinnerModule,
  TabMenuModule,
];

@NgModule({
  declarations: [],
  imports: [primengModules],
  exports: [primengModules],
})
export class PrimengModule {}
