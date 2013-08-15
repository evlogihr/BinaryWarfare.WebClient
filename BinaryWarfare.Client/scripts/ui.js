var ui = (function () {

	function buildLoginForm() {
		var html =
            '<div id="login-form-holder">' +
				'<form>' +
					'<div id="login-form">' +
						'<label for="tb-login-username">Username: </label>' +
						'<input type="text" id="tb-login-username"><br />' +
						'<label for="tb-login-password">Password: </label>' +
						'<input type="text" id="tb-login-password"><br />' +
						'<button id="btn-login" class="button">Login</button>' +
					'</div>' +
					'<div id="register-form" style="display: none">' +
						'<label for="tb-register-username">Username: </label>' +
						'<input type="text" id="tb-register-username"><br />' +
						'<label for="tb-register-password">Password: </label>' +
						'<input type="text" id="tb-register-password"><br />' +
						'<button id="btn-register" class="button">Register</button>' +
					'</div>' +
					'<a href="#" id="btn-show-login" class="button selected">Login</a>' +
					'<a href="#" id="btn-show-register" class="button">Register</a>' +
				'</form>' +
				'<div id="error-messages"></div>' +
            '</div>';
		return html;
	}

	function buildGameUI(nickname, money) {
	    var html = '<span id="user-nickname">' +
				nickname +
		'</span>' +
		'<button id="btn-logout">Logout</button><br/>' +
        '<span>Money: ' + money + '</span>' +
		'<h1> Welcome to Binary Warfare </h1>' +
        '<a href="#">Visit our tutorial page</a>' +
        '<div id="error-messages"></div>' +
        '<nav id="main-tools" class="widget-box width-normal">' +
        '<ul> ' +
        '<li><button id="btn-buildings" class="active">Buildings</button></li>' +
        '<li><button id="btn-units">Slaves</button></li>' +
        '<li><button>Attack</button></li>' +
        '</ul>' +
        '</nav>';
		return html;
	}

	function buildOpenGamesList(games) {
		var list = '<ul class="game-list open-games">';
		for (var i = 0; i < games.length; i++) {
			var game = games[i];
			list +=
				'<li data-game-id="' + game.id + '">' +
					'<a href="#" >' +
						$("<div />").html(game.title).text() +
					'</a>' +
					'<span> by ' +
						game.creatorNickname +
					'</span>' +
				'</li>';
		}
		list += "</ul>";
		return list;
	}

	function buildGameState(gameState) {
		var html =
			'<div id="game-state" data-game-id="' + gameState.id + '">' +
				'<h2>' + gameState.title + '</h2>' +
				'<div id="blue-guesses" class="guess-holder">' +
					'<h3>' +
						gameState.blue + '\'s gueesses' +
					'</h3>' +
					buildGuessTable(gameState.blueGuesses) +
				'</div>' +
				'<div id="red-guesses" class="guess-holder">' +
					'<h3>' +
						gameState.red + '\'s gueesses' +
					'</h3>' +
					buildGuessTable(gameState.redGuesses) +
				'</div>' +
		'</div>';
		return html;
	}
	
	function buildMessagesList(messages) {
		var list = '<ul class="messages-list">';
		var msg;
		for (var i = 0; i < messages.length; i += 1) {
			msg = messages[i];
			var item =
				'<li>' +
					'<a href="#" class="message-state-' + msg.state + '">' +
						msg.text +
					'</a>' +
				'</li>';
			list += item;
		}
		list += '</ul>';
		return list;
	}

	function buildUnitsPage(squads) {
	    var list = '';
	    for (var i = 0; i < squads.length; i++) {
	        list += '<h2 data-squad-id='+ squads[i].id +'>' + squads[i].name + '</h2>' +
            '<button style="display: block" class="moveToSquad">Move slaves to the squad</button>';
	        for (var j = 0; j < squads[i].units.length; j++) {
	            list += '<div class="unit" data-unit-id="' + squads[i].units[j].id + '">' +
                    '<img src="../images/indian.jpg"/ width="50" height="50">'
                list += 'H4ckPower : <span>' + squads[i].units[j].attack + '</span>';
                list += 'SecuritySkillz : <span>' + squads[i].units[j].defence + '</span>';
                list += 'M0N3Y! : <span>' + squads[i].units[j].income + '/h</span>';
                if (squads[i].units[j].busy) {
                    list += '<p>status : <span>on a mission</span></p>'
                }
                list += 'select unit : <input type="checkbox"/></br>';
                list += '</div>';
            }
	    }

	    return list;
	}

	function buildBuildingsPage(buildings) {
	    var list = '';
	    for (var i = 0; i < buildings.length; i++) {
	        if (buildings[i].name == "academy") {
	            list += '<div class="building-holder">';
	            list += '<img src="../images/academy.jpg"/ width="150" height="150">';
	            list += '<p>Academy Building - level ' + buildings[i].level + '</br>';
	            if (buildings[i].level > 0) {
	                var nextLevel = parseInt(buildings[i].level) + 1;
	                list += '<button>Upgrade to level ' + nextLevel + '</button>';
	            }
	            else {
                    list += '<button>Create building</button>'
	            }
	            list += '</div>';
	        }

	        else if (buildings[i].name == "C# Yard") {
	            list += '<div class="building-holder">';
	            list += '<img src="../images/academy.jpg"/ width="150" height="150">';
	            list += '<p>C# Yard - level ' + buildings[i].level + '</br>';
	            if (buildings[i].level > 0) {
	                var nextLevel = parseInt(buildings[i].level) + 1;
	                list += '<button>Upgrade to level ' + nextLevel + '</button>';
	            }
	            else {
	                list += '<button>Create building</button>'
	            }
	            list += '</div>';
	        }
	    }

	    return list;
	}

	return {
		gameUI: buildGameUI,
		openGamesList: buildOpenGamesList,
		loginForm: buildLoginForm,
		gameState: buildGameState,
		unitsPage: buildUnitsPage,
        buildingsPage: buildBuildingsPage
	}
}());