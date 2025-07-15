# 🛡️ Angul-IT

Un projet Angular interactif de type Captcha multi-étapes, permettant aux utilisateurs de résoudre :
- un challenge **visuel** (images),
- un challenge **mathématique**,
- un challenge **textuel**.

Le but est de tester les compétences de base des utilisateurs tout en mettant en avant un flow UX clair, dynamique et moderne.

---

## 📁 Arborescence

```bash
angul-it/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── captcha/   # Challenge visuel, math, text
│   │   │   ├── home/      # Page d'accueil
│   │   │   └── result/    # Page de résultats
│   │   └── services/      # Service de progression utilisateur
│   └── assets/images/     # Images utilisées dans le captcha
├── server.ts              # Fichier pour SSR (server-side rendering)
├── angular.json
├── package.json
├── tsconfig*.json
└── README.md
```

---

## ⚙️ Installation & Lancement
1. Cloner le dépôt
```
git clone https://github.com/seydi-ahmed/angul-it.git
cd angul-it
```
2. Installer les dépendances
```
npm install
```
3. Lancer le serveur Angular
```
npm start
```
- Accéder ensuite à http://localhost:4200 dans votre navigateur.

---

## 🧠 Fonctionnalités
- ✅ Navigation multi-étapes (image → math → texte)
- ✅ Validation dynamique du formulaire
- ✅ Sauvegarde et récupération de l'état via un service
- ✅ Design responsive et fluide
- ✅ Résumé des réponses à la fin

---

## 🎨 Technologies
- Angular 17+
- TypeScript
- SCSS
- Angular Standalone Components
- Routing Angular

---

## 👤 Auteur
**Mouhamed Diouf**  
📧 [diouf.mouhamed3@ugb.edu.sn](mailto:seydiahmedelcheikh@gmail.com)  
📞 +221 77 622 16 81  
🔗 [GitHub - seydi-ahmed](https://github.com/seydi-ahmed)
