import {
  AfterContentInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import type Canvas from 'diagram-js/lib/core/Canvas';
import type { ImportDoneEvent, ImportXMLResult } from 'bpmn-js';
/**
 * You may include a different variant of BpmnJS:
 *
 * bpmn-viewer  - displays BPMN diagrams without the ability
 *                to navigate them
 * bpmn-modeler - bootstraps a full-fledged BPMN editor
 */
import { from, Observable, Subscription } from 'rxjs';

import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
} from 'bpmn-js-properties-panel';

import BpmnModeler from 'bpmn-js/lib/Modeler';
import { DiagramService } from 'src/app/service/diagram.service';
@Component({
  selector: 'app-diagram',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './diagram.component.html',
  styleUrl: './diagram.component.scss',
})
export class DiagramComponent implements AfterContentInit, OnDestroy, OnInit {
  @ViewChild('ref', { static: true }) private el!: ElementRef;
  @ViewChild('propertiesPanel', { static: true })
  private propertiesPanel!: ElementRef;

  @Output() private importDone: EventEmitter<ImportDoneEvent> =
    new EventEmitter();
  private bpmnModeler: BpmnModeler;
  xml = '';

  constructor(
    private http: HttpClient,
    private diagramService: DiagramService
  ) {}

  sendBpmnData(): void {
    this.bpmnModeler.saveXML({ format: true }).then((result) => {
      this.xml = result.xml;
    });
  }

  ngAfterContentInit(): void {}

  ngOnInit(): void {
    this.bpmnModeler = new BpmnModeler({
      container: this.el.nativeElement,
      propertiesPanel: {
        parent: this.propertiesPanel.nativeElement,
      },
      additionalModules: [
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
      ],
    });
    this.bpmnModeler.on<ImportDoneEvent>('import.done', ({ error }) => {
      if (!error) {
        this.bpmnModeler.get<Canvas>('canvas').zoom('fit-viewport');
        this.sendBpmnData();
      }
    });
    this.bpmnModeler.attachTo(this.el.nativeElement);

    if (this.diagramService.diagram()) {
      this.importDiagram(this.diagramService.diagram());
      return;
    } else {
      /**全新狀態 */
      this.loadDefaulXML();
    }
  }

  loadDefaulXML(): void {
    this.http.get('assets/default.xml', { responseType: 'text' }).subscribe(
      (data) => {
        this.importDiagram(data);
      },
      (error) => {
        console.error('Failed to load XML file', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.bpmnModeler.destroy();
  }

  /**
   * Creates a Promise to import the given XML into the current
   * BpmnJS instance, then returns it as an Observable.
   *
   * @see https://github.com/bpmn-io/bpmn-js-callbacks-to-promises#importxml
   */
  private importDiagram(xml: string): Observable<ImportXMLResult> {
    return from(this.bpmnModeler.importXML(xml));
  }
}
