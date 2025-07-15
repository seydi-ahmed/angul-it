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