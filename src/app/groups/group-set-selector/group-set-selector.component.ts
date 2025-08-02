import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {Unit, GroupSet} from '/workspace/doubtfire-web/src/app/api/models/doubtfire-model';

@Component({
  selector: 'group-set-selector',
  templateUrl: './group-set-selector.component.html',
  styleUrls: ['./group-set-selector.component.scss']
})
export class GroupSetSelectorComponent implements OnInit, OnChanges {
  @Input() unit: Unit;
  @Input() selectedGroupSet: GroupSet;
  @Output() selectedGroupSetChange = new EventEmitter<any>();
  @Output() onSelectGroupSet = new EventEmitter<any>();

  ngOnInit(): void {
    if (!this.unit) {
      throw new Error('Unit not supplied to group set selector');
    }
  }

  ngOnChanges(changes: SimpleChanges) { // Todo @Jason: Remove this method
    console.log('GroupSetSelectorComponent ngOnChanges:', changes);
    if (changes['unit']) {
      console.log('Unit changed from:', changes['unit'].previousValue, 'to:', changes['unit'].currentValue);
    }
    if (changes['selectedGroupSet']) {
      console.log('SelectedGroupSet changed from:', changes['selectedGroupSet'].previousValue, 'to:', changes['selectedGroupSet'].currentValue);
    }
  }

  selectGroupSet(): void {
    this.selectedGroupSetChange.emit(this.selectedGroupSet);
    if (this.onSelectGroupSet) {
      this.onSelectGroupSet.emit(this.selectedGroupSet);
    }
  }
}
