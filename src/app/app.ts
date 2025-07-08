import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './layout/sidebar/sidebar';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { ToastComponent } from './shared/toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Header, Footer, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'team-sphere';
}
