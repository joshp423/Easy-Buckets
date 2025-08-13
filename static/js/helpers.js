//records 2PM and adjusts stats on page
function M2P(shots, x, y, selectedplayer, allplayers, tablevalues, playerstats) {
    shots.push({
        x: x,
        y: y,
        ShotType: 2,
        MakeorMiss: "Make",
        Playername: selectedplayer,
    });
    undostack.push({
        StatType: 2,
        MakeorMiss: "Make",
        Playername: selectedplayer,
    })
    // chatGPT helped me with the filter
    result = playerstats.filter(playerstats => playerstats.name === selectedplayer)
    result[0].FGM += 1;
    result[0].FGA += 1;
    result[0].FGP = Math.round((result[0].FGM / result[0].FGA) * 100);
    result[0].PTS += 2;
    tablevalues.FGM.innerText = result[0].FGM;
    tablevalues.FGA.innerText = result[0].FGA;
    tablevalues.FGP.innerText = result[0].FGP + "%";
    tablevalues.PTS.innerText = result[0].PTS;
}
//records 3PM and adjusts stats on page
function M3P(shots, x, y, selectedplayer, allplayers, tablevalues, playerstats) {
    shots.push({
        x: x,
        y: y,
        ShotType: 3,
        MakeorMiss: "Make",
        Playername: selectedplayer,
    });
    undostack.push({
        StatType: 3,
        MakeorMiss: "Make",
        Playername: selectedplayer,
    });
    result = playerstats.filter(playerstats => playerstats.name === selectedplayer)
    result[0].FGM += 1;
    result[0].FGA += 1;
    result[0].FGP = Math.round((result[0].FGM / result[0].FGA) * 100);
    result[0].PTS += 3;
    result[0].TPM += 1;
    result[0].TPA += 1;
    result[0].TPP = Math.round((result[0].TPM / result[0].TPA) * 100);
    tablevalues.FGM.innerText = result[0].FGM;
    tablevalues.FGA.innerText = result[0].FGA;
    tablevalues.FGP.innerText = result[0].FGP + "%";
    tablevalues.PTS.innerText = result[0].PTS;
    tablevalues.TPM.innerText = result[0].TPM;
    tablevalues.TPA.innerText = result[0].TPA;
    tablevalues.TPP.innerText = result[0].TPP + "%";
}
//marks makes on the court image
function markmakeenter(newmake, makelist, x, y) {
    const court = document.getElementById('courtimage');
    const xReactive = x * court.clientWidth;
    const yReactive = y * court.clientHeight;
    newmake.classList.add('fa-solid');
    newmake.classList.add('fa-circle');
    newmake.classList.add('makeicon');
    newmake.style.color = '#04d708';
    newmake.style.position = 'absolute';
    newmake.style.left = xReactive + "px";
    newmake.style.top = yReactive + "px";
    basketballcourt.appendChild(newmake);
    makelist.push(newmake)
}
//records 2PMiss and adjusts stats on page
function Miss2P(shots, x, y, selectedplayer, allplayers, tablevalues, playerstats, undostack) {
    shots.push({
        x: x,
        y: y,
        ShotType: 2,
        MakeorMiss: "Miss",
        Playername: selectedplayer,
    });
    undostack.push({
        StatType: 2,
        MakeorMiss: "Miss",
        Playername: selectedplayer,
    });
    result = playerstats.filter(playerstats => playerstats.name === selectedplayer);
    result[0].FGA += 1;
    result[0].FGP = Math.round((result[0].FGM / result[0].FGA) * 100);
    tablevalues.FGA.innerText = result[0].FGA;
    tablevalues.FGP.innerText = result[0].FGP + "%";
}
//records 3PMiss and adjusts stats on page
function Miss3P(shots, x, y, selectedplayer, allplayers, tablevalues, playerstats, undostack) {
    shots.push({
        x: x,
        y: y,
        ShotType: 3,
        MakeorMiss: "Miss",
        Playername: selectedplayer,
    });
    undostack.push({
        StatType: 3,
        MakeorMiss: "Miss",
        Playername: selectedplayer,
    });
    result = playerstats.filter(playerstats => playerstats.name === selectedplayer)
    result[0].FGA += 1;
    result[0].FGP = Math.round((result[0].FGM / result[0].FGA) * 100);
    result[0].TPA += 1;
    result[0].TPP = Math.round((result[0].TPM / result[0].TPA) * 100);
    tablevalues.FGA.innerText = result[0].FGA;
    tablevalues.FGP.innerText = result[0].FGP + "%";
    tablevalues.TPA.innerText = result[0].TPA;
    tablevalues.TPP.innerText = result[0].TPP + "%";
}
//marks miss on the court image on enterstats
function markmissenter(newmiss, misslist, x, y) {
    const court = document.getElementById('courtimage');
    const xReactive = x * court.clientWidth;
    const yReactive = y * court.clientHeight;
    newmiss.classList.add('fa-solid');
    newmiss.classList.add('fa-xmark');
    newmiss.classList.add('makeicon');
    newmiss.style.color = '#d40c0c';
    newmiss.style.position = 'absolute';
    newmiss.style.left = xReactive + "px";
    newmiss.style.top = yReactive + "px";
    basketballcourt.appendChild(newmiss);
    misslist.push(newmiss)

}
// updates tablevalues depending on the player selected
function updateTableValues(tablevalues, selectedplayer) {

    tablevalues.FGM = document.getElementById('FGMT-' + selectedplayer);
    tablevalues.FGA = document.getElementById('FGAT-' + selectedplayer);
    tablevalues.FGM = document.getElementById('FGMT-' + selectedplayer);
    tablevalues.FGA = document.getElementById('FGAT-' + selectedplayer);
    tablevalues.FGP = document.getElementById('FG%T-' + selectedplayer);
    tablevalues.TPM = document.getElementById('3PMT-' + selectedplayer);
    tablevalues.TPA = document.getElementById('3PAT-' + selectedplayer);
    tablevalues.TPP = document.getElementById('3P%T-' + selectedplayer);
    tablevalues.FTM = document.getElementById('FTMT-' + selectedplayer);
    tablevalues.FTA = document.getElementById('FTAT-' + selectedplayer);
    tablevalues.FTP = document.getElementById('FT%T-' + selectedplayer);
    tablevalues.PTS = document.getElementById('PTST-' + selectedplayer);
    tablevalues.OR = document.getElementById('R-OFFT-' + selectedplayer);
    tablevalues.DR = document.getElementById('R-DEFT-' + selectedplayer);
    tablevalues.TR = document.getElementById('R-TOTT-' + selectedplayer);
    tablevalues.Assist = document.getElementById('ASTT-' + selectedplayer);
    tablevalues.Block = document.getElementById('BLKT-' + selectedplayer);
    tablevalues.Steal = document.getElementById('STLT-' + selectedplayer);
    tablevalues.Turnover = document.getElementById('TOT-' + selectedplayer);
    tablevalues.PF = document.getElementById('PFT-' + selectedplayer);
}
//records non-placeable stats and adjusts stats on page
function staticstats(playerstats, selectedplayer, tablevalues) {
    selectedstat = event.target.getAttribute('id');
    result = playerstats.filter(playerstats => playerstats.name === selectedplayer)
    if (selectedstat === "FTMake" || selectedstat === "FTMiss") {
        if (selectedstat === "FTMake") {
            result[0].FTM += 1;
            result[0].FTA += 1;
            result[0].FTP = Math.round((result[0].FTM / result[0].FTA) * 100);
            result[0].PTS += 1
            tablevalues.FTM.innerText = result[0].FTM;
            tablevalues.FTA.innerText = result[0].FTA;
            tablevalues.FTP.innerText = result[0].FTP + "%";
            tablevalues.PTS.innerText = result[0].PTS;
            undostack.push({
                StatType: 1,
                MakeorMiss: "Make",
                Playername: selectedplayer,
            });
            return;
        }
        result[0].FTA += 1;
        result[0].FTP = Math.round((result[0].FTM / result[0].FTA) * 100);
        tablevalues.FTA.innerText = result[0].FTA;
        tablevalues.FTP.innerText = result[0].FTP + "%";
        undostack.push({
            StatType: 1,
            MakeorMiss: "Miss",
            Playername: selectedplayer,
        });
        return;
    }
    if (selectedstat === "O-Reb" || selectedstat === "D-Reb") {
        if (selectedstat === "O-Reb") {
            result[0].OR += 1;
            result[0].TR += 1;
            tablevalues.OR.innerText = result[0].OR;
            tablevalues.TR.innerText = result[0].TR;
            undostack.push({
                StatType: "O-Reb",
                MakeorMiss: "",
                Playername: selectedplayer,
            });
            return;
        }
        result[0].DR += 1;
        result[0].TR += 1;
        tablevalues.DR.innerText = result[0].OR;
        tablevalues.TR.innerText = result[0].TR;
        undostack.push({
            StatType: "D-Reb",
            MakeorMiss: "",
            Playername: selectedplayer,
        });
        return;
    }
    for (stat in result[0]) {
        if (stat === selectedstat) {
            result[0][stat] += 1;
            tablevalues[stat].innerText = result[0][stat];
            undostack.push({
                StatType: stat,
                MakeorMiss: "",
                Playername: selectedplayer,
            });
        }
    }
}
//undo button functionality
function undolast(misslist, makelist, undostack, playerstats, tablevalues, basketballcourt, redostack, missredo, makeredo, undoshots, shots) {

    let lastAction = undostack.pop();
    if (!lastAction) return;
    let result = playerstats.filter(player => player.name === lastAction.Playername);

    redostack.push(lastAction);
    if (lastAction.MakeorMiss === "Miss") {
        let misslistlast = misslist.pop();
        missredo.push(misslistlast);
        if (lastAction.StatType === 3) {
            result[0].FGA -= 1;
            result[0].FGP = Math.round((result[0].FGM / result[0].FGA) * 100);
            if (result[0].FGA === 0 || result[0].FGM === 0) {
                result[0].FGP = 0
            }
            result[0].TPA -= 1;
            result[0].TPP = Math.round((result[0].TPM / result[0].TPA) * 100);
            if (result[0].TPA === 0 || result[0].TPM === 0) {
                result[0].TPP = 0
            }
            tablevalues.FGA.innerText = result[0].FGA;
            tablevalues.FGP.innerText = result[0].FGP + "%";
            tablevalues.TPA.innerText = result[0].TPA;
            tablevalues.TPP.innerText = result[0].TPP + "%";
            undoshots.push(shots.pop())
            basketballcourt.removeChild(misslistlast)
            return;
        }
        if (lastAction.StatType === 2) {
            result[0].FGA -= 1;
            result[0].FGP = Math.round((result[0].FGM / result[0].FGA) * 100);
            if (result[0].FGA === 0 || result[0].FGM === 0) {
                result[0].FGP = 0
            }
            tablevalues.FGA.innerText = result[0].FGA;
            tablevalues.FGP.innerText = result[0].FGP + "%";
            undoshots.push(shots.pop())
            basketballcourt.removeChild(misslistlast)
            return;
        }
        result[0].FTA -= 1;
        result[0].FTP = Math.round((result[0].FTM / result[0].FTA) * 100);
        if (result[0].FTA === 0 || result[0].FTM === 0) {
            result[0].FTP = 0
        }
        tablevalues.FTA.innerText = result[0].FTA;
        tablevalues.FTP.innerText = result[0].FTP + "%";
        return;
    } else if (lastAction.MakeorMiss === "Make") {
        let makelistlast = makelist.pop();
        makeredo.push(makelistlast);
        if (lastAction.StatType === 3) {
            result[0].FGM -= 1;
            result[0].FGA -= 1;
            result[0].FGP = Math.round((result[0].FGM / result[0].FGA) * 100);
            if (result[0].FGA === 0 || result[0].FGM === 0) {
                result[0].FGP = 0
            }
            result[0].PTS -= 3;
            result[0].TPM -= 1;
            result[0].TPA -= 1;
            result[0].TPP = Math.round((result[0].TPM / result[0].TPA) * 100);
            if (result[0].TPA === 0 || result[0].TPM === 0) {
                result[0].TPP = 0
            }
            tablevalues.FGM.innerText = result[0].FGM;
            tablevalues.FGA.innerText = result[0].FGA;
            tablevalues.FGP.innerText = result[0].FGP + "%";
            tablevalues.PTS.innerText = result[0].PTS;
            tablevalues.TPM.innerText = result[0].TPM;
            tablevalues.TPA.innerText = result[0].TPA;
            tablevalues.TPP.innerText = result[0].TPP + "%";
            undoshots.push(shots.pop())
            basketballcourt.removeChild(makelistlast)
            return;
        }
        if (lastAction.StatType === 2) {
            result[0].FGM -= 1;
            result[0].FGA -= 1;
            result[0].FGP = Math.round((result[0].FGM / result[0].FGA) * 100);
            if (result[0].FGA === 0 || result[0].FGM === 0) {
                result[0].FGP = 0
            }
            result[0].PTS -= 2;
            tablevalues.FGM.innerText = result[0].FGM;
            tablevalues.FGA.innerText = result[0].FGA;
            tablevalues.FGP.innerText = result[0].FGP + "%";
            tablevalues.PTS.innerText = result[0].PTS;
            undoshots.push(shots.pop())
            basketballcourt.removeChild(makelistlast)
            return;
        }
        result[0].FTM -= 1;
        result[0].FTA -= 1;
        result[0].FTP = Math.round((result[0].FTM / result[0].FTA) * 100);
        if (result[0].FTA === 0 || result[0].FTM === 0) {
            result[0].FTP = 0
        }
        result[0].PTS -= 1;
        tablevalues.FTM.innerText = result[0].FTM;
        tablevalues.FTA.innerText = result[0].FTA;
        tablevalues.FTP.innerText = result[0].FTP + "%";
        tablevalues.PTS.innerText = result[0].PTS;
        return;
    }
    if (lastAction.StatType === "O-Reb") {
        result[0].OR -= 1;
        result[0].TR -= 1;
        tablevalues.OR.innerText = result[0].OR;
        tablevalues.TR.innerText = result[0].TR;
        return;
    } else if (lastAction.StatType === "D-Reb") {
        result[0].DR -= 1;
        result[0].TR -= 1;
        tablevalues.DR.innerText = result[0].DR;
        tablevalues.TR.innerText = result[0].TR;
        return;
    }
    for (stat in result[0]) {
        if (stat === lastAction.StatType) {
            result[0][stat] -= 1;
            tablevalues[stat].innerText = result[0][stat];
        }
    }
}
//redo button functionality
function redolast(misslist, makelist, undostack, playerstats, tablevalues, basketballcourt, redostack, missredo, makeredo, undoshots, shots) {
    let redoAction = redostack.pop();
    if (!redoAction) return;
    let result = playerstats.filter(player => player.name === redoAction.Playername);

    if (redoAction.MakeorMiss === "Miss") {
        let misslistlast = missredo.pop();
        misslist.push(misslistlast);
        if (redoAction.StatType === 3) {
            result[0].FGA += 1;
            result[0].FGP = Math.round((result[0].FGM / result[0].FGA) * 100);
            if (result[0].FGA === 0 || result[0].FGM === 0) {
                result[0].FGP = 0
            }
            result[0].TPA += 1;
            result[0].TPP = Math.round((result[0].TPM / result[0].TPA) * 100);
            if (result[0].TPA === 0 || result[0].TPM === 0) {
                result[0].TPP = 0
            }
            tablevalues.FGA.innerText = result[0].FGA;
            tablevalues.FGP.innerText = result[0].FGP + "%";
            tablevalues.TPA.innerText = result[0].TPA;
            tablevalues.TPP.innerText = result[0].TPP + "%";
            shots.push(undoshots.pop())
            undostack.push({
                StatType: 3,
                MakeorMiss: "Miss",
                Playername: selectedplayer,
            });
            basketballcourt.appendChild(misslistlast)
            return;
        }
        if (redoAction.StatType === 2) {
            result[0].FGA += 1;
            result[0].FGP = Math.round((result[0].FGM / result[0].FGA) * 100);
            if (result[0].FGA === 0 || result[0].FGM === 0) {
                result[0].FGP = 0
            }
            tablevalues.FGA.innerText = result[0].FGA;
            tablevalues.FGP.innerText = result[0].FGP + "%";
            shots.push(undoshots.pop())
            undostack.push({
                StatType: 2,
                MakeorMiss: "Miss",
                Playername: selectedplayer,
            });
            basketballcourt.appendChild(misslistlast)
            return;
        }
        result[0].FTA += 1;
        result[0].FTP = Math.round((result[0].FTM / result[0].FTA) * 100);
        if (result[0].FTA === 0 || result[0].FTM === 0) {
            result[0].FTP = 0
        }
        tablevalues.FTA.innerText = result[0].FTA;
        tablevalues.FTP.innerText = result[0].FTP + "%";
        undostack.push({
            StatType: 1,
            MakeorMiss: "Miss",
            Playername: selectedplayer,
        });
        return;
    }
    if (redoAction.MakeorMiss === "Make") {
        let makelistlast = makeredo.pop();
        makelist.push(makelistlast);
        if (redoAction.StatType === 3) {
            result[0].FGM += 1;
            result[0].FGA += 1;
            result[0].FGP = Math.round((result[0].FGM / result[0].FGA) * 100);
            if (result[0].FGA === 0 || result[0].FGM === 0) {
                result[0].FGP = 0
            }
            result[0].PTS += 3;
            result[0].TPM += 1;
            result[0].TPA += 1;
            result[0].TPP = Math.round((result[0].TPM / result[0].TPA) * 100);
            if (result[0].TPA === 0 || result[0].TPM === 0) {
                result[0].TPP = 0
            }
            tablevalues.FGM.innerText = result[0].FGM;
            tablevalues.FGA.innerText = result[0].FGA;
            tablevalues.FGP.innerText = result[0].FGP + "%";
            tablevalues.PTS.innerText = result[0].PTS;
            tablevalues.TPM.innerText = result[0].TPM;
            tablevalues.TPA.innerText = result[0].TPA;
            tablevalues.TPP.innerText = result[0].TPP + "%";
            shots.push(undoshots.pop())
            undostack.push({
                StatType: 3,
                MakeorMiss: "Make",
                Playername: redoAction.Playername,
            });
            basketballcourt.appendChild(makelistlast)
            return;
        }
        if (redoAction.StatType === 2) {
            result[0].FGM += 1;
            result[0].FGA += 1;
            result[0].FGP = Math.round((result[0].FGM / result[0].FGA) * 100);
            if (result[0].FGA === 0 || result[0].FGM === 0) {
                result[0].FGP = 0
            }
            result[0].PTS += 2;
            tablevalues.FGM.innerText = result[0].FGM;
            tablevalues.FGA.innerText = result[0].FGA;
            tablevalues.FGP.innerText = result[0].FGP + "%";
            tablevalues.PTS.innerText = result[0].PTS;
            shots.push(undoshots.pop())
            undostack.push({
                StatType: 2,
                MakeorMiss: "Make",
                Playername: redoAction.Playername,
            })

            basketballcourt.appendChild(makelistlast)
            return;
        }
        result[0].FTM += 1;
        result[0].FTA += 1;
        result[0].FTP = Math.round((result[0].FTM / result[0].FTA) * 100);
        if (result[0].FTA === 0 || result[0].FTM === 0) {
            result[0].FTP = 0
        }
        result[0].PTS += 1;
        tablevalues.FTM.innerText = result[0].FTM;
        tablevalues.FTA.innerText = result[0].FTA;
        tablevalues.FTP.innerText = result[0].FTP + "%";
        tablevalues.PTS.innerText = result[0].PTS;
        undostack.push({
            StatType: 1,
            MakeorMiss: "Make",
            Playername: redoAction.Playername,
        });
        return;
    }
    if (redoAction.StatType === "O-Reb") {
        result[0].OR += 1;
        result[0].TR += 1;
        tablevalues.OR.innerText = result[0].OR;
        tablevalues.TR.innerText = result[0].TR;
        undostack.push({
            StatType: "O-Reb",
            MakeorMiss: "",
            Playername: redoAction.Playername,
        });
        return;
    } else if (redoAction.StatType === "D-Reb") {
        result[0].DR += 1;
        result[0].TR += 1;
        tablevalues.DR.innerText = result[0].DR;
        tablevalues.TR.innerText = result[0].TR;
        undostack.push({
            StatType: "D-Reb",
            MakeorMiss: "",
            Playername: redoAction.Playername,
        });
        return;
    }
    for (stat in result[0]) {
        if (stat === redoAction.StatType) {
            result[0][stat] += 1;
            tablevalues[stat].innerText = result[0][stat];
            undostack.push({
                StatType: stat,
                MakeorMiss: "",
                Playername: redoAction.Playername,
            });
        }
    }
}
//tab functionality on view stats page
function sectionselect(event, shots) {
    const ts = document.getElementById('ts');
    const g = document.getElementById('g');
    const is = document.getElementById('is');
    const teamStatsText = document.getElementById('teamStats');
    const gamesText = document.getElementById('games');
    const individualStatsText = document.getElementById('individualStats');
    const individualStatsSection = document.getElementById('individualStatsSection');
    const teamStatsSection = document.getElementById('teamStatsSection');
    const gameStatsSection = document.getElementById('gameStatsSection');
    selectedtab = event.currentTarget.getAttribute('id');
    if (event.currentTarget.classList.contains('is-active') === true) {
        return;
    }
    switch (selectedtab) {
        case "ts":
            ts.classList.add('is-active');
            g.classList.remove('is-active');
            is.classList.remove('is-active');
            teamStatsText.classList.add('has-text-primary');
            gamesText.classList.remove('has-text-primary');
            individualStatsText.classList.remove('has-text-primary');
            teamStatsSection.classList.remove('is-hidden');
            gameStatsSection.classList.add('is-hidden');
            individualStatsSection.classList.add('is-hidden');
            break;

        case "g":
            g.classList.add('is-active');
            is.classList.remove('is-active');
            ts.classList.remove('is-active');
            teamStatsText.classList.remove('has-text-primary')
            gamesText.classList.add('has-text-primary')
            individualStatsText.classList.remove('has-text-primary')
            teamStatsSection.classList.add('is-hidden');
            gameStatsSection.classList.remove('is-hidden');
            individualStatsSection.classList.add('is-hidden');

            // if shots is defined and user has clicked this tab set timer to 100ms then run function - used chatGPT and duck to help figure this out
            if (shots && !shotsRendered) {
                setTimeout(() => {
                    renderShots(shots);
                    shotsRendered = true;
                }, 100);
            }
            break;

        case "is":
            is.classList.add('is-active');
            g.classList.remove('is-active');
            ts.classList.remove('is-active');
            teamStatsText.classList.remove('has-text-primary')
            gamesText.classList.remove('has-text-primary')
            individualStatsText.classList.add('has-text-primary')
            teamStatsSection.classList.add('is-hidden');
            gameStatsSection.classList.add('is-hidden');
            individualStatsSection.classList.remove('is-hidden');
            break;
    }
}

