#!/bin/bash

# Default values of arguments
DB_PASSWORD=""
DB_USERNAME=""
DB_NAME=""
DB_PORT=5432
CONTAINER_NAME=postgres
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

if [ "$DB_PASSWORD" == "" ]; then
  echo "Add --password or -p arguemnt with the passward you want for the db"
  exit
elif [ "$DB_USERNAME" == "" ]; then
  echo "Add --username or -u arguemnt with the username you want for the db"
  exit
elif [ "$DB_NAME" == "" ]; then
  echo "Add --db-name or -n with the database name you want for the db"
  exit
else  
  docker run --name "$CONTAINER_NAME" -e POSTGRES_PASSWORD="$DB_PASSWORD" -e POSTGRES_USER-"$DB_USERNAME" -e POSTGRES_DB="$DB_NAME" -d -p "$DB_PORT":"$DB_PORT" -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data  postgres
  gnome-terminal --working-directory="$DIR/client" -- npm start
  gnome-terminal --working-directory="$DIR/server" -- npm run start:dev
fi