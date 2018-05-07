# usr-mgt

## Description
usr-mgt (short for User Management) is a NodeJS server app exposing basic API for create/managing user along with their authentication.

It's divided in two different (almost) REST APIs in form of express router objects:
- the authentication router will handle api for connection/disconnection of users.
- the user API will allow you to maage the user entity.

Each router has its URL scheme for each action (see links below) but as it's 
express router you can prefix them with whatever you want (see example):
- authentication url scheme
- user API url scheme

## Options
When initialising the API you pass an options object which allows you to override some part of the API:

### database
To change the database settings (currently MongoDB but it might change to a broader set in future versions)

#### url (string)
The database endpoint.
Default: "localhost:27017"
Example:
'
{
    database: {
        url:"localhost:27017/myDb"
    }
}
'

#### tableName (string)
Name of the collection/table which stores the users' data.
Default: "AppUsers"
Example:
'
{
    database: {
        tableName:"myUsers"
    }
}
'

## Changelog

### V0.2.0
- Add support for options to customise the API
- Now encrypt password with BCrypt
- Add "forget/reset password" feature

### V0.1.0
Initial version.

## Roadmap and planned features
- add a standalone a mode so you can launch the API on its own
- add Unit testing and Intgeration testing
- support for oAuth login
- support for LDAP