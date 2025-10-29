import { Component } from '@angular/core';
import { Navbar } from "../../../Shared/Components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-blank-layout',
  imports: [Navbar, RouterOutlet],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.css'
})
export class BlankLayoutComponent {

}
