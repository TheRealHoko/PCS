# Paris Caretaker Service (PCS)

Projet annuel 2A2

## Docs
[Nx doc](ace/README.md)

## Requirements
- Node v21.6.2+
- Nx (`npm i -g nx`)

## How to run
### Run database and phpmyadmin
`sudo docker compose up [-d]`

# Setup .env
1. Add [.env.local](#env-structure)  file inside 'ace' directory
### Run frontend and backend
1. `cd ace`
2. `npm i` (whenever new package added)
3. `nx run-many -t serve` (API : localhost:3000, FRONT: localhost:4200)
4. Enjoy

### Cleanup database and rerun init script
1. `sudo docker compose down`
2. `sudo docker volume rm pcs_db`
3. `sudo docker compose up`

### .env structure
```bash
DB_HOST=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_PORT=
SECRET=
MAIL_USERNAME=
MAIL_PASS=
MAIL_NOREPLY=
API_URL=
FRONT_URL=
```