//render the shots when the image is selected(loaded)
function renderShots(shots) {
    for (let gameNumber in shots) {
        const basketballcourt = document.getElementById('basketballcourt' + gameNumber);
        const courtimage = document.getElementById('courtimage' + gameNumber);
        console.log(gameNumber)
        const gameShots = shots[gameNumber];

        for (let shot of gameShots) {
            const newmake = document.createElement('i');
            const newmiss = document.createElement('i');
            const x = shot.x;
            const y = shot.y;

            if (shot.MakeorMiss === "Make") {
                markmakedisplay(basketballcourt, courtimage, newmake, x, y)
            } else {
                markmissdisplay(basketballcourt, courtimage, newmiss, x, y)
            }
        }
    }
}

//marks makes on the court image
function markmakedisplay(basketballcourt, courtimage, newmake, x, y) {
    const xReactive = x * courtimage.clientWidth;
    const yReactive = y * courtimage.clientHeight;
    newmake.classList.add('fa-solid');
    newmake.classList.add('fa-circle');
    newmake.classList.add('makeicon');
    newmake.style.color = '#04d708';
    newmake.style.position = 'absolute';
    newmake.style.left = xReactive + "px";
    newmake.style.top = yReactive + "px";
    basketballcourt.appendChild(newmake);
    console.log(xReactive)
    console.log(yReactive)
}

