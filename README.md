# Paris Caretaker Service (PCS)

Projet annuel 2A2

# Docs
[Nx doc](ace/README.md)

# Requirements
- Node v21.6.2+
- Nx (`npm i -g nx`)

# How to run
## Run database and phpmyadmin
`sudo docker compose up`
## Run frontend and backend
1. `cd ace`
2. `npm i`
3. `nx run-many -t serve` (API : localhost:3000, FRONT: localhost:4200)
4. Enjoy