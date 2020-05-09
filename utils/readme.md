# UTILS

This directory contains utility scripts to populate the firebase database with the initial data. 

The utility functions are meant to only be used from your local system. 
The script expects the following environment variables:

`DATABASE_URL`
The url of the firebase database.

`GOOGLE_CLOUD_PROJECT`
The google cloud/firebase project ID.

`PATH_TO_SA`
Path to the service account key file. You should not keep it in the project directory and delete the file and revoke the key after running this script. Never commit the service account with the code. 

`PATH_TO_CSV_METERING_DATA`
Path to the .csv file containing the metering data.

To set this environment variables you can add a `.env` file containing the environment variable to the `utils` folder. The script will automatically inject the variables during runtime. 



