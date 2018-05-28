
	function getSearch(callback){
		chrome.storage.sync.get("searchOption",callback);
	}

	function getColor(callback){
		chrome.storage.sync.get("colorInversion",callback);
	}

	function getNotes(callback){
		chrome.storage.sync.get("notes",callback);
	}

	document.addEventListener('DOMContentLoaded', function() {

		var searchBox = document.getElementById("search");
		searchBox.addEventListener("click",function(){
			var checked = document.getElementById("search").checked;
			chrome.storage.sync.set({ searchOption: checked });
		});
		
		var colorBox = document.getElementById("colorInversion");
		colorBox.addEventListener("click",function(){
			var checked = document.getElementById("colorInversion").checked;
			chrome.storage.sync.set({colorInversion:checked});
			//console.log("color");
			//console.log(checked);
		});
			 
		
		var notesBox = document.getElementById("notes");
		notesBox.addEventListener("click",function(){
			var checked = document.getElementById("notes").checked;
			chrome.storage.sync.set({notes:checked});
			console.log("notes");
			console.log(cheked);
		});
		
		getSearch(function(searchOption){
			document.getElementById("search").checked = searchOption['searchOption'];   
		});

		
		getColor(function(colorInversion){
			document.getElementById("colorInversion").checked = colorInversion['colorInversion'];	
		});
		
		getNotes(function(notes){
			document.getElementById("notes").checked = notes['notes'];
			//if(document.getElementById("notes").checked === true){
			//	chrome.tabs.create({'url': "/options.html" } );
			//}
		});

	});









