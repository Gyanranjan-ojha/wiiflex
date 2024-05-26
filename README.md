# WIIFLEX

## Overview

WIIFLEX is a platform designed for companies seeking to harness top-tier talent. With powerful collaboration tools and streamlined processes, we connect organizations with skilled professionals to drive innovation and growth.


## Prerequisites

Before installing the WIIFLEX, ensure you have the following installed:

- [Python](https://www.python.org/) (version 3.10 or higher)
- [Node.js](https://nodejs.org/en/) (version 16.x or higher)
- [MySQL Server](https://www.mysql.com/) (version 8.0 or higher)
- [git](https://git-scm.com/) (v2.13 or greater)


## Installation

**1. Clone the project**

```bash
  git clone https://<username>@bitbucket.org/gyan-ranjan-ojha/wiiflex.git
```

**2. Navigate to the project directory**

```bash
  cd wiiflex
```

**3. Pull from 'main' branch**

```bash
  git pull origin main
```

## BackEnd Setup

- Navigate to the backend directory:

```bash
  cd src/backend
```

- Create a virtual environment

```bash
  python -m venv venv
```

- Activate the virtual environment

- For Ubuntu

```bash
  source venv/bin/activate
```

- For Windows

```bash
  venv/Scripts/activate
```

- Install python dependencies

```bash
  pip install -r requirements.txt
```

- .env Configuration

Create a `.env` file in the backend directory and provide the necessary environment variables:

```bash
  export CURRENT_ENVIRONMENT='<env (development/test/production)>'
  export DEBUG=1
  export DJANGO_ALLOWED_HOSTS='<DJANGO_ALLOWED_HOSTS>'
  export DJANGO_SUPERUSER_EMAIL='<admin@gmail.com>'
  export DJANGO_SUPERUSER_PASSWORD='<password_for_admin>'
  export SECRET_KEY='<provide any string>'
  export MYSQL_HOST='<MYSQL_HOST>'
  export MYSQL_USER='<MYSQL_USER>'
  export MYSQL_PASSWORD='<MYSQL_PASSWORD>'
  export MYSQL_DB='<MYSQL_DB>'
  export MYSQL_PORT=<MYSQL_PORT>
  export FE_DOMAIN='<FE_DOMAIN>'
```

- Given database name in `.env` file will be going to create a database automatically if not exists.

```bash
  python db/create_db.py
```

- Create a "logs" folder inside the "backend" folder

```bash
  mkdir logs
```

- Migrate the Database for creating tables by django commands

```bash
  python manage.py makemigrations app
  python manage.py migrate app
  python manage.py makemigrations
  python manage.py migrate
```

- Create super user to access django admin panel

```bash
  python manage.py create_super_user
```

- Starting the Backend Server

```bash
  python manage.py runserver
```

## FrontEnd Setup

- Navigate to the frontend directory:

```bash
  cd src/frontend
```

- Do NPM install for dependencies

```bash
  npm install --force
```

- .env Configuration

Create a `.env` file in the frontend directory and provide the necessary environment variables:

```bash
  BASE_URL='<BASE_URL>'
```

- Starting the Frontend Server

```bash
  npm run start
```

## Tech Stack

**Server:** Django REST Framework

**Client:** React.js + Vite

**Database:** MySQL Database

<!-- # README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact -->