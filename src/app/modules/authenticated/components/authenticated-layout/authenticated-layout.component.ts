import { Component, signal, ViewChild, WritableSignal } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { Breakpoint, BreakpointService } from '@core/services/breakpoint.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-authenticated-layout',
  templateUrl: './authenticated-layout.component.html',
  styleUrls: ['./authenticated-layout.component.scss']
})
export class AuthenticatedLayoutComponent {
  @ViewChild(MatDrawer) drawer!: MatDrawer;

  public isDesktop$: Observable<boolean>;
  public Breakpoint = Breakpoint;

  public $isSidenavOpened: WritableSignal<boolean> = signal(false);

  public constructor(
    private readonly authService: AuthService,
    private readonly toastService: ToastrService,
    private readonly breakpointService: BreakpointService,
    private readonly router: Router
  ) {
    this.isDesktop$ = this.breakpointService.isDesktop$;
  }

  public logout(): void {
    this.authService
      .logout()
      .pipe(take(1))
      .subscribe(() => {
        this.toastService.success('', 'Succesfully logged out');
        this.router.navigate(['/login']);
      });
  }

  public onSidenavToggle(): void {
    this.$isSidenavOpened.update((value) => !value);
  }

  public onSidenavClose(): void {
    this.$isSidenavOpened.set(false);
  }
}
