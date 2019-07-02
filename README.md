# Donkey Notes - [Click to View Live App](https://evening-plains-17106.herokuapp.com/)

## What is it?

**DonkeyNotes** is a social network that allows friends to quickly share their opinions on the latest presdential debate.

First, DonkeyNotes allows inidividuals to record their personal thoughts regarding a candidate's performance.

Second, DonkeyNotes also allows groups to view eachother's opinions. DonkeyNotes sends a daily email digest to all group members, containing the group's latest opinions on the presidential candidates. Additionally, users can always instantly view their friend's comments by entering their friend's email in the username input box.


## How to Use

![alt text](/public/assets/readmeImages/demo.gif "User Guide")

No Installation necessary. Open app by clicking on url link at the top of this guide and follow all form and prompt instructions.

1. Enter a valid email address.
The email address serves as your username and is required in order to make notes on the presidential hopefuls.

2. Add/edit your notes.
Clicking on the "note editing mode" button allows user to add, edit, or delete their notes.

3. View your friend's notes.
Entering a friend's username will allow you to immediately view their notes.

4. Receive Daily Email Digest.
Daily email will automatically be sent to your email and show you your friend's latest commentary.

5. Give Donkey Notes a 5 star rating!

## Tech Stack:

###Front End/Client Side

* Html, CSS, JavaScript, and JQuery:
The site uses HTML, CSS, JavaScript, and jQuery to dynamically updates the site's contents.

* [CSS Framework](https://getbootstrap.com/): 
Bootstrap is one of the leading open-source CSS framework directed as a responsive, mobile-first front-end web development. It contains CSS- and JavaScript-based design templates for typography, forms, buttons, navigation and other interface components which sleekly styles our website and quickly validate username emails.

###Back End

Server Side Program
Node.js [https://nodejs.org] is an open source server environment. DonkeyNotes utilizes the Express framework to easily connect the application from front to back end utilizing get, put, post, and delete requests and using MYSQL as the back end database.

Framework
Express [https://expressjs.com/]:
Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

Database
MYSQL [https://www.mysql.com/]: is a structured database that DonkeyNotes uses to store user, candidate, and notes information. SQL Joins are used to retrive data from backn end using complex queries to pass data to front end as JSON objects.

Email Service [https://aws.amazon.com/lambda/]:
AWS Lambda is a managed AWS service that allows you to run "serverless code" independently from existing resources in your environment. Donkey Notes utilizes a lambda function to query the latest notes from all users on the platform and send out a marketing email via sendgrid to all the users with the latest information. Users also have the ability to unsubscribe from these emails.

Deployment
Heroku [https://dashboard.heroku.com/login]:
Heroku is a cloud platform that lets developers quickly build, deliver, monitor, scale and deploy apps.

## Future Directions

1. Streaming comments service
- Comments would be updated in real time and displayed as a stream on the customizabale panel/widget.

2. Ranking notes
- Rank numerically who's doing well, who's not, and share those stats with your friends via email.




