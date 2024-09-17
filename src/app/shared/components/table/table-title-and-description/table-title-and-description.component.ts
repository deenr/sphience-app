import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-title-and-description',
  templateUrl: './table-title-and-description.component.html',
  styleUrls: ['./table-title-and-description.component.scss']
})
export class TableTitleAndDescriptionComponent {
  @Input() public title: string;
  @Input() public description: string;
}
