import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf, isDevMode } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthService } from './auth/auth.service';
import { SidenavModule } from './components/sidenav/sidenav.module';
import { BreakpointService } from './services/breakpoint.service';
import { LocalStorageService } from './services/local-storage.service';

@NgModule({
  exports: [],
  imports: [CommonModule, ToastrModule, SidenavModule],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      deps: [AuthService]
    },
    LocalStorageService,
    BreakpointService
  ]
})
export class CoreModule {
  public constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule && !isDevMode()) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
