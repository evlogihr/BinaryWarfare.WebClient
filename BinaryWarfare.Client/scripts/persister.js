﻿/// <reference path="http-requester.js" />
/// <reference path="class.js" />
/// <reference path="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha1.js" />
var persisters = (function () {
	var nickname = localStorage.getItem("nickname");
	var sessionKey = localStorage.getItem("sessionKey");
	function saveUserData(userData) {
		localStorage.setItem("nickname", userData.nickname);
		localStorage.setItem("sessionKey", userData.sessionKey);
		nickname = userData.username;
		sessionKey = userData.sessionKey;
	}
	function clearUserData() {
		localStorage.removeItem("nickname");
		localStorage.removeItem("sessionKey");
		nickname = "";
		sessionKey = "";
	}

	var MainPersister = Class.create({
		init: function (rootUrl) {
		    this.rootUrl = rootUrl;
		    this.user = new UserPersister(this.rootUrl);
		    this.building = new BuildingPersister(this.rootUrl);
		    this.unit = new UnitPersister(this.rootUrl);
		    this.money = new MoneyPersister(this.rootUrl);
		},
		isUserLoggedIn: function () {
			var isLoggedIn = nickname != null && sessionKey != null;
			return isLoggedIn;
		},
		nickname: function () {
			return nickname;
		}
	});
	var UserPersister = Class.create({
		init: function (rootUrl) {
			//...api/user/
			this.rootUrl = rootUrl + "user/";
		},
		login: function (user, success, error) {
			var url = this.rootUrl + "login";
			var userData = {
				username: user.username,
				authCode: CryptoJS.SHA1(user.username + user.password).toString()
			};

			httpRequester.postJSON(url, userData,
				function (data) {
					saveUserData(data);
					success(data);
				}, error);
		},
		register: function (user, success, error) {
			var url = this.rootUrl + "register";
			var userData = {
				username: user.username,
				authCode: CryptoJS.SHA1(user.username + user.password).toString()
			};
			httpRequester.postJSON(url, userData,
				function (data) {
					saveUserData(data);
					success(data);
				}, error);
		},
		logout: function (success, error) {
			var url = this.rootUrl + "logout/" + sessionKey;
			httpRequester.getJSON(url, function (data) {
				clearUserData();
				success(data);
			}, error)
		}
	});
	var BuildingPersister = Class.create({
	    init: function (url) {
            this.rootUrl = url + "building/"
	    },
	    getBuildings: function(success, error) {
	        var url = this.rootUrl + "getBuildings/" + sessionKey;
	        httpRequester.getJSON(url, success, error);
	    },
	    create: function (buildingName, success, error) {
	        var buildingData = {
                name: buildingName
	        };
	        var url = this.rootUrl + "create/" + sessionKey;
	        httpRequester.postJSON(url, buildingData, success, error);
	    },
	    destroy: function (buildingName, success, error) {
	        var buildingData = {
	            name: buildingName
	        };
	        var url = this.rootUrl + "destroy/" + sessionKey;
	        httpRequester.postJSON(url, buildingData, success, error);
	    }
	});
	var SquadPersister = Class.create({
	    init: function (url) {
            this.rootUrl = url + "squad/"
	    },
	    attack: function (username, squadId, success, error) {
	        var data = {
	            attackedUsername: username,
	            squadId: squadId
	        }
	        var url = this.rootUrl + "attack/" + sessionKey;

	        httpRequester.postJSON(url, data, success, error);
	    },
	    work: function (data, success, error) {
	        var squadInfo = {
	            squadId: data.squadId,
	            time: data.time
	        };
	        var url = this.rootUrl + "work/" + sessionKey;

	        httpRequester.postJSON(url, squadInfo, success, error);
	    },
	    getInfo: function (squadId, success, error) {
	        var url = this.rootUrl + "getInfo/" + sessionKey;

	        httpRequester.postJSON(url, squadId, success, error);
	    }
	});
	var UnitPersister = Class.create({
	    init: function (url) {
	        this.rootUrl = url + "unit/";
	    },
	    create: function (success, error) {
	        var url = this.rootUrl + "create/" + sessionKey;
	        httpRequester.getJSON(url, success, error);
	    },
	    getUnits: function (success, error) {
	        var url = this.rootUrl + "getUnits/" + sessionKey;
	        httpRequester.getJSON(url, success, error);
	    },
	    moveToSquad: function (data, success, error) {
	        var url = this.rootUrl + "moveToSquad/" + sessionKey;
	        httpRequester.postJSON(data, success, error);
	    }
	});
	var MoneyPersister = Class.create({
	    init: function (url) {
	        this.rootUrl = url + "money/";
	    },
	    getMoney: function (success, error) {
	        var url = this.rootUrl + "getMoney/" + sessionKey;
	        httpRequester.getJSON(url, success, error);
	    },
	    getIncome: function (success, error) {
	        var url = this.rootUrl + "getIncome/" + sessionKey;
	        httpRequester.getJSON(url, success, error);
	    }
	});

	return {
		get: function (url) {
			return new MainPersister(url);
		}
	};
}());