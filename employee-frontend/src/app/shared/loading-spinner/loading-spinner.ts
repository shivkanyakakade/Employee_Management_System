import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Loader } from '../../services/loader';

@Component({
  selector: 'app-loading-spinner',
  imports: [CommonModule,MatProgressSpinnerModule],
  templateUrl: './loading-spinner.html',
  styleUrl: './loading-spinner.css',
})
export class LoadingSpinner {

constructor(public loaderservice:Loader){}
}
