Moziox
======

Test project to show skills with django, javascript, html css.

The idea of the project is to be able to set a Service area in a google map and save it.
There's another page where the user can select the service area to use, and play to click on the map and guess if the point is inside the selected service area.

you can take a look at it here: http://moziox-env-yvx3mwxmzm.elasticbeanstalk.com/

how to use:
-----------

* The main page (/):
	* The user can create polygons clicking on the map, to close the polygon the user must click on the first point of the polygon again.
	* The user can create all the polygons he wants.
	* The points can be dragged to change the shape of the polygon, no matter if the point its not in the last created polygon.
	* Hovering with the mouse over the points will show its coordinates.
	* The user can clear and start again using the clear button.
	* After the polygons are created, the user has to enter a name for the service area and save.
	* if everything went right, the user should click on next button to start playing!.
* The "find" page (/find):
	* The user can select a service area from a drop down, by default the most recent one will be selected.
	* The user clicks on the map, if he hits outside of a polygon of the selected service area a green dot will be drawn, otherwise a red dot will be drawn.
	* Also theres a text in the headers to call the atention of the user to check if he missed or hit.

About the Code:
---------------

* This is a django project, with a small backend used just to store the service area, and to glue the different parts of the app (forms, views, templates).
* I decided to use Django gis, for this little app it may be an overkill, but if the backend grows or there's a need to store and do calculations using geographic data. django gis is the way to go.
* Most of the magic happens in the javascript files.
  * map.js: contains the code that interact with google maps.
  * main.js: contains the code that uses the class in map.js and deals with the ui when creating a service area.
  * find.js: contains the code that uses the class in map.js and deals with the ui when playing to guess if a point is inside a service area.

Deploy:
-------
* This app was deployed to Amazon web services (aws) using Elastic Beanstalk, following the documentation in here:
http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_Python_django.html
* Right now the server is set to south america, in case you can't access the hosted app.
* Everything went smooth beside some minor customization to be able to run django gis with mysql in aws server.

