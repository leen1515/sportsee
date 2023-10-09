
# Sportsee

Voici Sportsee. Il s'agit d'un site React analytic permettant de visualiser ses propres données sur une interface dynamique et intuitive. Sportsee permet de suivre l'évolution de son hygiene de vie. Les séances de sport, les calories dépensés, les proteines, lipides consommés, avec sportsee, vous êtes près de votre corps, vous êtes prêt pour le sport.

Les graphiques sont codés avec D3, le style css est géré avec Styled Components. La documentation a été réalisée avec JSdoc.

## Liens
La démonstration est en ligne sur gitpage:
https://leen1515.github.io/sportsee/

La documentation est accessible sur cet url :
https://leen1515.github.io/sportsee/documentation


## server
Le server se met en ligne sur le port 3001. Seul les données en version mock sont disponible sur gitpage. Un bouton permet de switcher entre les deux. Dans la démonstration, une erreur de type Network apparait quand le server ne donne aucune réponse.
Le mot clé Mocked à côté du nom de l'utilisateur nous indique que nous sommes sur la version mock.






## Installation

Pour installer les dépendances du projet,
1 - il faut cibler le repertoire parent du package.json

```bash
  npm i
```

Ensuite lancer React

```bash
  npm start
```

2 - pour tester avec le server, il faut cloner ce lien:
https://github.com/OpenClassrooms-Student-Center/P9-front-end-dashboard.git

Dans le repertoire App, le fichier index.js, il faut écrire le numero de port que j'utilise par défaut, 3001 : 

```javascript
const app = express()
app.use(cors())
const port = 3001
app.use(router)
app.listen(port, () => console.log(`Magic happens on port ${port}`))
```

L'installer avec npm i et le lancer
```bash
  npm start
```

En local l'application le reconnaitra. pour un server à distance, il faut changer la variable du fichier getDatasCall.jsx:

```javascript
    const API_URL = "http://localhost:3001";
```

A suivre...
