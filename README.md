# School Management System - REST API
## Using NodeJS, ExpressJS and MongoDB

> A REST API for school management system, created using NodeJS and ExpressJS. Index:
* *Task Definition*
* *Schema Definitions*
* *Routes explanation*
* *Using Postman to test API*
****
### ***Task Definition***
> The task is to define a REST API, using any tools and technologies. Here I have used Node and Express. This is a backend task and the goal here is to design a database having four collections (in case of mongodb). The four collections are:
> * *Admins*
> * *Teachers*
> * *Students*
> * *Classes*

> The admin has the highest privilege of editing the database. He can add teachers, delete teachers, add students, delete students, add classes, delete classes, map a certain student to a certain class or map a certain teacher to a certain class.
> The teacher has the following privileges:
> * He/She can get a list of all students (in alphabetical order) of his/her class.
> * Create a score card for each student
> * Get a list of students based on their marks (in descending order)

> The Student can only view his/her marks once logged in.

> So there are three different roles, **Admin**, **Teacher** and **Student**, role is set in session once logged in.
****
### ***Schema Definitions***
> **Admin Schema**: It has two fields namely username(String) and password(String), since these are the only parameters required to login. We can extend the schema to store other admin details as well.

> **Teacher Schema**: It has three fields, username(String), password(String) and classId(ref: 'Class'). Since each teacher will be mapped to a certain class by the admin.

> **Student Schema**: It 5 fields namely name(String), username(String), password(String), roll(Number), subjectScore(Array of objects), classId(ref: 'Class'). Similarly each student will be mapped to a certain class.
****
### ***Routes Explanation***
**Admin Routes**

**Teacher Routes**

**Student Routes**

****
