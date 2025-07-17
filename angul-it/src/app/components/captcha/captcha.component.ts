import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressService } from '../../services/progress.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss'],
  providers: [ProgressService]
})
export class CaptchaComponent {
  currentStep = 0;

  challenges = [
    {
      type: 'image',
      question: 'Sélectionnez toutes les images avec un chat',
      images: ['chat1.jpg', 'chien1.jpg', 'chat2.jpg', 'oiseau1.jpg'],
      answer: ['chat1.jpg', 'chat2.jpg']
    },
    {
      type: 'math',
      question: 'Combien font 7 + 5 ?',
      answer: 12
    },
    {
      type: 'text',
      question: 'Écrivez le mot suivant : robot',
      answer: 'robot'
    }
  ];

  form!: FormGroup;

  constructor(
    private router: Router,
    private progressService: ProgressService,
    private fb: FormBuilder
  ) {
    this.currentStep = this.progressService.getCurrentStep();
    this.initForm();
  }

  initForm() {
    const challenge = this.challenges[this.currentStep];
    const saved = this.progressService.getAnswer(this.currentStep);

    switch (challenge.type) {
      case 'image':
        this.form = this.fb.group({
          selectedImages: [saved || [], Validators.required]
        });
        break;
      case 'math':
        this.form = this.fb.group({
          mathAnswer: [saved || '', Validators.required]
        });
        break;
      case 'text':
        this.form = this.fb.group({
          textAnswer: [saved || '', Validators.required]
        });
        break;
    }
  }

  toggleImageSelection(img: string) {
    const selected = this.form.value.selectedImages as string[];
    if (selected.includes(img)) {
      this.form.patchValue({ selectedImages: selected.filter(i => i !== img) });
    } else {
      this.form.patchValue({ selectedImages: [...selected, img] });
    }
  }

  isSelected(img: string): boolean {
    return (this.form.value.selectedImages as string[]).includes(img);
  }

  next() {
    if (this.form.invalid) {
      alert('Veuillez compléter le challenge avant de continuer');
      return;
    }

    const challenge = this.challenges[this.currentStep];
    let value;

    if (challenge.type === 'image') {
      const selected = this.form.value.selectedImages as string[];
      const expected = challenge.answer as string[];

      const isCorrect =
        selected.length === expected.length &&
        selected.every((img: string) => expected.includes(img));

      if (!isCorrect) {
        alert('Mauvaise sélection. Essayez encore.');
        return;
      }

      value = selected;

    } else if (challenge.type === 'math') {
      const expected = challenge.answer;
      const user = parseInt(this.form.value.mathAnswer, 10);
      if (user !== expected) {
        alert('Mauvaise réponse. Essayez encore.');
        return;
      }
      value = user;

    } else if (challenge.type === 'text') {
      const expected = typeof challenge.answer === 'string'
        ? challenge.answer.trim().toLowerCase()
        : String(challenge.answer).toLowerCase();

      const user = this.form.value.textAnswer.trim().toLowerCase();
      if (user !== expected) {
        alert('Texte incorrect. Essayez encore.');
        return;
      }
      value = user;
    }

    this.progressService.saveAnswer(this.currentStep, value);

    if (this.currentStep + 1 < this.challenges.length) {
      this.currentStep++;
      this.initForm();
    } else {
      this.router.navigate(['/result']);
    }
  }


  previous() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.initForm();
    }
  }

  getProgressPercentage(): number {
    return ((this.currentStep + 1) / this.challenges.length) * 100;
  }

}
