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

## Changelog

### V0.1.0
Initial version.

## Roadmap and planned features
- encrypt password 
- add options to customize the API
- add a standalone a mode so you can launch the API on its own
- add "forget/reset password"
- add Unit testing and Intgeration testing
- support for oAuth login
- support for LDAP