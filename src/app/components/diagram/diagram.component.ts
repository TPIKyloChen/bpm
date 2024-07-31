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
import BpmnJS from 'bpmn-js/lib/Modeler';
import { from, Observable, Subscription } from 'rxjs';

import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
} from 'bpmn-js-properties-panel';

import BpmnModeler from 'bpmn-js/lib/Modeler';
@Component({
  selector: 'app-diagram',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './diagram.component.html',
  styleUrl: './diagram.component.scss',
})
export class DiagramComponent
  implements AfterContentInit, OnChanges, OnDestroy, OnInit
{
  @ViewChild('ref', { static: true }) private el!: ElementRef;
  @ViewChild('propertiesPanel', { static: true })
  private propertiesPanel!: ElementRef;

  @Input() public url?: string;
  @Output() private importDone: EventEmitter<ImportDoneEvent> =
    new EventEmitter();
  // private bpmnJS: BpmnJS = new BpmnJS();
  private bpmnModeler: BpmnModeler;
  xml = '';

  constructor(private http: HttpClient) {
    // this.bpmnJS.on<ImportDoneEvent>('import.done', ({ error }) => {
    //   if (!error) {
    //     this.bpmnJS.get<Canvas>('canvas').zoom('fit-viewport');
    //     // this.sendBpmnData();
    //   }
    // });
  }

  sendBpmnData(): void {
    this.bpmnModeler.saveXML({ format: true }).then((result) => {
      this.xml = result.xml;
    });
  }

  ngAfterContentInit(): void {
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
  }

  ngOnInit(): void {
    if (this.url) {
      this.loadUrl(this.url);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // re-import whenever the url changes
    if (changes['url']) {
      this.loadUrl(changes['url'].currentValue);
    }
  }

  ngOnDestroy(): void {
    this.bpmnModeler.destroy();
  }

  /**
   * Load diagram from URL and emit completion event
   */
  loadUrl(url: string): Subscription {
    return this.http
      .get(url, { responseType: 'text' })
      .pipe(
        switchMap((xml: string) => this.importDiagram(xml)),
        map((result) => result.warnings)
      )
      .subscribe(
        (warnings) => {
          this.importDone.emit({
            type: 'success',
            warnings,
          });
        },
        (err) => {
          this.importDone.emit({
            type: 'error',
            error: err,
          });
        }
      );
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
