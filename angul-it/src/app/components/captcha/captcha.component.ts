import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressService } from '../../services/progress.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [CommonModule],
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
      images: ['chat1.jpg', 'chien1.jpg', 'chat2.jpg', 'oiseau1.jpg']
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

  form: FormGroup;

  constructor(
    private router: Router,
    private progressService: ProgressService,
    private fb: FormBuilder
  ) {
    this.currentStep = this.progressService.getCurrentStep();
    const challenge = this.challenges[this.currentStep];
    this.form = this.createForm(challenge);
  }

  createForm(challenge: any): FormGroup {
    const savedValue = this.progressService.getAnswer(this.currentStep);
    switch (challenge.type) {
      case 'image':
        return this.fb.group({
          selectedImages: [savedValue || [], Validators.required]
        });
      case 'math':
        return this.fb.group({
          mathAnswer: [savedValue || '', [Validators.required]]
        });
      case 'text':
        return this.fb.group({
          textAnswer: [savedValue || '', [Validators.required]]
        });
      default:
        return this.fb.group({});
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
    const value =
      challenge.type === 'image'
        ? this.form.value.selectedImages
        : challenge.type === 'math'
          ? this.form.value.mathAnswer
          : this.form.value.textAnswer;

    this.progressService.saveAnswer(this.currentStep, value);

    if (this.currentStep + 1 < this.challenges.length) {
      this.currentStep++;
      this.form = this.createForm(this.challenges[this.currentStep]);
    } else {
      this.router.navigate(['/result']);
    }
  }

  previous() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.form = this.createForm(this.challenges[this.currentStep]);
    }
  }
}
