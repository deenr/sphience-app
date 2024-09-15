import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { SidenavModule } from '@core/sidenav/sidenav.module';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-authenticated-layout',
  templateUrl: './authenticated-layout.component.html',
  styleUrls: ['./authenticated-layout.component.scss'],
  imports: [RouterOutlet, SidenavModule]
})
export class AuthenticatedLayoutComponent {
  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastService: ToastrService
  ) {}

  public logout(): void {
    this.authService
      .logout()
      .pipe(take(1))
      .subscribe(() => {
        this.toastService.success('', 'Succesfully logged out');
        this.router.navigate(['/login']);
      });
  }
}
