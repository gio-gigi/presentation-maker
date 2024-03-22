# Table of contents

- [Intro](#intro)
- [Development Setup](#requirements)

## Intro <a name="intro"></a>

## Developmet Setup
### Requirements
- Nodejs installed
- Mysql installed
  
### First, clone the repository with git 
```
git clone git@github.com:gio-gigi/presentation-maker.git
cd presentation-maker
```

### Install dependencies
#### Change directory to /backend and run: 
```
npm install
```
#### Change directory to /frontend and run: 
```
npm install
```
### Add environment variables
Create a .env file inside ./backend with the next variables (you can leave the values as they are except for DB_USER and DB_PWD)
```
PORT=3001
DB_PORT=3306
DB_USER=root
DB_PWD=yourdbpassword
DB_LOGGIN=true
DB_NAME=presentation_maker
DB_HOST=localhost
SECRET_JWT=mysecret
ADMIN_PWD=admin
ADMIN_EMAIL=admin@gmail.com
ADMIN_NAME=admin
```
### Create database
#### Create a database in mysql as  $DB_NAME

### Run proyect
#### Change directory to /backend and run:
```
npm start
```
#### Change directory to /frontend and run: 
```
npm start
```



