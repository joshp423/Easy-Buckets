import os
import random
import statistics

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session, jsonify, url_for, get_flashed_messages
from flask_session import Session
from helpers import login_required
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.secret_key = '854'
Session(app)

db = SQL("sqlite:///basketball.db")


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/", methods=["GET", "POST"])
@login_required
def enterplayers():

    if request.method == "GET":

        if session.get("user_id") == None:
            return redirect("/login")

        userseasons = db.execute(
            "SELECT name FROM season WHERE teamid IN (SELECT hashteam FROM users WHERE id = ?)",
            session["user_id"]
        )

        season_games = db.execute(
            "SELECT gameamount FROM season WHERE teamid IN (SELECT hashteam FROM users WHERE id = ?)",
            session["user_id"]
        )

        if len(userseasons) < 1:
            return redirect("/seasonsetup")

        return render_template("homepage.html", userseasons=userseasons, seasongames=(season_games[0]["gameamount"]+1))

    session['gamescored'] = request.form.get("gameselect")

    session['season_game'] = request.form.get("season_game")

    existingcheck = db.execute(
        "SELECT id FROM gamestats WHERE gamenumber = ? AND seasonid IN(SELECT id FROM season WHERE name = ?) AND seasonid =(SELECT id from season WHERE teamid = (SELECT hashteam FROM users WHERE id = ?))",
        session['gamescored'], session['season_game'], session["user_id"]
    )

    if len(existingcheck) != 0:
        flash(
            f"Game {session['gamescored']} already exists for this season! Please score a game that hasn't already been scored.")
        return redirect("/")

    return render_template("enterplayers.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        # Ensure username was submitted
        if not request.form.get("username"):
            flash("Must provide username - Error 403")
            return render_template("login.html")

        # Ensure password was submitted
        elif not request.form.get("password"):
            flash("Must provide password - Error 403")
            return render_template("login.html")

        # Query database for username
        rows = db.execute(
            "SELECT * FROM users WHERE username = ?", request.form.get("username")
        )

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(
            rows[0]["hashpass"], request.form.get("password")
        ):
            flash("Invalid username or password Error 403")
            return render_template("login.html")

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/sessioncheck", methods=["POST"])
def sessionCheck():

    if session.get("user_id") == None:
        return jsonify("not logged in")

    elif session["user_id"] != None:
        return jsonify("logged in")


@app.route("/logout", methods=["POST"])
def logout():

    session.clear()

    return redirect("/")


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    if request.method == "POST":

        name = request.form.get("username")
        if not name:
            flash("Must provide username")
            return render_template("register.html")

        name_compare = db.execute("SELECT username FROM users WHERE username = ?", name)

        if len(name_compare) == 1:
            flash("username already exists")
            return render_template("register.html")

        else:
            password = request.form.get("password")
            if not password:
                flash("Must provide passwords")
                return render_template("register.html")

            teamname = request.form.get("team")
            if not teamname:
                flash("Invalid Team Name")
                return render_template("register.html")

            confirmation = request.form.get("confirmation")
            if not confirmation:
                flash("Must provide password confirmation")
                return render_template("register.html")

            elif confirmation != password:
                flash("Passwords do not match")
                return render_template("register.html")

            try:
                db.execute(
                    "SELECT username AND hashpass FROM users WHERE username = ? AND hashpass = ?",
                    name, generate_password_hash(password, method='scrypt', salt_length=16)
                )
            except ValueError:
                flash("Account already exists")
                return render_template("register.html")

            db.execute(
                "INSERT INTO users (username, hashpass, hashteam) VALUES(?, ?, ?)", name,
                generate_password_hash(password, method='scrypt', salt_length=16),
                generate_password_hash(teamname, method='scrypt', salt_length=16)
            )

            db.execute(
                "INSERT INTO teams (teamid, name) VALUES(?, ?)",
                generate_password_hash(teamname, method='scrypt', salt_length=16), teamname
            )

            return render_template("login.html")

    return render_template("register.html")


@app.route("/seasonsetup", methods=["GET", "POST"])
@login_required
def seasonsetup():

    if request.method == "POST":

        season_name = request.form.get("seasonname")
        if not season_name:
            flash("Please enter valid season name")
            return render_template("seasonsetup.html")

        s_name_checker = db.execute("SELECT id FROM season WHERE id = ?", season_name)
        if len(s_name_checker) == 1:
            flash("Username already exists")
            return render_template("seasonsetup.html")

        game_number = request.form.get("gamenumber")
        if not game_number:
            flash("Please enter valid number of games")
            return render_template("seasonsetup.html")

        elif int(game_number) < 1:
            flash("Please enter valid number of games")
            return render_template("seasonsetup.html")

        print(game_number)

        team = db.execute("SELECT hashteam from users WHERE id = ?", session["user_id"])

        db.execute(
            "INSERT INTO season (gameamount, id, teamid, name) VALUES(?, ?, ?, ?)",
            game_number, random.randrange(1, 100000), team[0]["hashteam"], season_name
        )

        return redirect("/")

    return render_template("seasonsetup.html")


@app.route("/viewstats", methods=["GET", "POST"])
@login_required
def viewstats():

    if request.method == "POST":

        season_name = request.form.get("seasonselect")

        if not season_name:
            flash("Please enter valid season")
            return redirect("/")

        seasonid = db.execute(
            "SELECT seasonid from gamestats WHERE seasonid IN(SELECT id FROM season WHERE name = ?)", season_name)

        if not seasonid:
            flash("No season stats to view (yet), score a game first!")
            return redirect("/")

        season_games = db.execute(
            "SELECT gameamount FROM season WHERE teamid IN (SELECT hashteam FROM users WHERE id = ?)",
            session["user_id"]
        )

        seasongamecount = (season_games[0]["gameamount"])

        gamestats = {}
        gameshots = {}
        playerstats = {}
        playertotalstats = {}
        playerSeasonAverages = {}

        print(seasongamecount)
        # gamestats is a dictionary where each key is a game number and each value is a list of dictionaries containing the game stats
        x = 1
        while x <= seasongamecount:
            game = db.execute(
                "SELECT * FROM gamestats WHERE gamenumber = ? AND seasonid =?", x, seasonid[0]["seasonid"])
            for stats in game:
                games = {
                    "gamenumber": stats["gamenumber"],
                    "playername": stats["playername"],
                    "playernumber": stats["playerid"],
                    "FGM": stats["FGM"],
                    "FGA": stats["FGA"],
                    "FGP": stats["FGP"],
                    "TPM": stats["TPM"],
                    "TPA": stats["TPA"],
                    "TPP": stats["TPP"],
                    "FTA": stats["FTA"],
                    "FTM": stats["FTM"],
                    "FTP": stats["FTP"],
                    "ROFF": stats["ROFF"],
                    "RDEF": stats["RDEF"],
                    "RTOT": stats["RTOT"],
                    "AST": stats["AST"],
                    "BLK": stats["BLK"],
                    "STL": stats["STL"],
                    "TO": stats["Turnovers"],
                    "PTS": stats["PTS"],
                    "PF": stats["PF"],
                }

                gamestats.setdefault(stats["gamenumber"], []).append(games)
                playerstats.setdefault(stats["playername"], []).append(games)

            shots = db.execute(
                "SELECT * FROM shots WHERE gamenumber = ? AND seasonid =?", x, seasonid[0]["seasonid"])
            for shot in shots:
                gameshot = {
                    "gamenumber": shot["gamenumber"],
                    "x": shot["X"],
                    "y": shot["Y"],
                    "MakeorMiss": shot["MakeorMiss"],
                    "ShotType": shot["ShotType"],
                    "playername": shot["playername"],
                }
                gameshots.setdefault(shot["gamenumber"], []).append(gameshot)

            x += 1

        for playername, gamelist in playerstats.items():
            playerstattotal = {
                "FGM": sum(stat["FGM"] for stat in gamelist),
                "FGA": sum(stat["FGA"] for stat in gamelist),
                "FGP": statistics.mean([stat["FGP"] for stat in gamelist]),
                "TPM": sum(stat["TPM"] for stat in gamelist),
                "TPA": sum(stat["TPA"] for stat in gamelist),
                "TPP": statistics.mean([stat["TPP"] for stat in gamelist]),
                "FTA": sum(stat["FTA"] for stat in gamelist),
                "FTM": sum(stat["FTM"] for stat in gamelist),
                "FTP": statistics.mean([stat["FTP"] for stat in gamelist]),
                "ROFF": sum(stat["ROFF"] for stat in gamelist),
                "RDEF": sum(stat["RDEF"] for stat in gamelist),
                "RTOT": sum(stat["RTOT"] for stat in gamelist),
                "AST": sum(stat["AST"] for stat in gamelist),
                "BLK": sum(stat["BLK"] for stat in gamelist),
                "STL": sum(stat["STL"] for stat in gamelist),
                "TO": sum(stat["TO"] for stat in gamelist),
                "PTS": sum(stat["PTS"] for stat in gamelist),
                "PF": sum(stat["PF"] for stat in gamelist),
                "playername": playername,
            }
            playertotalstats[playername] = playerstattotal

            playerstatavg = {
                "FGM": statistics.mean(stat["FGM"] for stat in gamelist),
                "FGA": statistics.mean(stat["FGA"] for stat in gamelist),
                "FGP": playertotalstats[playername]["FGP"],
                "TPM": statistics.mean(stat["TPM"] for stat in gamelist),
                "TPA": statistics.mean(stat["TPA"] for stat in gamelist),
                "TPP": playertotalstats[playername]["TPP"],
                "FTA": statistics.mean(stat["FTA"] for stat in gamelist),
                "FTM": statistics.mean(stat["FTM"] for stat in gamelist),
                "FTP": playertotalstats[playername]["FTP"],
                "ROFF": statistics.mean(stat["ROFF"] for stat in gamelist),
                "RDEF": statistics.mean(stat["RDEF"] for stat in gamelist),
                "RTOT": statistics.mean(stat["RTOT"] for stat in gamelist),
                "AST": statistics.mean(stat["AST"] for stat in gamelist),
                "BLK": statistics.mean(stat["BLK"] for stat in gamelist),
                "STL": statistics.mean(stat["STL"] for stat in gamelist),
                "TO": statistics.mean(stat["TO"] for stat in gamelist),
                "PTS": statistics.mean(stat["PTS"] for stat in gamelist),
                "PF": statistics.mean(stat["PF"] for stat in gamelist),
                "playername": playername,
            }
            playerSeasonAverages[playername] = playerstatavg

        print(playerstats)
        seasonTeamStats = {
            "FGM": sum(stat["FGM"] for game in gamestats.values() for stat in game),
            "FGA": sum(stat["FGA"] for game in gamestats.values() for stat in game),
            "FGP": statistics.mean(stat["FGP"] for game in gamestats.values() for stat in game),
            "TPM": sum(stat["TPM"] for game in gamestats.values() for stat in game),
            "TPA": sum(stat["TPA"] for game in gamestats.values() for stat in game),
            "TPP": statistics.mean(stat["TPP"] for game in gamestats.values() for stat in game),
            "FTA": sum(stat["FTA"] for game in gamestats.values() for stat in game),
            "FTM": sum(stat["FTM"] for game in gamestats.values() for stat in game),
            "FTP": statistics.mean(stat["FTP"] for game in gamestats.values() for stat in game),
            "ROFF": sum(stat["ROFF"] for game in gamestats.values() for stat in game),
            "RDEF": sum(stat["RDEF"] for game in gamestats.values() for stat in game),
            "RTOT": sum(stat["RTOT"] for game in gamestats.values() for stat in game),
            "AST": sum(stat["AST"] for game in gamestats.values() for stat in game),
            "BLK": sum(stat["BLK"] for game in gamestats.values() for stat in game),
            "STL": sum(stat["STL"] for game in gamestats.values() for stat in game),
            "TO": sum(stat["TO"] for game in gamestats.values() for stat in game),
            "PTS": sum(stat["PTS"] for game in gamestats.values() for stat in game),
            "PF": sum(stat["PF"] for game in gamestats.values() for stat in game),
        }

        seasonTeamStatsPG = {
            "FGM": statistics.mean(stat["FGM"] for game in gamestats.values() for stat in game),
            "FGA": statistics.mean(stat["FGA"] for game in gamestats.values() for stat in game),
            "FGP": seasonTeamStats["FGP"],
            "TPM": statistics.mean(stat["TPM"] for game in gamestats.values() for stat in game),
            "TPA": statistics.mean(stat["TPA"] for game in gamestats.values() for stat in game),
            "TPP": seasonTeamStats["TPP"],
            "FTA": statistics.mean(stat["FTA"] for game in gamestats.values() for stat in game),
            "FTM": statistics.mean(stat["FTM"] for game in gamestats.values() for stat in game),
            "FTP": seasonTeamStats["FTP"],
            "ROFF": statistics.mean(stat["ROFF"] for game in gamestats.values() for stat in game),
            "RDEF": statistics.mean(stat["RDEF"] for game in gamestats.values() for stat in game),
            "RTOT": statistics.mean(stat["RTOT"] for game in gamestats.values() for stat in game),
            "AST": statistics.mean(stat["AST"] for game in gamestats.values() for stat in game),
            "BLK": statistics.mean(stat["BLK"] for game in gamestats.values() for stat in game),
            "STL": statistics.mean(stat["STL"] for game in gamestats.values() for stat in game),
            "TO": statistics.mean(stat["TO"] for game in gamestats.values() for stat in game),
            "PTS": statistics.mean(stat["PTS"] for game in gamestats.values() for stat in game),
            "PF": sum(stat["PF"] for game in gamestats.values() for stat in game),
        }
        print(seasonTeamStatsPG)
        print(seasonTeamStats)

        return render_template("seasonstats.html", playerSeasonAverages=playerSeasonAverages, playerstats=playertotalstats, season_name=season_name, gamestats=gamestats, seasongames=season_games, gameshots=gameshots, seasongamecount=seasongamecount, seasonTeamStats=seasonTeamStats, seasonTeamStatsPG=seasonTeamStatsPG)


@app.route("/newgame", methods=["GET", "POST"])
@login_required
def enterstats():

    if request.method == "POST":

        playersactive = []

        playeramount = request.form.get("playernumber")
        if int(playeramount) < 5:
            flash("Not enough players!")
            return render_template("enterplayers.html")

        currentseason = db.execute("SELECT id FROM season WHERE name = ?",
                                   session.get('season_game'))

        currentteam = db.execute("SELECT hashteam from users WHERE id = ?", session["user_id"])

        for players in range(int(playeramount)):

            playername = request.form.get(f"PlayerName{players}")
            playernumber = request.form.get(f"PlayerNumber{players}")
            enterplayers = {
                "playername": playername,
                "playernumber": playernumber,
                "seasonid": currentseason[0]["id"],
                "team": currentteam[0]["hashteam"],
            }
            if playername == None:
                flash("Player must have a name!")
                return render_template("enterplayers.html")

            if playernumber == None or int(playernumber) > 99 or int(playernumber) < 0:
                flash("Player must have a valid number!")
                return render_template("enterplayers.html")

            playersactive.append(enterplayers)

        for players in playersactive:

            player = db.execute("SELECT id FROM players WHERE playername = ? AND playernumber = ? AND teamid = ?",
                                players["playername"], players["playernumber"], players["team"])

            if len(player) != 1:
                db.execute("INSERT INTO players (playername, playernumber, teamid) VALUES (?, ?, ?)",
                           players["playername"], players["playernumber"], players["team"])

            db.execute("INSERT INTO gamestats (seasonid, hashteam, playerid, playername, gamenumber) VALUES (?, ?, ?, ?, ?)",
                       players["seasonid"], players["team"], players["playernumber"], players["playername"], session['gamescored'])

        return render_template("enterstats.html", activeplayers=playersactive)

    return render_template("enterplayers.html")


@app.route("/submitgame", methods=["GET", "POST"])
@login_required
def submitgame():

    if request.method == "POST":

        playerstats, shots = getjson()

        if playerstats is None or shots is None:
            return jsonify({'error': 'Invalid or missing JSON'}), 400

        activeseasonid = db.execute("SELECT id FROM season WHERE name = ?", session['season_game'])

        for player in playerstats:

            db.execute(
                "UPDATE gamestats SET FGM = ?, FGA = ?, FGP = ?, TPM = ?, TPA = ?, TPP = ?, FTM = ?, FTA = ?, FTP = ?, ROFF = ?, RDEF = ?, RTOT = ?, AST = ?, BLK = ?, STL = ?, Turnovers = ?, PTS = ?, PF = ? WHERE playername = ?",
                player['FGM'], player['FGA'], player['FGP'], player['TPM'], player['TPA'], player['TPP'], player['FTM'], player['FTA'], player['FTP'], player[
                    'OR'], player['DR'], player['TR'], player['Assist'], player['Block'], player['Steal'], player['Turnover'], player['PTS'], player['PF'], player['name']
            )

        for shot in shots:

            db.execute(
                "INSERT INTO shots (X, Y, ShotType, MakeorMiss, playername, seasonid, gamenumber) VALUES (?, ?, ?, ?, ?, ?, ?)",
                shot['x'], shot['y'], shot['ShotType'], shot['MakeorMiss'], shot['Playername'], activeseasonid[0]['id'], session['gamescored']
            )
        userseasons = db.execute(
            "SELECT name FROM season WHERE teamid IN (SELECT hashteam FROM users WHERE id = ?)",
            session["user_id"]
        )

        season_games = db.execute(
            "SELECT gameamount FROM season WHERE teamid IN (SELECT hashteam FROM users WHERE id = ?)",
            session["user_id"]
        )
        return render_template("homepage.html", userseasons=userseasons, seasongames=(season_games[0]["gameamount"]+1))

    activeseasonid = db.execute(
        "SELECT id FROM season WHERE name = ?", session['season_game']
    )
    activeplayers = db.execute(
        "SELECT playername, playerid FROM gamestats WHERE seasonid = ? AND WHERE gamenumber = ?",
        activeseasonid, session['gamescored']
    )
    print(session['season_game'])
    print(session['gamescored'])

    return render_template("enterstats.html", activeplayers=activeplayers)
# use axios instead for this shit


def getjson():
    data = request.get_json()
    if not data:
        return None, None

    playerstats = data.get('playerstats')
    shots = data.get('shots')

    print('Player Stats:', playerstats)
    print('Shots:', shots)
    print(request.headers)

    return playerstats, shots
