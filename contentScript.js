
function getSearch(callback){
	chrome.storage.sync.get("searchOption",callback);
}

function getColor(callback){
	chrome.storage.sync.get("colorInversion",callback);
}

getSearch(function(searchOption){
	var search;
	search = searchOption['searchOption'];   
	//console.log('call');
	//console.log(search);
	
	 var req = "";
	 var totalLen=0;
	document.onmouseup = document.onkeyup = document.onselectionchange = function() {
	
		if(search===false)return;

	  var text = window.getSelection().toString();
		//console.log(text);
		//console.log(text.getRangeAt(0).getBoundingClientRect());
		if(text.length==0 || text.length>30)
		{
			var befDiv = document.getElementById("pop");
			if(befDiv!=null){
				befDiv.parentNode.removeChild(befDiv);
			}
			return;
		}



		var xmlhttp = new XMLHttpRequest();
		
		xmlhttp.onreadystatechange  = function()
		{
			if (this.readyState == 4 && this.status == 200) {
			//console.log(this.responseText);
			var res = this.responseText;
		  	res = res.slice(5,res.length-1);
		//	console.log(res);
	        var myObj = JSON.parse(res);
			
			//console.log(myObj[2]);
				req = "<h1 id='header'>"+text+"</h1>"
				req= req + "<ul id='list' >";
		       	totalLen=0;
				for(let e in myObj[2]){
					
					if(myObj[2][e].length==0){
						continue;
					}
				
					if(e>5)break;
					totalLen+=myObj[2][e].length;
					req = req +"<li>"+ myObj[2][e] + "</li>";
					
				}
				req = req + "</ul>"
	      //console.log(req);
	    		}	
		};
	    

		xmlhttp.open("GET", 'https://en.wikipedia.org/w/api.php?action=opensearch&callback=%3F&suggest=true&search='+text+'&format=json', true);

		xmlhttp.send();

		var befDiv = document.getElementById("pop");
		if(befDiv!=null){
			befDiv.parentNode.removeChild(befDiv);
		}
		if(totalLen==0)return;
		//get coordinates of the selected element
		var rect  = window.getSelection().getRangeAt(0).getBoundingClientRect();
		var x = rect.x;
		var y = rect.y;
		y = y+30;
		if(y>600)y-=440;
		//console.log(x);
		//console.log(y);
		var div = document.createElement("div");
		div.id = "pop";
	     div.style.left = x + 'px';
	     div.style.top = y +  'px';
		div.innerHTML = req;
		document.getElementsByTagName("body")[0].appendChild(div);


	};

});


getColor(function(colorInversion){
	var colorOption;
	colorOption = colorInversion['colorInversion'];	
	//console.log(colorInversion);
	if(colorOption===true){

/*		let css = 'html {-webkit-filter: invert(100%);' +
	    '-moz-filter: invert(100%);' +
	    '-o-filter: invert(100%);' +
	    '-ms-filter: invert(100%); }';
*/
		let css = '*,*:before,*:after{background-color:#0E0C0C;color:white;}';

	 	 let head = document.getElementsByTagName('head')[0];
	  	let invertStyle = document.getElementById('invert');

		  if (invertStyle) {
		    head.removeChild(invertStyle);
		  } else {
	    let style = document.createElement('style');

	    style.type = 'text/css';
	    style.id = 'invert';
	    if (style.styleSheet){
	      style.styleSheet.cssText = css;
	    } else {
	      style.appendChild(document.createTextNode(css));
	    }
	    head.appendChild(style);
	  }


//		var elements = document.getElementsByTagName("*");
//		for(var ind=0;ind<elements.length;ind++)
//		{
//			elements[ind].style.background = 'black';
//			elements[ind].style.color = 'white';
//		}
	}

});
