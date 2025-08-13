# Easy Buckets - Basketball Scoring and Stat Tracking Web App
#### Video Demo: (https://youtu.be/ZOgWZeTVZ2o)

## Overview of Functionality and Use Case
I play in a social basketball league and we record and watch back our games every week to try and improve as a team.
I had been recording basic scoring statistics for these games for our team on a Google sheet for a couple of years now, so thought why not use my new webdev skills to try and create a web app to help me or others in the same situation do this?

### My basic goals for functionality for this project were as follows:
  - To make the process of entering stats easier and faster using easy to use UI instead of directly entering stats into a spreadsheet.
  - Create shot charts (markings of where every shot is taken on the court all on one chart) which is not possible on a spreadsheet. This is often used for game analysis to figure out the most or least efficient shot zones on the court.
  - To make viewing the stats after they are entered easier using pre-set-up pages to calculate and view team averages and totals, individual game stats, as well as individual player stats all in one place. All of which were things I had to calculate manually before.

## Structure and Design

### Introduction to Front End and layout.html
 - Bulma - https://bulma.io/ is the css framework I used for the website as I liked Bootstrap but wanted to try something different. I used a lot of different components from this as well as the overall default styling.
   - Most of the buttons, input fields, headings, and tables you see on the site are formatted through Bulma classes.
 - The templated layout on layout.html uses the nav component from Bulma which I simplified and customised to only have home, new season creation, and login buttons (more on this later).
 - I decided against a footer as I dont have a large amount of further links to put in there and many pages lead on from one another through post requests, so GET requests may lead to issues with data not appearing.
 - The website uses user preference to determine dark or light mode with a basic orange, black, yellow, and white colour scheme.
 - I started with CS50's apology function but decided to use flash messages instead from the back end as most pages need to be reloaded anyway as part of the website design.

 ### SQL Database Structure and Design
 - The back end design uses six different sql databases, each of them is explained as below.

 #### Users - Website Users
 - id field is the autoincremented primary key.
 - Team and password fields are hashed, for password because of security, and for team because there could be a case where two teams have the same name but we still need to be able to differentiate (Usually basketball related puns).
 - Username field for logins.

 #### Players
 - id autoincremented primary key as before
 - playernumber, playername, and teamid to track what team they belong to(hashed)

 #### Season - collection of overall seasons
 - gameamount or how many games
 - id as above but for this database
 - teamid as above
 - name

 #### Teams
 - name and unique teamid as above

 #### Shots - Every 2 or 3 point shot taken in an a game
 - autoincremented unique shot id
 - gamenumber, seasonid, and playername matching the other databases
 - Whether the shot is a make or a miss
 - The shots' X and Y co-ordinates
 - The shot type e.g, 2 or 3 pointer

 #### Gamestats - Individual player stats for each game
 - I wanted each entry in this database to be a single players stats for a particular game so it is easier to track single games, display while scoring, and aggregate for season and team stats.
 - I chose 13 statistical categories that I wanted to record in games;
   - 2 point field goal miss
   - 2 point field goal make
   - 3 point field goal miss
   - 3 point field goal make
   - Free throw miss
   - Free throw make
   - Offensive rebound
   - Defensive rebound
   - Assists
   - Blocks
   - Steals
   - Turnovers
   - Personal fouls
- As well as 5 further automatically calculated categories using the above;
    - 2 point field goal %
    - 3 point field goal %
    - Free throw %
    - Total rebounds
    - Points
- Then there are 6 additional fields to link up with other databases
  - seasonid
  - team(hashed)
  - playerid (which number they wear)
  - gamenumber (which game in the season)
  - id which is an autoincremented primary key so each entry is unique
  - player name

## Functionality

### Login functionailty
 - I borrowed and modified the Register and Login routes from the CS50 finance problem set as well as session functionality. This also included hashing functionality which I used in multiple places as I will explain in the SQL section.
 - I also reused the login_required function from CS50.
 - I created functionality on layout.html where if the user is logged in, only the "log out" button will show on the header and vice versa, if the user is logged out it will only show the "log in" and "sign up" buttons as options hiding the "log out button".
   - This was much more complicated than I anticipated as I had to create a route in app.py in Python to check if there was an active session "user_id" then return it as a JSON to the front end where I wrote a Javascript fetch request on layout.html to parse the JSON and show or hide buttons using class accordingly.
   - Most of the routes use login_required anyway but I liked the idea of having reactive buttons to login status.
