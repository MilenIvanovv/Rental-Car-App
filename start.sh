#!/bin/bash

# Default values of arguments
DB_PASSWORD="159"
DB_USERNAME=milen.ivanov
DB_NAME=milen.ivanov
DB_PORT=5432
CONTAINER_NAME=postgres500
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Loop through arguments and process them
for arg in "$@"
do
    case $arg in
        -p|--password)
        DB_PASSWORD="$2"
        shift # Remove name from processing
        shift # Remove value from processing
        ;;
        -u|--username)
        DB_USERNAME="$2"
        shift # Remove name from processing
        shift # Remove value from processing
        ;;
        -n|--db-name)
        DB_NAME="$2"
        shift # Remove name from processing
        shift # Remove value from processing
        ;;
        -c|--container)
        CONTAINER_NAME="$2"
        shift # Remove name from processing
        shift # Remove value from processing
        ;;
        --port)
        DB_PORT="$2"
        shift # Remove name from processing
        shift # Remove value from processing
        ;;
    esac
done

if [[ "$(docker images -q postgres:latest 2> /dev/null)" == "" ]]; then
  echo "Postgress imgage is not found!"
  x=1
  while [ $x == 1 ]
  do
    read -p 'Do you want to pull image progres:latest [y/n]: ' answer
    if [ "$answer" == "y" ]; then
      x=0
      docker pull postgres:latest
    elif [ "$answer" == "n" ]; then
      exit
    fi
  done
else
  echo "Postgress imgage found"
fi

if [[ "$(docker ps -a | grep $CONTAINER_NAME)" ]]; then
  echo "Container $CONTAINER_NAME found"
  x=1
  while [ $x == 1 ]
  do
    read -p 'Do you want start it ?[y/n]: ' answer
    if [ "$answer" == "y" ]; then
      x=0
      docker container start $CONTAINER_NAME
    elif [ "$answer" == "n" ]; then
      exit
    fi
  done
else
  echo "Docker container will run with
  container name: $CONTAINER_NAME
  database username: $DB_USERNAME
  database password: $DB_PASSWORD
  database name: $DB_NAME
  ports $DB_PORT:5432"

  x=1
  while [ $x == 1 ]
  do
    read -p 'Do you want to continue [y/n]: ' answer
    if [ "$answer" == "y" ]; then
      x=0
      docker pull postgres:latest
    elif [ "$answer" == "n" ]; then
      exit
    fi
  done

  NL=$'\n\r'
  CONTENT="DB_TYPE=postgres$NL
  DB_HOST=localhost$NL
  DB_PORT=$DB_PORT$NL
  DB_USERNAME=$DB_USERNAME$NL
  DB_PASSWORD=$DB_PASSWORD$NL
  DB_DATABASE_NAME=$DB_NAME"
  echo $CONTENT > "$DIR/server/.env"
  echo "Created .env file in /server"

  template="{$NL
    \"type\": \"postgres\",$NL
    \"host\": \"localhost\",$NL
    \"port\": $DB_PORT,$NL
    \"username\": \"$DB_USERNAME\",$NL
    \"password\": \"$DB_PASSWORD\",$NL
    \"database\": \"$DB_NAME\",$NL
    \"synchronize\": false,$NL
    \"logging\": false,$NL
    \"entities\": [$NL
      \"src/database/entities/**/*.ts\"$NL
    ],$NL
    \"migrations\": [$NL
      \"src/database/migrations/**/*.ts\"$NL
    ],$NL
    \"cli\": {$NL
      \"entitiesDir\": \"src/database/entities\",$NL
      \"migrationsDir\": \"src/database/migrations\"$NL
    }$NL
  }"

  echo $template > "$DIR/server/ormconfig.json"
  echo "Created ormconfig.json file in /server"

  echo "Runing docker container"
  docker run --name "$CONTAINER_NAME" -e POSTGRES_PASSWORD=$DB_PASSWORD -e POSTGRES_USER=$DB_USERNAME -e POSTGRES_DB=$DB_NAME -d -p "$DB_PORT":"5432" postgres
fi

  gnome-terminal --working-directory="$DIR/client" -e 'sh -c "npm install; npm start; exec bash"'
  gnome-terminal --working-directory="$DIR/server" -e 'sh -c "npm install; npm run typeorm -- migration:run; npm run start:dev; exec bash"'
