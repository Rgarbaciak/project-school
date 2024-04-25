
# Project School

## Description
Project School est une application qui utilise une architecture microservices avec Docker pour le backend et React pour le frontend. Elle permet de gérer une école avec des utilisateurs (élèves, professeurs, administrateurs), et offre différentes fonctionnalités selon le rôle de l'utilisateur.

## Prérequis
- **Docker**: Vous devez avoir Docker installé sur votre machine pour pouvoir exécuter les services backend dans des conteneurs.
- **Node.js et npm**: Nécessaires pour exécuter le frontend.

## Installation

### Cloner le dépôt
Pour commencer, clonez le dépôt sur votre machine locale en utilisant la commande suivante:

```
git clone https://yourrepositoryurl.git
cd project-school
```

### Démarrer les services Backend avec Docker

Assurez-vous que Docker est en cours d'exécution sur votre système. Puis, dans le répertoire racine du projet, exécutez :

```
docker-compose up
```

Cette commande construira les images Docker nécessaires et démarrera les conteneurs pour les différents services du backend. Assurez-vous que tous les fichiers \`Dockerfile\` et \`docker-compose.yml\` sont correctement configurés avant d'exécuter cette commande.

### Démarrer le Frontend

Ouvrez un nouveau terminal et naviguez vers le sous-dossier du frontend :

```bash
cd school-frontend
```

Installez toutes les dépendances nécessaires avec npm :

```bash
npm install
```

Une fois l'installation terminée, lancez l'application frontend :

```bash
npm start
```

Cela démarrera le serveur de développement et ouvrira automatiquement votre navigateur à l'adresse \`http://localhost:3000\`.

## Utilisation

### Comptes de Démonstration
- **Professeur**:
  - Email: test1@example.com
  - Mot de passe: "Test"


Après avoir démarré les services backend et frontend, vous pouvez naviguer dans l'interface utilisateur pour créer, modifier et afficher des utilisateurs. Utilisez les fonctionnalités selon le rôle auquel vous vous connectez.

## Support

Pour obtenir de l'aide ou signaler des problèmes, ouvrez un ticket dans la section "Issues" du dépôt GitHub ou contactez le mainteneur.

## Contribution

Les contributions à ce projet sont bienvenues. Si vous souhaitez contribuer, veuillez forker le dépôt, créer une branche pour vos modifications et soumettre une pull request.
EOF

