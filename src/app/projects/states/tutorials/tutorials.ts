import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'tutorials',
  templateUrl: './tutorials.component.tpl.html', // External template file
  styleUrls: ['./tutorials.component.scss'], // Optional: Add styles here
})
export class TutorialsComponent implements OnInit {
  @Input() unit: any; // Input property for unit data
  sortOrder: string = ''; // Default sort order

  ngOnInit(): void {
    // Set the sort order based on the unit's tutorialStreamsCache size
    if (this.unit?.tutorialStreamsCache?.size > 0) {
      this.sortOrder = 'tutorialStream.name';
    } else {
      this.sortOrder = 'abbreviation';
    }
  }
}
