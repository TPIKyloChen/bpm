import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonLoaderComponent } from './components/loader/common-loader.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonLoaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
