import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'group-set-selector',
  templateUrl: './group-set-selector.component.html',
  styleUrls: ['./group-set-selector.component.scss']
})
export class GroupSetSelectorComponent implements OnInit {
  @Input() unit: any;
  @Input() selectedGroupSet: any;
  @Output() selectedGroupSetChange = new EventEmitter<any>();
  @Output() onSelectGroupSet = new EventEmitter<any>();

  constructor() {
    if (!this.unit) {
      throw new Error('Unit not supplied to group set selector');
    }
  }

  ngOnInit() {
    if (!this.unit) {
      throw new Error('Unit not supplied to group set selector');
    }
  }

  selectGroupSet(): void {
    this.selectedGroupSetChange.emit(this.selectedGroupSet);
    if (this.onSelectGroupSet) {
      this.onSelectGroupSet.emit(this.selectedGroupSet);
    }
  }
}
