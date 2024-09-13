import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SVG_ICONS as svgIcons } from './svg-icons.generated';
import { CoreModule } from '@core/core.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CoreModule],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', floatLabel: 'always' }
    }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sphience-app';

  public constructor(
    private readonly iconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer
  ) {
    svgIcons.forEach((icon: { name: string; path: string }) => {
      this.iconRegistry.addSvgIcon(icon.name, this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path));
    });
  }
}
