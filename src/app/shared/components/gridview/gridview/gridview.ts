import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { DetailComponent } from "../../../../modules/admin/components/detail-component/detail-component";



@Component({
  selector: 'app-gridview',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    DetailComponent
  ],
  templateUrl: './gridview.html',
  styleUrl: './gridview.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('collapsed <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class Gridview {

  expandedElement: any;

  @Input() dataSource: any;
  @Input() resultsLength!: number;
  @Input() displayedColumns!: any[];
  @Input() fieldToColumnNames!: any[];
  @Input() loading!: boolean;

  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  onRefresh() {
    this.refresh.emit();
  }
}
