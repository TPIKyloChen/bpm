import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DiagramService {
  diagram = signal('');
  constructor() {}
}