//marks miss on the court image on enterstats
function markmissdisplay(basketballcourt, courtimage, newmiss, x, y) {
    const xReactive = x * courtimage.clientWidth;
    const yReactive = y * courtimage.clientHeight;
    newmiss.classList.add('fa-solid');
    newmiss.classList.add('fa-xmark');
    newmiss.classList.add('makeicon');
    newmiss.style.color = '#d40c0c';
    newmiss.style.position = 'absolute';
    newmiss.style.left = xReactive + "px";
    newmiss.style.top = yReactive + "px";
    basketballcourt.appendChild(newmiss);
}

function renderShotsSeason(shots) {
    for (let gameNumber in shots) {
        const basketballcourt = document.getElementById('basketballcourtseason');
        const courtimage = document.getElementById('courtimageseason');

        if (!basketballcourt || !courtimage) return;

        console.log(gameNumber)
        const gameShots = shots[gameNumber];

        for (let shot of gameShots) {
            const newmake = document.createElement('i');
            const newmiss = document.createElement('i');
            const x = shot.x;
            const y = shot.y;

            if (shot.MakeorMiss === "Make") {
                markmakedisplay(basketballcourt, courtimage, newmake, x, y)
            } else {
                markmissdisplay(basketballcourt, courtimage, newmiss, x, y)
            }
        }
    }
}
