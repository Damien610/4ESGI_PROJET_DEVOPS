# 4ESGI_PROJET_DEVOPS

Projet DevOps réalisé dans le cadre de la 4e année ESGI.
Ce projet comprend une application Node.js avec une base de données MariaDB, testée et déployée automatiquement via GitHub Actions sur un VPS.

## Sommaire

- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Installation locale](#installation-locale)
- [Base de données](#base-de-données)
- [Tests](#tests)
- [CI/CD](#cicd)
- [Déploiement](#déploiement)
- [Auteurs](#auteurs)

## Fonctionnalités

- API Node.js pour la gestion de tickets
- Base de données MariaDB
- Seed automatique de données
- Lint + tests unitaires et E2E
- Déploiement via Docker sur VPS
- Intégration et livraison continues via GitHub Actions

## Technologies utilisées

- Node.js 20
- MariaDB 10.11
- Docker / Docker Compose
- GitHub Actions
- ESLint / Jest
- SSH pour le déploiement
- VPS Ubuntu (root)

## Installation locale

### Prérequis

- Node.js >= 20
- Docker & Docker Compose
- MariaDB local ou Docker

### Cloner le projet

```bash
git clone https://github.com/Damien610/4ESGI_PROJET_DEVOPS.git
cd 4ESGI_PROJET_DEVOPS
npm install
```

### Lancer en local

```bash
docker compose up -d
npm run dev
```

Accès à l'API : `http://localhost:3000`

## Base de données

Un script `seed.js` est disponible pour initialiser les données :

```bash
node seed.js
```

Variables d’environnement utilisées :

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=ticketdb
```

## Tests

### Linter

```bash
npx eslint .
```

### Tests unitaires

```bash
npm test -- --testPathPattern=validation
```

### Tests E2E

```bash
npm test -- --testPathPattern=e2e
```

## CI/CD

Le projet utilise GitHub Actions :

- Lint + tests à chaque push sur `main`
- Build de l'image Docker
- Push vers Docker Hub
- Déploiement automatique sur VPS via SSH

Fichier CI/CD : `.github/workflows/ci-cd.yml`

Secrets GitHub requis :


| Nom                   | Description                          |
| --------------------- | ------------------------------------ |
| `DOCKER_USERNAME`     | Identifiant Docker Hub               |
| `DOCKER_PASSWORD`     | Mot de passe ou token Docker Hub     |
| `VM_HOST`             | IP du VPS                            |
| `VM_USER`             | Utilisateur SSH (`root`)             |
| `VM_SSH_KEY`          | Clé privée SSH pour GitHub Actions |
| `DOCKER_COMPOSE_PATH` | Chemin du projet sur le VPS          |

## Déploiement

Sur le VPS :

1. Docker est installé via `get.docker.com`
2. Le projet est cloné dans `/root/app`
3. `docker-compose.yml` définit les services `app` et `mariadb`
4. Déploiement automatique après chaque push sur `main`
5. lien VPS : `http://180.149.198.141/`
---
