import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressService } from '../../services/progress.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [CommonModule],  // <-- ajouter cette ligne
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss'],
  providers: [ProgressService]
})
export class CaptchaComponent {
  currentStep = 0;
  challenges = [
    { question: 'Sélectionnez toutes les images avec un chat', images: ['chat1.jpg', 'chien1.jpg', 'chat2.jpg', 'oiseau1.jpg'] },
    { question: 'Sélectionnez toutes les images avec un chien', images: ['chien1.jpg', 'chien2.jpg', 'chat1.jpg', 'oiseau2.jpg'] }
  ];

  form: FormGroup;

  constructor(
    private router: Router,
    private progressService: ProgressService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      selectedImages: [[], Validators.required]
    });

    // Charger étape actuelle depuis le service
    this.currentStep = this.progressService.getCurrentStep();
    this.form.setValue({
      selectedImages: this.progressService.getSelectedImages(this.currentStep) || []
    });
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
      alert('Veuillez sélectionner au moins une image');
      return;
    }

    this.progressService.saveStep(this.currentStep, this.form.value.selectedImages);

    if (this.currentStep + 1 < this.challenges.length) {
      this.currentStep++;
      this.form.setValue({
        selectedImages: this.progressService.getSelectedImages(this.currentStep) || []
      });
    } else {
      this.router.navigate(['/result']);
    }
  }

  previous() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.form.setValue({
        selectedImages: this.progressService.getSelectedImages(this.currentStep) || []
      });
    }
  }
}
