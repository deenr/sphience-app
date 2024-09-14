import { NgModule } from '@angular/core';
import { AuthenticationRoutingModule } from './authentication.routing';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  imports: [AuthenticationRoutingModule, LoginComponent, RegisterComponent]
})
export class AuthenticationModule {}
