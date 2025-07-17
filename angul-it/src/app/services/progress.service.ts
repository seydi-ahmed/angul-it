import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class ProgressService {
  private storageKey = 'angulItProgress';

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  saveAnswer(step: number, answer: any) {
    if (!this.isBrowser()) return;
    const data = this.getAllSteps();
    data[step] = Array.isArray(answer) ? answer : [answer];
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getAnswer(step: number): any {
    const data = this.getAllSteps();
    return data[step]?.length === 1 ? data[step][0] : data[step];
  }

  getAllSteps(): any[][] {
    if (!this.isBrowser()) return [];
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  getCurrentStep(): number {
    const data = this.getAllSteps();
    return data.length;
  }

  isCompleted(): boolean {
    const data = this.getAllSteps();
    return data.length === 3; // Change if you add more challenges
  }

  reset() {
    if (!this.isBrowser()) return;
    localStorage.removeItem(this.storageKey);
  }
}
