FROM mongo

COPY seeddata.json /seeddata.json 
CMD mongoimport --host mongo_one --db inventory --collection orders --type json --file /seeddata.json --jsonArray
