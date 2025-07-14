import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressService } from '../../services/progress.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],  // <-- ajouter cette ligne
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  providers: [ProgressService]
})
export class ResultComponent implements OnInit {
  results: any[] = [];

  constructor(private router: Router, private progressService: ProgressService) {}

  ngOnInit() {
    if (!this.progressService.isCompleted()) {
      this.router.navigate(['/captcha']);
      return;
    }
    this.results = this.progressService.getAllSteps();
  }

  restart() {
    this.progressService.reset();
    this.router.navigate(['/']);
  }
}
