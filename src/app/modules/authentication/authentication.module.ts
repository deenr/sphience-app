import { NgModule } from '@angular/core';
import { AuthenticationRoutingModule } from './authentication.routing';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  imports: [AuthenticationRoutingModule, LoginComponent]
})
export class AuthenticationModule {}
