import { Component, input } from '@angular/core';

@Component({
  selector: 'app-quick-action',
  templateUrl: './quick-action.component.html',
  styleUrls: ['./quick-action.component.scss']
})
export class QuickActionComponent {
  public icon = input.required<string>();
  public text = input.required<string>();
}
