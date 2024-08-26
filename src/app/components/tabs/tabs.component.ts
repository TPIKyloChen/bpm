import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PrimengModule } from 'src/share/primeng/primeng.module';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [PrimengModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent implements OnInit {
  @Input() items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.activeItem = this.items[0];
  }
}
