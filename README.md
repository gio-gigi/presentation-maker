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
```
npm --prefix ./backend install
npm --prefix ./frontend install
```
### Add environment variables
Create a .env file inside ./backend with the next variables (you can leave the values as they are except for DB_USER and DB_PWD)
```
PORT=3001
DB_PORT=3306
DB_USER=yourdbuser
DB_PWD=yourpassword
SECRET_JWT=yoursecret
```
### Run backend
```
npm --prefix ./backend/ start
```
### Run frontend 
```
npm --prefix ./frontend start
```