### Season Setup
- Season setup is in the nav and where the user enters the name and how many games are in the season. This data is then entered into the seasons database via SQL.
- If no season exists the homepage will redirect to this page until one does.
### Homepage
- From the homepage you can either begin scoring a new game with a game selector based on how many games the user entered in season setup or view season stats. Both options also pull in the season name, or if there are multiple the user can select which one.
- Users will be redirected to the login screen if they try and view the homepage without an active session.

### Entering stats
#### Player entry
 - From the homepage selector the user is taken to enterplayers.html, where they enter player names and numbers that will be active in the game they are about to score. There are checks to stop invalid player numbers or names.
 #### Scoring
 - Upon submission the user is redirected to enterstats.html, the main stat entry page.
   - On this page there are name buttons representing all the players just entered, there are stat buttons representing the non-calculated stats from the gamestats database above, and there is a clickable court diagram.
   - There is also a box score table prepopulated with player names and displaying all the player stats from gamestats.
   - Once the user selects a player (toggle button) they are ready to enter a stat for that player.
   - There are two types of statistics a user can enter, those which can be placed on the court diagram (calling these placeable stats) - 2PFG and 3PFG makes and misses, and every other stat which don't require location data to be recorded (static stats).
     - For the placeable stats the stat buttons themselves are toggles, which once selected enable the user to click where to place them on the court diagram. This will then visually mark a make or miss on the court as well as update the relevant stats in the box score table below.
       - Shot data is also pushed as a JavaScript object to a Shots array.
       - From there the x and y values of the shot are divided by the dimensions of the shot chart. When they are displayed on the chart again on this page or elswhere they are re-multiplied by the dimesions of the shot chart so that it keeps the same relative position on the chart regardless of size.
     - For static stats the buttons are not toggles and simply add to the relevant stats at the box score diagram.
    - For each stat entered, the overall player stats for that game updates a players stats JavaScript object on a playerstats array that was created earlier using all the players names.
  - There are also undo and redo fuctionality through the respective buttons;
    - Undo works by pushing a JavaScript object that contains the last updated element on the page to an undostack array every time a change is made. Then when the button is pressed the undo function pops the last element off the undostack array, and based on the type of element reverses the changes and updates the statistics(which update the table). The element is then pushed to the redostack array.
    - The redo function then takes the element from the redostack, similarly to undo - it reverses the last change based on the data, then adds the element back onto the undostack.
- There is also a guide on how to use the page in a modal pop out from Bulma that is activated via a button near the top of the page.
- Upon submission of scores through the button at the bottom of the page shots and stats are passed via a fetch request to the server where they are iterated and entered into the gamestats and shots databases  respetively.
- There is then a button to return to the homepage.
### Viewing Stats
 - There are three sections to seasonstats.html, where all the statistics from the games are displayed. I used Bulma's tab system as well as some JavaScript in helpers.js to make the tabs and relevant sections hide and show using Bulma's "is-hidden" class.
 - Most of the statistics in these sections are created through iterating through SQL queries then looping over those lists or in the case of shots, a dictionary containing lists of dictionaries as to group stats by game then list those dictionaries under that game. Then iterating through these to create individual tables or charts with Jinja on the templates.
 - A major issue was the shot charts not loading fast enough (race condition) for the shots to be marked leading to bugs. By delaying the loading of the shots until the charts were loaded I solved this bug.

#### Team Stats
 - This section shows the overall team total stats for every category, team averages for those stats, and a team shot chart for the season.

#### Game Stats
 - This section shows individual game stats and shot charts as they were entered for all the games that have been scored for the season.

#### Individual Stats
 - This section shows individual player stats for the whole season including totals and averages.

### helpers.js and helpers.py
#### helpers.js
- Contains the majority of the JavaScript functions necessary for front end functionality, particularly for  scoring but also for the stat display page.
#### helpers.py
 - Contains the login required function.
