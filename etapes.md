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

## --- Explications des fichiers ---
1) src/main.ts:
- le tout premier fichier exécuté par Angular lors du démarrage de l'application: le point d'entrée de l'application
- il importe le composant racine et la config
- il lance l'appli avec bootstrapApplication()
- il gère les erreurs si ça plante au démarrage

2) main.server.ts:
- le point d'entrée server de l'application
- il sert à démarrer Angular en mode **rendu coté server**
- il utilise une configuration différente de celle du client (app.config.server.ts)
- il exporte une fonction que le serveur Angular appelle quand il rend une page pour un utilisateur