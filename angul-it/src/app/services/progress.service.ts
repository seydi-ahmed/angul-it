import { Injectable } from '@angular/core';

@Injectable()
export class ProgressService {
  private storageKey = 'angulItProgress';

  constructor() {}

  saveStep(step: number, selectedImages: string[]) {
    const data = this.getAllSteps();
    data[step] = selectedImages;
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getSelectedImages(step: number): string[] | null {
    const data = this.getAllSteps();
    return data[step] || null;
  }

  getAllSteps(): string[][] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  getCurrentStep(): number {
    const data = this.getAllSteps();
    return data.length > 0 ? data.length - 1 : 0;
  }

  isCompleted(): boolean {
    const data = this.getAllSteps();
    // Suppose 2 challenges in total
    return data.length === 2;
  }

  reset() {
    localStorage.removeItem(this.storageKey);
  }
}
