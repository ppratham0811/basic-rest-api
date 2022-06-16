# School Management System - REST API

## Using NodeJS, ExpressJS and MongoDB

> A REST API for school management system, created using NodeJS and ExpressJS. Index:

-   _Task Definition_
-   _Schema Definitions_
-   _Routes explanation_
-   _Instructions to run the API_
-   _Using Postman to test API_

---

### **_Task Definition_**

> The task is to define a REST API, using any tools and technologies. Here I have used Node and Express. This is a backend task and the goal here is to design a database having four collections (in case of mongodb). The four collections are:
>
> -   _Admins_
> -   _Teachers_
> -   _Students_
> -   _Classes_
>
> The admin has the highest privilege of editing the database. He can add teachers, delete teachers, add students, delete students, add classes, delete classes, map a certain student to a certain class or map a certain teacher to a certain class.
> The teacher has the following privileges:
>
> -   He/She can get a list of all students (in alphabetical order) of his/her class.
> -   Create a score card for each student
> -   Get a list of students based on their marks (in descending order)
>
> The Student can only view his/her marks once logged in.
>
> So there are three different roles, **Admin**, **Teacher** and **Student**, role is set in session once logged in.

---

### **_Schema Definitions_**

> **Admin Schema**: It has two fields namely username(String) and password(String), since these are the only parameters required to login. We can extend the schema to store other admin details as well.
>
> **Teacher Schema**: It has three fields, username(String), password(String) and classId(ref: 'Class'). Since each teacher will be mapped to a certain class by the admin.
>
> **Student Schema**: It 5 fields namely name(String), username(String), password(String), roll(Number), scoreCard(Array of objects), classId(ref: 'Class'). Similarly each student will be mapped to a certain class.
> 
> Each object/document of scoreCard field has many attributes within it: studentName, subjectName, examDate, scoreDate, score, comments, studentId, teacherId, classId

_Note: Common schema fields are placed in the common.js file, location: src/database/common.js_

---

### **_Routes Explanation_**

**Login Routes**

-   GET /auth/login - renders login page
-   POST /auth/login - sends post request, request.body should contain _username_ and _password_

**Admin Routes**

-   GET /admin/ - renders admin welcome page
-   GET /admin/teachers - displays all the teachers from db
-   GET /admin/students - displays all the students from db
-   POST /admin/students - post request to add a new student to the db, request.body should contain _name_, _username_, _password_ and _roll_
-   POST /admin/teachers - post request to add a new teacher to the db, request.body should contain _username_ and _password_
-   POST /admin/class - post request to add a new class, request.body should have _name_
-   PUT /admin/teacher/:teacherId/class/:classId - put request to map a teacher to a certain class
-   PUT /admin/student/:studentId/class/:classId - put request to map a student to a certain class
-   DELETE /admin/teacher/:teacherId - delete request to delete a teacher with \_id: teacherId
-   DELETE /admin/student/:studentId - delete request to delete a student with \_id: studentId

**Teacher Routes**

-   GET /teacher/ - render welcome page for teacher
-   GET /teacher/students - get a list of all students from the database, note that only those students will be displayed whose classId matches with the teacher's classId
-   PUT /teacher/student/:studentId - put request to create a score card for student with \_id: studentId
-   GET /teacher/students/ranks - get request to display students list in descending order of ranks

**Student Routes**

-   GET /student/ - renders the home page, which displays the username, roll and marks

---

### **_Instructions to run the API_**

> You should have _nodeJS_, _mongoDB_ and _Postman_ installed on your computer to test the REST API. Download the zip file of this project and extract it or clone it using git. Open the root folder in your favourite code editor, and in the terminal, start the mongo shell. Now use _npm run seeds_ to run the src/seeds.js file, this will create a mainAdmin in the admins collection, it will create a database of the name sch-mgmt. Now in the terminal type _npm start_, this will open the app in port 3000. Now you can login using the admin credentials, create a teacher and a student, map them to a newly created class, then test all the routes in _Postman_.

---

### **Using Postman to test the REST API**

> Once you connect to mongo shell and run the seeds file, then run _npm start_ and go to postman. Now you need to import the postman-collections.json file into postman, the routes are already available in the postman json file, you just need to send the request, after ensuring appropriate request.body parameters have been enabled. You have to logged in to perform any operations. Since in the seeds file we have created an admin, login using those credentials, and create a student and teacher, map the teacher and student to a class. Next, you can login using the teacher's credentials and add marks/score card for a student. Login using student to view the score card.
