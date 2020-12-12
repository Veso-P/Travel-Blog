# TravelBlog
A single page application for reading, commenting, and creating travel blogs. This project (A travel blog) will be created with Angular and FireBase as a back-end.

## Main Idea
The application will have two parts:

1) Public part (accessible without authentication). Not authenticated users will be able to visit the main page (where some travel blogs will be displayed), the'trending page' (the first 5 blogs with highest number of likes) and the 'new blogs' page (the newest 5 blogs according to date of creation), and a search functionality - in order to search through the titles of the blog. Not authenticated users will be able to signup and login.

2) Private part (available for registered users). The loggedin users will be able access to main page, the 'trending page', the 'new blogs' page, and a logout page. In addition they will be able to create new blogs, update (edit) their own blogs, and like and comment on others' blogs.
*at a later starge, I will implement a profile page, where loggedin users will be able to see all their blogs.


### VERY IMPORTANT!
To run the project use 'npm start' or 'ng serve --proxy-conig proxy.conf.json'
In this application FireBase is used as a back-end. To solve the CORS issues a proxy (proxy.conf.json) is used.

----

### Functionalities implemented in the application

Usage of PIPES:
A. Built-in pipes
1) date:"medium" - in the BlogItemComponent to print the creation date of each blog in a human-readable format, because the fetched data in FireBase stores the date in nanoseconds as a number.
2) uppercase  - in the BlogItemComponent to print the titles of each blog in UPPER CASE.
3) slie: 0 : 150  - in the BlogItemComponent to print only the first 150 characters of the blog description on the main page.

B. Custom pipes
1) sortDate custom pipe implemented for the page "New Blogs'. The pipe filters the newest 3 blogs by date.
2) filter custom pipe implemented for the Search field on the main page. It filters (case insensitive) the blogs by searching for matching a text in the titles (names) of the blogs
3)

Usage of FORMS:
A reactive approach is used.

(TO BE EDITED)