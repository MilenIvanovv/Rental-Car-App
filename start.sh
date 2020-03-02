#!/bin/bash

# Default values of arguments
DB_PASSWORD=""
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
    esac
done
echo "$DB_PASSWORD"

if [ "$DB_PASSWORD" == "" ]; then
  echo "Add -password arguemnt with the passward you want for the db"
  exit
else
  docker run --rm  --name postgres -e POSTGRES_PASSWORD="$DB_PASSWORD" -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data  postgres
  gnome-terminal --working-directory="$DIR/client" -- npm start
  gnome-terminal --working-directory="$DIR/server" -- npm run start:dev
fi