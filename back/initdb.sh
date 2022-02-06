
docker cp .\raw-data\recipes.json mongo:/tmp
mongoimport -d recipe -c recipes recipes.json
