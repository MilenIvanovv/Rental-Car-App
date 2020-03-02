# Rental-Car-App

All the cars you need!


## Setup

1. Be sure to have docker insalled! 

If you don't have it, follow the steps <a src="https://docs.docker.com/install/linux/docker-ce/ubuntu/">here</a>   
Recomended **Install using the repository** guide path

2. Pull the postgres image with the command bellow
  > $ docker pull postgres



2. Create file with exact name **.env** in **/server** diretory and copy the text below.  
  (for connecting the server to the database)

    DB_TYPE = postgres      
    DB_HOST = localhost        
    DB_PORT = {{PORT}}         
    DB_USERNAME = postgres        
    DB_PASSWORD = {{password}}        
    DB_DATABASE_NAME = postgres   

3. Create file with exact name **ormconfig.json** in **/server** diretory and copy the text below.
  (for connecting to the database only for running migrations and seed)
```json
{
  "type": "postgres",
  "host": "localhost",
  "port": "{{PORT}}", // as number, not string
  "username": "postgres",
  "password": "{{password}}",
  "database": "postgres",
  "synchronize": false,
  "logging": false,
  "entities": [
    "src/database/entities/**/*.ts"
  ],
  "migrations": [
    "src/database/migrations/**/*.ts"
  ],
  "cli": {
    "entitiesDir": "src/database/entities",
    "migrationsDir": "src/database/migrations"
  }
}
```

4. Install dependencies in **/server** and **/cleint** diretory.

>  $ npm install

5. Run migrations.

>  $ npm run typeorm -- migration:run

6. Run seed script.

>  $ npm run seed

## Running the app

### You can skip the steps bellow  the **setup-project.sh** script;
Go to project directory and type 

> bash setup-project.sh --password {{password}}

### Or follow steps bellow

1. Create and run the postgres conatiner with 
  > $ docker run --rm  --name {{name of the docker contanier}} -e POSTGRES_PASSWORD={{password}} -d -p {{PORT}}:{{PORT}} -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data  postgres

2. Run the command in **/server** diretory.

>  $ npm run start:dev

3. Run the command in **/client** diretory.

>  $ npm start

4. Go to http://localhost:3000/

### Enjoy!

  
