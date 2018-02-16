

	//Functions
function playerRound(player, index){
	alert(player.name +' is up next. Hand over the computer')
	alert(player.name +', are you ready?');
	switch(player.role){
		case 'Mafia':
			mafiaAction(player);
			break;
		case 'Farmer':
			farmerAction(player);
			break;
		case 'Sheriff':
			sheriffAction(player);
			break;
		case 'Doctor':
			doctorAction(player);
			break;
	};
}
function namesOfPlayers(playerArray){
	return playerArray.map(player => player.name)
}
//f=1
function mafiaAction(player){
	alert(player.name +', you have been given the role of ' + player.role+'! '+ stringListOfRole('Mafia') + ' are the Mafia');
	if (atemptedVictim != null) {
		alert(atemptedVictim + ' was choosen to be murdered by your companion');
		prompt('You must type something, so other players cannot tell you apart');
	}
	while(atemptedVictim == null){
		input = prompt('Write the name of a player you would like to kill.')
		console.log(player.name + ' choose to atempt a murder of '+ input);
		if(acceptableInput(input) == true){
			atemptedVictim = input;
		}
	}
	
};
function acceptableInput(input){
	if (namesOfPlayers(playerArray).includes(input)) {
		return true
	}
	else {
		return false
	}

		;
}
function doctorAction(player){
	alert(player.name +', you have been given the role of ' + player.role+'!');
	while(protected == null){
		input = prompt('Who would you like to protect?')
		console.log(player.name + ' choose to protect '+ input);
		if(acceptableInput(input) == true){
			protected = input;
			break;
		}
	}	
};
function sheriffAction(player){
	alert(player.name +', you have been given the role of ' + player.role+'!');
	while(investigated == null){
		input = prompt('Who would you like to investigate?')
		console.log('You choose to investigate '+ input);
		if(acceptableInput(input) == true){
			investigated = input;
			team = getTeamByRole(getPlayerByName(investigated)[0].role)
			alert(investigated + ' is ' + team);
		}

	}
};
function getTeamByRole(role){
	if(role=='Mafia')
				{
					return 'Mafia'
				}
				else{
					return 'on the good team'
				}
};

function farmerAction(player){
	alert(player.name +', you have been given the role of ' + player.role+'!');
	prompt('You must type something, so other players cannot tell you apart');
}
function getPlayersByRole(role){
	return playerArray.filter(player => player.role === role);	
};
function getPlayerByName(name){
	return playerArray.filter(player => player.name === name);	
};
function getAlivePlayers(array){
	return array.filter(player => player.dead != true);		
}
function stringListOfRole(role){
	return getPlayersByRole(role).map(player => player.name).join(' and ');
};
function giveRole(item, index){
		playerArray[index].role = rolesArray[index];
	};
function askNumberOfPlayers(){
	while(numberOfPlayers<5){
		numberOfPlayers = parseInt(prompt('How many players are you?'));
		console.log(numberOfPlayers+' players');
	};
	console.log('An accepted number of players has been chosen');
};
function askNumberOfMafia(){
	while(numberOfMafia<1 || numberOfMafia>numberOfPlayers-3){
		numberOfMafia = parseInt(prompt('How many Mafia do you want?'));
		console.log(numberOfMafia+' mafia');
	};
	console.log('An accepted number of mafia has been chosen');
};
function distributeRoles(){
	//Create an array of corresponding length populated with the roles
	
	//Create placeholder array of correct length and set all values to farmer
	rolesArray = Array(numberOfPlayers).fill('Farmer');
	//console.log(rolesArray);
	//console.log('Created placeholder roles array');
	//Set the non varible roles
	rolesArray[0]='Doctor';
	rolesArray[1]='Sheriff';
	//Set the chosen number of mafia
	rolesArray.fill('Mafia',2,2+numberOfMafia);
	//console.log(rolesArray);
	//Scramble roles
    for (let i = rolesArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [rolesArray[i], rolesArray[j]] = [rolesArray[j], rolesArray[i]];
    }
    //console.log('Scrambled roles, see result below');
    //console.log(rolesArray);

    //Distribute roles to the actual players, by the order of the scrambled array
    
    playerArray.forEach(giveRole);
    console.log('Assigned roles, see result below');
	console.log(playerArray);
};
function getPlayerIndexByName(name){
	return playerArray.findIndex(player => player.name === name);	
};
function displayNightOutcome(){
	if (atemptedVictim != protected) {
		alert(atemptedVictim + ' was killed during the night');
		//Set a dead status to the killed player
		playerIndex = getPlayerIndexByName(atemptedVictim);
		playerArray[playerIndex].dead = true
		playerArray.find(function(){
		})
	}
	else{
		alert('There was a murder atempt during the night!')
	}
};

function askPlayerNames(){
	for (var i = 0; i <= numberOfPlayers-1; i++) {
		j=i+1;
		playername = prompt('Name of player '+j+':');
		playerArray[i] = {name: playername}
		console.log(playername+' was given as name for player '+j);
	};
	//playerArray = [{name:'Richard'},{name:'Stina'},{name:'Anders'},{name:'Adam'},{name:'Jenny'},];
	console.log('All players names fetched, see below');
	console.log(playerArray);
};

function daytimeActions(){
	while (action == null){
			console.log('action has not been set, showing options')
			actionInput = prompt('Choose the next action: sleep or kill');
			if(actionInput=='sleep'){
				action='sleep'
			}
			else if(actionInput=='kill'){
				action='kill'
				while(victim == null){
					input = prompt('Who was killed?');
					if (acceptableInput(input)){
						victim = input
						playerIndex = getPlayerIndexByName(victim);
						playerArray[playerIndex].dead = true
					};
				};
			}
			else{
				console.log('Non-acceptable input was supplied. New loop should follow');
			}
		}
	};
function gameOver(){
	return !(getAlivePlayers(getPlayersByRole('Mafia')).length > 0 & getAlivePlayers(getPlayersByRole('Mafia')).length < getAlivePlayers(getPlayersByRole('Farmer')).length + getAlivePlayers(getPlayersByRole('Doctor')).length + getAlivePlayers(getPlayersByRole('Sheriff')).length)
};
function dummyAlert(){
	alert('You triggered the dummy alert');
}