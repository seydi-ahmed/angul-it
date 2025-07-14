## --- PHASE 1: Création du projet Angular ---

```bash
# Installer Angular CLI si ce n'est pas déjà fait
npm install -g @angular/cli

# Créer un nouveau projet Angular
ng new angul-it --routing --style=scss

# Se déplacer dans le dossier du projet
cd angul-it

# Créer les composants nécessaires
ng generate component components/home
ng generate component components/captcha
ng generate component components/result

# Créer un service pour la gestion d'état
ng generate service services/progress
```

## --- PHASE 2: Structure des fichiers ---

Voici l’arborescence principale avec les fichiers pertinents (modifiés ou créés).

```
src/
├── app/
│   ├── components/
│   │   ├── home/
│   │   │   ├── home.component.ts
│   │   │   ├── home.component.html
│   │   ├── captcha/
│   │   │   ├── captcha.component.ts
│   │   │   ├── captcha.component.html
│   │   ├── result/
│   │   │   ├── result.component.ts
│   │   │   ├── result.component.html
│   ├── services/
│   │   └── progress.service.ts
│   ├── app-routing.module.ts
│   ├── app.component.ts
│   └── app.module.ts
```

## --- FICHIERS COMPLETS ---

### app.module.ts
```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CaptchaComponent } from './components/captcha/captcha.component';
import { ResultComponent } from './components/result/result.component';
import { ProgressService } from './services/progress.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CaptchaComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ProgressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### app-routing.module.ts
```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CaptchaComponent } from './components/captcha/captcha.component';
import { ResultComponent } from './components/result/result.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'captcha', component: CaptchaComponent },
  { path: 'result', component: ResultComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### progress.service.ts
```ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private progressKey = 'captchaProgress';

  getProgress(): any {
    const saved = localStorage.getItem(this.progressKey);
    return saved ? JSON.parse(saved) : { step: 0, answers: [] };
  }

  setProgress(progress: any): void {
    localStorage.setItem(this.progressKey, JSON.stringify(progress));
  }

  resetProgress(): void {
    localStorage.removeItem(this.progressKey);
  }
}
```

### home.component.ts
```ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressService } from '../../services/progress.service';

@Component({ selector: 'app-home', templateUrl: './home.component.html' })
export class HomeComponent {
  constructor(private router: Router, private progress: ProgressService) {}

  startChallenge(): void {
    this.progress.resetProgress();
    this.router.navigate(['/captcha']);
  }
}
```

### home.component.html
```html
<h2>Bienvenue sur Angul-it</h2>
<button (click)="startChallenge()">Commencer le captcha</button>
```

### captcha.component.ts
```ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressService } from '../../services/progress.service';

@Component({ selector: 'app-captcha', templateUrl: './captcha.component.html' })
export class CaptchaComponent implements OnInit {
  step = 0;
  selected: Set<number> = new Set();
  challenges = [
    { question: 'Sélectionnez toutes les images avec des chats', images: ['chat1.jpg', 'chien1.jpg', 'chat2.jpg'], answers: [0, 2] },
    { question: 'Sélectionnez toutes les images avec des feux', images: ['feu1.jpg', 'eau.jpg', 'feu2.jpg'], answers: [0, 2] }
  ];

  constructor(private router: Router, private progress: ProgressService) {}

  ngOnInit() {
    const saved = this.progress.getProgress();
    this.step = saved.step;
  }

  toggleSelect(index: number): void {
    this.selected.has(index) ? this.selected.delete(index) : this.selected.add(index);
  }

  validate(): void {
    const challenge = this.challenges[this.step];
    const isValid = challenge.answers.every(i => this.selected.has(i)) &&
                    this.selected.size === challenge.answers.length;

    if (isValid) {
      const state = this.progress.getProgress();
      state.answers.push([...this.selected]);
      state.step++;
      this.progress.setProgress(state);

      if (state.step >= this.challenges.length) {
        this.router.navigate(['/result']);
      } else {
        this.selected.clear();
        this.step++;
      }
    } else {
      alert('Réponse incorrecte, veuillez réessayer.');
    }
  }
}
```

### captcha.component.html
```html
<h3>{{ challenges[step].question }}</h3>
<div class="grid">
  <div *ngFor="let img of challenges[step].images; let i = index" (click)="toggleSelect(i)"
       [class.selected]="selected.has(i)">
    <img [src]="'assets/' + img" alt="captcha image" />
  </div>
</div>
<button (click)="validate()">Valider</button>
```

### result.component.ts
```ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressService } from '../../services/progress.service';

@Component({ selector: 'app-result', templateUrl: './result.component.html' })
export class ResultComponent implements OnInit {
  finished = false;

  constructor(private router: Router, private progress: ProgressService) {}

  ngOnInit(): void {
    const state = this.progress.getProgress();
    if (state.step < 2) {
      this.router.navigate(['/captcha']);
    } else {
      this.finished = true;
    }
  }

  restart(): void {
    this.progress.resetProgress();
    this.router.navigate(['/']);
  }
}
```

### result.component.html
```html
<div *ngIf="finished">
  <h2>Félicitations, vous avez terminé le challenge !</h2>
  <button (click)="restart()">Recommencer</button>
</div>
```

### styles.scss
```scss
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.grid div {
  border: 2px solid gray;
  cursor: pointer;
}

.grid div.selected {
  border-color: green;
}
```

### assets (images)
Placez des images dans `src/assets` avec les noms utilisés (`chat1.jpg`, `chien1.jpg`, etc.).

---

Souhaitez-vous :
- Ajouter des tests unitaires (Jasmine/Karma) ?
- Ajouter des animations ou améliorer l’UX/UI ?
- Internationaliser en français/anglais ?
