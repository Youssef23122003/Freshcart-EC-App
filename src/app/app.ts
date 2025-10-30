import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./Shared/Components/footer/footer.component";
import { NgxSpinnerComponent } from "ngx-spinner";
import 'aos/dist/aos.css';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('E-Commerce-Ap');





  ngAfterViewInit() {
    setTimeout(() => AOS.refresh(), 500);
  }
}
