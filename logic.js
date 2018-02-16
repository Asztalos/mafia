	//Define variables
	var playerArray = [];
	var rolesArray = [];
	var randomArray = [];
	var numberOfPlayers = 0;//Set to 0
	var numberOfMafia = 0;//Set to 0
	var atemptedVictim = null;
	var protected = null;
	var investigated = null;
	var action = null;
	var victim = null;
	//Ask for number of players. Minimum is 5
	askNumberOfPlayers();
	
	//Ask for number of Mafia. Minimum is one
	askNumberOfMafia(); 
	
	//Ask if the prostitute should be included
	//TODO

	//Prompt user for Names of all players
	askPlayerNames();

	
	distributeRoles();
	alert('Roles have been randomised. Ready to play?')
	//Loop a round of the game over and over until some team wins
	while(gameOver() == false){
		getAlivePlayers(playerArray).forEach(playerRound)
		alert('You were the last player. Click to see the outcome of the night');
		displayNightOutcome();
		console.log('A new day is upon us');
		var atemptedVictim = null;
		var protected = null;
		var investigated = null;
		var action = null;
		var victim = null;
		daytimeActions();
	}
	if(getAlivePlayers(getPlayersByRole('Mafia')).length  <1){
		alert('The good team has won!')
	}
	else{
		alert('The evil team has won!')
	};