import { Component } from '@angular/core';
import { Navbar } from "../../../Shared/Components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-auth-layout',
  imports: [Navbar,RouterOutlet],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
