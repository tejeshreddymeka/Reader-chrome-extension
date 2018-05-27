
function getSearch(callback){
	chrome.storage.sync.get("searchOption",callback);
}

function getColor(callback){
	chrome.storage.sync.get("colorInversion",callback);
}


document.addEventListener('DOMContentLoaded', function() {

	var searchBox = document.getElementById("search");
	var colorBox = document.getElementById("colorInversion");
	searchBox.addEventListener("click",function(){
		var checked = document.getElementById("search").checked;
		chrome.storage.sync.set({ searchOption: checked });

	});
	
	
	colorBox.addEventListener("click",function(){
		var checked = document.getElementById("colorInversion").checked;
		chrome.storage.sync.set({colorInversion:checked});
		console.log("color");
		console.log(checked);
	});
		 
	 
	getSearch(function(searchOption){
		document.getElementById("search").checked = searchOption['searchOption'];   
	});

	
	getColor(function(colorInversion){
		document.getElementById("colorInversion").checked = colorInversion['colorInversion'];	
	});
	


});