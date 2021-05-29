#  Chefkart Backend
This is the backend part of a project where you'll find a schema, setup of database connection & routes of lot of APIs.

Currently includes:

* Node.js
* Express
* mocha
* chai

## Quick Start

## ./src in directory

The inside of the src directory looks similar to the following:

```
src
├── routes
├── common
├── test
```

```schema is outside of src directory```

## routes.js
This contains routes that describes the feature of application.

## Steps to run a project

# Create database and tables in Mysql

1. Go to schema directory under chefkartBackend
2. Run queries one after the another. Follow the sequence given below.

```
queries
├── Run CREATE DATABASE
├── Run CREATE USER TABLE
├── Run CREATE LEAD TABLE
```

# Steps to start a server
1. cd chefkartBackend
2. cd src
3. npm install
4. npm start
5. Make sure to use your mysql password in place of <your password> in mysql-controller under common directory.

# Steps to test the application

Here are the features that backend supports.

1. Sign Up - /user/register
2. Login - /user/signIn
3. Users can see their profile data - /users/:userId
4. Users can submit a new lead - /leads/:userId
5. App should allow an individual person to see all the leads he has given with the status of that lead - /users/:userId/rewards
6. App needs to show all the rewards he has earned with how much for which lead - /users/:userId/leads
7. App allows the user to see the leads he has given between two certain dates - /users/:userId/leads

# Steps to run the test cases

1. cd src/test
2. Run command npm test


# Requirement
```Lead status: New, In pipeline, Successful, Junk
Profile details: Name, Phone Number, Email Id
Leads details: Name, Phone number, Address.```