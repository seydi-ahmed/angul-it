import { Injectable } from '@angular/core';

@Injectable()
export class ProgressService {
  private storageKey = 'angulItProgress';

  constructor() {}

  saveAnswer(step: number, answer: any) {
    const data = this.getAllSteps();
    data[step] = answer;
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getAnswer(step: number): any {
    const data = this.getAllSteps();
    return data[step] || null;
  }

  getAllSteps(): any[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  getCurrentStep(): number {
    const data = this.getAllSteps();
    return data.length;
  }

  isCompleted(): boolean {
    const data = this.getAllSteps();
    return data.length === 3;
  }

  reset() {
    localStorage.removeItem(this.storageKey);
  }
}
