import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf, isDevMode } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from './auth/auth.service';
import { SidenavModule } from './components/sidenav/sidenav.module';
import { BreakpointService } from './services/breakpoint.service';
import { LocalStorageService } from './services/local-storage.service';

@NgModule({
  exports: [],
  imports: [CommonModule, ToastrModule, SidenavModule],
  providers: [AuthService, LocalStorageService, BreakpointService]
})
export class CoreModule {
  public constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule && !isDevMode()) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
