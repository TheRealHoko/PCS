## Project docker

### Overview
This repository contains a `docker-compose.yml` configuration file to set up a multi-container environment for a web application. The setup includes services for a MySQL database, phpMyAdmin, a backend API, and a frontend application.

### Services

#### db (MySQL)
- **Image**: mysql
- **Ports**: 3306 (host) -> 3306 (container)
- **Environment Variables**:
  - `MYSQL_ROOT_PASSWORD`: `toor`
  - `TZ`: `Europe/Paris`
- **Volumes**:
  - `db:/var/lib/mysql`
  - `./scripts/init.sql:/docker-entrypoint-initdb.d/init.sql`
- **Network**: `ace-bridged`
- **Description**: Provides the MySQL database with a root password `toor`, configured to use Paris time zone. Initializes with an `init.sql` script.

#### phpmyadmin
- **Image**: phpmyadmin
- **Ports**: 8080 (host) -> 80 (container)
- **Network**: `ace-bridged`
- **Dependencies**: `db`
- **Description**: Web-based MySQL administration tool accessible via port 8080. Depends on the MySQL database service.

#### backend
- **Image**: therealhoko/pcs-backend:1.0.0
- **Ports**: 3000 (host) -> 3000 (container)
- **Environment File**: `./ace/.env.local`
- **Network**: `ace-bridged`
- **Dependencies**: `db`
- **Description**: Backend API service provided by `therealhoko/pcs-backend` Docker image version 1.0.0. It reads environment variables from `.env.local` file.

#### frontend
- **Image**: therealhoko/pcs-frontend:1.0.0
- **Ports**: 80 (host) -> 80 (container)
- **Network**: `ace-bridged`
- **Dependencies**: `backend`
- **Description**: Frontend web application served by `therealhoko/pcs-frontend` Docker image version 1.0.0. It depends on the backend service.

### Volumes
- **db**: Volume for MySQL database data persistence.

### Networks
- **ace-bridged**: Custom bridge network driver for connecting all services.

### Usage
1. Clone the repository.
2. Navigate to the directory containing `docker-compose.yml`.
3. Run `docker-compose up -d` to start all services in detached mode.
4. Access the frontend application via `http://localhost`.
5. Access phpMyAdmin via `http://localhost:8080` for database administration.

### Notes
- Make sure Docker and Docker Compose are installed on your system.
- Adjust configuration files (`docker-compose.yml`, `.env.local`, etc.) according to your environment and security requirements.
- Services are configured for development purposes; adjust for production use as needed.

#### Links
[Docker repo](https://hub.docker.com/r/therealhoko)
[GIT repo](https://github.com/TheRealHoko/PCS)