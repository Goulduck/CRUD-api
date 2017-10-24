# CRUD-api

## Requirements
- Basic knowledge of Node.js/npm
- <a href="https://www.getpostman.com/">Postman App</a>

## Installation

- Download and unzip repository
- Open terminal and navigate to the project directory
- Run commands
<pre>
sudo npm install
npm start
</pre>

## Functions

- Open Postman
- Copy and paste 'http://localhost:3001' into Postman request URL bar

#### Creating User
- Set request type to POST
- Select the body tab and check 'application/x-www-form-urlencoded'
- Create 3 'keys' of 'email', 'forename' and 'surname' and give them text values
- Click send

```js
{
    "message": "User successfully created!",
    "user": {
        "email": "* Your value *",
        "forename": "* Your value *",
        "surname": "* Your value *",
        "_id": "userID",
        "dateCreated": "dateCreated"
    }
}
```


#### Viewing Users
- Set request type to GET and click send
```js
{
  "users": [
    {
        "email": "* Your value *",
        "forename": "* Your value *",
        "surname": "* Your value *",
        "_id": "userID",
        "dateCreated": "dateCreated"
    },
    {
        "email": "* Your value 2 *",
        "forename": "* Your value 2 *",
        "surname": "* Your value 2 *",
        "_id": "userID 2",
        "dateCreated": "dateCreated 2"
    }
  ]
}
```

#### Editing User
- Set request type to PUT
- Create 3 'keys' of 'id', 'email', 'forename' and 'surname' and give them text values (id must be valid)
- Click send
```js
{
    "message": "User updated!",
    "user": {
        "_id": "userID",
        "email": "* new value *",
        "forename": "* new value *",
        "surname": "* new value *",
        "dateCreated": "* original dateCreated *"
    }
}
```

#### Deleting User
- Set request type to DELETE
- Create 'id' key (Must be valid)
- Click send
```js
{
    "message": "User deleted",
    "userToRemove": {
        "n": 1,
        "opTime": {
            "ts": "6480581423135719425",
            "t": 2
        },
        "electionId": "7fffffff0000000000000002",
        "ok": 1
    }
}
```

## Unit testing
Test coverage has been implemented. To run the unit tests, open the project loaction in your terminal and run:
<pre>
npm run test
</pre>
All tests should pass! :)
