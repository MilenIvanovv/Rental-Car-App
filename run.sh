DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
gnome-terminal --working-directory="$DIR/client" -e  'sh -c "npm start; exec bash"'
gnome-terminal --working-directory="$DIR/server" -e  'sh -c "npm run start:dev; exec bash"'