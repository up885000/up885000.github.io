
#This script will create the recipeapp database and populate it, then start a node server.
#It will create the database user webapp and grant them necessary permissions on the recipe app database.

#!/bin/bash

npm install

cat ./database/createdb.sql | mysql --user=root --password=root

npm start