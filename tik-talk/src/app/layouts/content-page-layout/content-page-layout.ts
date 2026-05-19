import { Component } from '@angular/core';
import { Sidebar } from "../../features/sidebar/sidebar";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-content-page-layout',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './content-page-layout.html',
  styleUrl: './content-page-layout.scss',
})
export class ContentPageLayout { }
