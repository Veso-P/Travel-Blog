# TravelBlog
A single page application for reading, commenting, and creating travel blogs. This project (A travel blog) will be created with Angular and FireBase as a back-end. For better styling Bootstrap is used.

## Main Idea
The application will have two parts:

A. Public part (accessible without authentication). Not authenticated users will be able to:
1) visit the main page (where some travel blogs will be displayed), 
2) visit the'trending page' (the first 5 blogs with highest number of comments),
3) visit the 'new blogs' page (the newest blogs according to date of creation) with function to choose the number of blogs,
4) use a search functionality - in order to search through the titles of the blog,
5) visit(read-only) each blog details page.
5) visit Login and Register pages,
6) and visit 'About us' and 'Contacts' pages.

B. Private part (available for registered users). The loggedin users will be able to:
1) visit the main page (where some travel blogs will be displayed), 
2) visit the'trending page' (the first 5 blogs with highest number of comments),
3) visit the 'new blogs' page (the newest blogs according to date of creation) with function to choose the number of blogs,
4) use a search functionality - in order to search through the titles of the blog,
5) visit each blog details page and COMMENT (in comparison non-authenticated users are not-allowed to comment on blogs).
6) CREATE A NEW BLOG (in comparison non-authenticated users are not-allowed to create blogs).
7) VISIT A 'MY PROFILE" PAGE which includes only the list of the posts created by the currently logged-in user (in comparison non-authenticated users are not-allowed to visit 'My Profile' page). 
8) Logout.
9) Login and Rigister is hidden and foribdden for loggid-in user.
* Logged-in Users will be able to edit/update only their posts. On others' post they will be able only to comment.


### VERY IMPORTANT!
To run the project use 'npm start' or 'ng serve --proxy-conig proxy.conf.json'
In this application FireBase is used as a back-end. To solve the CORS issues a proxy (proxy.conf.json) is used.

----

### Functionalities implemented in the application

Usage of FireBase as back-end.
A. To register (signup) the user should enter a valid email (at least 6 characters long) and a passwored (at least 6 characters long). This is a FireBase built-in requirement.
B. POST requests are used for user registration (signup), user login, creating a new blog. 
C. PATCH requests are used for partial update of data (i.e. for editing a blog, or addig a comment to a blog). 
D. GET requests are used for retrieving the data about the blogs.

Usage of PIPES:
A. Built-in pipes
1) date:"medium" - in the BlogItemComponent to print the creation date of each blog in a human-readable format, because the fetched data in FireBase stores the date in nanoseconds as a number.
2) uppercase  - in the BlogItemComponent to print the titles of each blog in UPPER CASE.
3) slie: 0 : 150  - in the BlogItemComponent to print only the first 150 characters of the blog description on the main page.

B. Custom pipes.
1) sortDate custom pipe implemented for the page "New Blogs'. The pipe filters the newest blogs by date. The user choose the number of how many blogs to filter.
2) filter custom pipe implemented for the Search field on the main page. It filters (case insensitive) the blogs by searching for matching a text in the titles (names) of the blogs
3) trending custom pipe implemented for the page "Treding blog'. The pipe filters the trending blogs. The user choose the number of how many blogs to filter.

Usage of FORMS:
Mainly a reactive approach is used istead of template driven.
A. A form for registration a new user is used with three fields:
    1. email - email validator used, min length of 6 validator used,
    2. password - min length of 6 validator used
    3. repated password - custom validator for matching the password is used

B. A form for loggingin is used with two fields:
    1. email - validator for min length of 6 characters is used
    2. password - validator for min length of 6 characters is used

C. A form for creating a new blog with three fields is used:
    1. blog title (name) - validator for min length of 6 characters is used
    2. image source (imagePath) - validator for min length of 6 characters is used
    2. description - validator for min length of 200 characters is used

D. A form for editng a blog with three fields is used:
    1. blog title (name) - validator for min length of 6 characters is used.
    2. image source (imagePath) - validator for min length of 6 characters is used.
    2. description - validator for min length of 200 characters is used.

E. A form for writing a comment with one field is used.


Usage of Guards (CanActivate):
1) AuthGuard is used to protect the links (create/edit page, user profile pages) from unauthenticated user.
2) AuthGaurdTwo is used to protect the links (login, register) from authenticated user.

Auth Service:
is used to keep the operations needed for registering, logging-in, logging-out, and checking the current authentication status.

#### Usage of Interceptors
1) Interceptor for adding the Authentication Token to HTTP POST requests

Usage of Models:
A. User Model consisting of email, password, token, and token expiration.
B. Blog Model consisting of id, name, descriptoin, image source, date of cration, creator ID and array of comments. 

Using of bcrypt for additional hasihg of the tokens.

(TO BE EDITED)