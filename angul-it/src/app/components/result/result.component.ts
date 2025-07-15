import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressService } from '../../services/progress.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  providers: [ProgressService]
})
export class ResultComponent implements OnInit {
  results: any[] = [];
  challenges = [
    { type: 'image', label: 'Images sélectionnées' },
    { type: 'math', label: 'Réponse mathématique' },
    { type: 'text', label: 'Réponse textuelle' }
  ];

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

  isArray(val: any): boolean {
    return Array.isArray(val);
  }
}
