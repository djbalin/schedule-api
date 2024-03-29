# schedule-api

An API for a minimal scheduling app. Challenge posed as part of the technical assessment in a job interview.

# How to use

## Set up and run repository

Clone and navigate to the repository:

```shell
git clone https://github.com/djbalin/schedule-api.git
cd schedule-api
```

Install packages:

```shell
npm install
```

Run the development server and the CLI tool:

```shell
npm run start:dev
```

## Usage of CLI tool

This project ships with a (hopefully) fully-functioning CLI tool to play around with the API.

The available CLI commands which span the requisite API endpoints are as follows:

`create person <name> <email>`

`create meeting <email1> <email2> ... <emailn> ... <beginTime>`

`show persons`

`show meetings`

`show schedule <email>`

`show availability <email1> <email2> ... <emailn>`

`exit`

## CLI example

Below, a brief example and the terminal output is shown

```shell
>> help
----- AVAILABLE COMMANDS: -----
create person <name> <email>
create meeting <email1> <email2> ... <emailn> ... <beginTime>
show persons
show meetings
show schedule <email>
show availability <email1> <email2> ... <emailn>
exit
-------------------------------------
TYPE 'help' TO SEE THIS MENU AGAIN
-------------------------------------
```

```shell
>> create person jack jack@mail.com

--- API CALL ---
POST http://localhost:3000/persons
DATA POSTED:
{ name: 'jack', email: 'jack@mail.com' }

--- RESPONSE ---
STATUS: 201
MESSAGE:
{ message: 'Person created with email jack@mail.com' }
```

```shell
>> create person jane jane@mail.com

--- API CALL ---
POST http://localhost:3000/persons
DATA POSTED:
{ name: 'jane', email: 'jane@mail.com' }

--- RESPONSE ---
STATUS: 201
MESSAGE:
{ message: 'Person created with email jane@mail.com' }
```

```shell
>> create meeting jane@mail.com jack@mail.com 10

--- API CALL ---
POST http://localhost:3000/meetings
DATA POSTED:
{ participants: [ 'jane@mail.com', 'jack@mail.com' ], beginTime: '10' }

--- RESPONSE ---
STATUS: 200
MESSAGE:
{
  message: 'Meeting at 10 created with participants jane@mail.com, jack@mail.com'
}
```

```shell
>> show meetings

--- API CALL ---
GET http://localhost:3000/meetings

--- RESPONSE ---
STATUS: 200
MESSAGE:
[
  {
    beginTime: 10,
    participants: [ 'jane@mail.com', 'jack@mail.com' ],
    duration: 1,
    id: 0
  }
]
```

```shell
>> create meeting jane@mail.com 13

--- API CALL ---
POST http://localhost:3000/meetings
DATA POSTED:
{ participants: [ 'jane@mail.com' ], beginTime: '13' }

--- RESPONSE ---
STATUS: 200
MESSAGE:
{ message: 'Meeting at 13 created with participants jane@mail.com' }
```

```shell
>> create meeting jane@mail.com 13

--- API CALL ---
POST http://localhost:3000/meetings
DATA POSTED:
{ participants: [ 'jane@mail.com' ], beginTime: '13' }

--- RESPONSE ---
STATUS: 200
MESSAGE:
{ message: 'Meeting at 13 created with participants jane@mail.com' }


show availability jane@mail.com jack@mail.com
show availability jane@mail.com jack@mail.com

--- API CALL ---
GET http://localhost:3000/available-timeslots/jane@mail.com-jack@mail.com

--- RESPONSE ---
STATUS: 200
MESSAGE:
[ 9, 11, 14 ]
```
