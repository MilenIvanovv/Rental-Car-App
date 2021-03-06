# Rental-Car-App

All the cars you need!


## Setup

1. Be sure to have docker insalled! 

If you don't have it, follow the steps <a src="https://docs.docker.com/install/linux/docker-ce/ubuntu/">here</a>   
Recomended **Install using the repository** guide path

### You can skip the steps bellow  the **start.sh** script;
Go to project directory and type 

> bash start.sh --password {{password}} ...

  -p or --password - database password    
  -u or --username - database username     
  -n or --db-name - database name     
  (Optional) -c or --container - docker container name || default is postgres     
  (Optional) --port - docker port || default is 5432 

### Or follow steps bellow

2. Pull the postgres image with the command bellow
  > $ docker pull postgres


3. Create file with exact name **.env** in **/server** diretory and copy the text below.  
  (for connecting the server to the database)

    DB_TYPE = postgres      
    DB_HOST = localhost        
    DB_PORT = {{PORT}}         
    DB_USERNAME = postgres        
    DB_PASSWORD = {{password}}        
    DB_DATABASE_NAME = postgres   

4. Create file with exact name **ormconfig.json** in **/server** diretory and copy the text below.
  (for connecting to the database only for running migrations)
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

5. Install dependencies in **/server** and **/cleint** diretory.

>  $ npm install

6. Run migrations.

>  $ npm run typeorm -- migration:run

## Running the app

1. Create and run the postgres conatiner with 
  > $ docker run --rm  --name {{name of the docker contanier}} -e POSTGRES_PASSWORD={{password}} -d -p {{PORT}}:{{PORT}} -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data  postgres

2. Run the command in **/server** diretory.

>  $ npm run start:dev

3. Run the command in **/client** diretory.

>  $ npm start

### Enjoy!

  
