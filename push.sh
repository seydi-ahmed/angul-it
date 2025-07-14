git add .
git commit -m "
1) Are these challenges varied and require different types of user interaction (e.g., selecting images, solving math problems, entering text)?
--> pour l'instant on ne gére que les images

2) Does the application maintain the state even if the page is refreshed?
--> lorsque je rafraichis la page, les sélections s'en vont

3) Results Page
Does the application redirect the user to a results page upon completion of all challenges?
Does the results page provide feedback to the user, congratulating them on proving they are not a bot?
"
git push gitea
git push github