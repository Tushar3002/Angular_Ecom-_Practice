import { Component, inject } from '@angular/core';
import { LoadService } from '../../core/services/LoadService/load-service';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class Loader {
  loader = inject(LoadService);
}
