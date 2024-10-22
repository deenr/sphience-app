import { Component, input } from '@angular/core';

@Component({
  selector: 'app-table-image',
  templateUrl: './table-image.component.html',
  styleUrls: ['./table-image.component.scss']
})
export class TableImageComponent {
  public imageSrc = input<string>();
}
