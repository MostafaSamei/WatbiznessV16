import { Component } from '@angular/core';
import { NavbarComponent } from '../../ui/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authed-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './authed-layout.component.html',
  styleUrls: ['./authed-layout.component.scss'],
})
export class AuthedLayoutComponent {}
