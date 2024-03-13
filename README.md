## Prepare

- Install Docker
- Install pgAdmin 4
- Install nestjs cli

## Instructions for running source

### Step 1:
- Clone source code from github: https://github.com/truongtankhanh/building-system

### Step 2: 
- Create `.env` file from `env.example` file

- Run command

```bash
$ npm install
```

### Step 3:
- Launch docker
- Run command

```bash
$ cd docker
$ docker compose up -d
```

### Step 4:
- Launch pgAdmin 4
- Create connection with parameters from env
- Create the database and schema in pgAdmin with the name `building_db`
- Import and run script `database/scripts/schema.sql` in pgAdmin to create tables
- Import and run script `database/scripts/seed.sql` in pgAdmin to create data for table `building`

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
