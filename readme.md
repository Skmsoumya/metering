# Metering API and User interface consuming it

## Tasks:

• Create a publicly accessible Git repository
• Build a RESTful API that exposes per meter consumption data in JSON using NodeJS + Express
• Build a frontend using ReactJS
    o Should be able to search for a meter using the serial number
    o On selection of meter, display meter consumption data over time in a chart.
• CI/CD (Nice to have, share deployed link)

## Thought process:

My approach will be to start with the backend api first and then work on the frontend app. 

### Backend:

The backend API will expose two routes. 

1. /meters:
This route will provide a list of meters available on the system. The API user can filter the meters by the meterId.

2. /meters/{meterId}:
This route will provide the metering data of an individual meter. The API user can specify time range withing which he wants to receive the data. 

Please refer to the API schema for a detailed description of the API routes, valid route, and query parameters, and response schemas. [API Schema](./schema/schema.yaml)

Technologies used:

**Database**:

Firebase Firestore

**Server**:

NodeJs + Express


**Testing**:

Jest

**Hosting**:

Google App Engine

