import { Component, OnInit } from '@angular/core';
import { FormPlayground } from '@bpmn-io/form-js';
import schema from './empty.json';

@Component({
  selector: 'app-bpmn-form',
  standalone: true,
  imports: [],
  templateUrl: './bpmn-form.component.html',
  styleUrls: ['./bpmn-form.component.scss'],
})
export class BpmnFormComponent implements OnInit {
  playground: any;

  ngOnInit(): void {
    this.playground = new FormPlayground({
      container: document.querySelector('#form'),
      schema: schema,
      data: {},
    });
  }
}
