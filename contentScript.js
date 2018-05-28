
function getSearch(callback){
	chrome.storage.sync.get("searchOption",callback);
}

function getColor(callback){
	chrome.storage.sync.get("colorInversion",callback);
}

function getNotes(callback){
	chrome.storage.sync.get("notes",callback);
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


getColor(function(colorInversion)
{
	var colorOption;
	colorOption = colorInversion['colorInversion'];	
	//console.log(colorInversion);
	if(colorOption===true)
	{

/*		let css = 'html {-webkit-filter: invert(100%);' +
	    '-moz-filter: invert(100%);' +
	    '-o-filter: invert(100%);' +
	    '-ms-filter: invert(100%); }';
*/
		let css = '*,*:before,*:after{background-color:#0E0C0C;color:white;}';

	 	 let head = document.getElementsByTagName('head')[0];
	  	let invertStyle = document.getElementById('invert');

		  if (invertStyle) 
		  {
		    head.removeChild(invertStyle);
		  }
		  else 
		  {
			    let style = document.createElement('style');

			    style.type = 'text/css';
			    style.id = 'invert';
			    if (style.styleSheet)
				{
			      style.styleSheet.cssText = css;
			    }
				else
					{
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

var trianlgeFlag=1;
var triangleDown=1;

getNotes(function(notes){
	var notesOption = notes['notes'];
	//console.log(notesOption);
	if(notesOption===true)
	{
		var div = document.createElement("div");
		div.id = "noteDiv";

		if(trianlgeFlag)
		{
			 let head = document.getElementsByTagName('head')[0];
			let css="#triangle-down {   \
					width: 0;    \
					height: 0;    \
					border-left: 25px solid transparent;   \
					border-right: 25px solid transparent;   \
					border-top: 30px solid rgb(0, 119, 204);      \
				}   \
				#triangle-up {   \
					width: 0;    \
					height: 0;    \
					border-left: 25px solid transparent;    \
					border-right: 25px solid transparent;    \
					border-bottom: 30px solid rgb(0, 119, 204);    \
				}   \
				#updown{	\
					cursor: pointer;	\
				}	\
			";
			let style = document.createElement('style');	
			style.type = 'text/css';
		    if (style.styleSheet)
			{
		      style.styleSheet.cssText = css;
		    }
			else
				{
		      style.appendChild(document.createTextNode(css));
		    }
		    head.appendChild(style);
		    trianlgeFlag=0;
		}
		
	    
		var script = document.createElement("script");	
		div.innerHTML = ' <div id="updown"><div id="triangle-down"></div>   \
						            <table>      \
							    <tr><td colspan="4">Text to Save:</td></tr>			\
							    <tr>			\
							        <td colspan="4">				\
							            <textarea id="inputTextToSave" cols="18" rows="2	"></textarea>	\
							        </td>			\
							    </tr>				\
								<tr>			\
							        <td colspan="4">				\
											<button onclick="addSelectText()">Add selected text</button>   \
							        </td>			\
							    </tr>				\
							</table>    <br/><br/>\
							<table>   \
							    <tr>					\
							        <td colspan="4">Filename to Save As:</td>				\
								</tr>  \
								<tr> \
							        <td colspan="4"><input id="inputFileNameToSaveAs" size="16"></input></td>			\
								</tr> \
								<tr> \
							        <td colspan="4"><button onclick="saveTextAsFile()">Save Text to File</button></td>	\
							    </tr>			\
							</table>    <br/><br/>\
							<table>   \
							    <tr>				\
							        <td colspan="4">Select a File to Load:</td>			\
								</tr> \
								<tr>   \
							        <td colspan="4"><input type="file" id="fileToLoad"></td>			\
								</tr>   \
							        <td colspan="4"><button onclick="loadFileAsText()">Load Selected File</button><td>	<br/>		\
							    </tr>			\
							</table>			\
							 ';
		
		script.innerHTML = 'function saveTextAsFile()			\
							{			\
							   var textToSave = document.getElementById("inputTextToSave").value;			\
							   var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});				\
							   var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);			\
							   var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;			\
							    var downloadLink = document.createElement("a");				\
							    downloadLink.download = fileNameToSaveAs;			\
							    downloadLink.innerHTML = "Download File";			\
							    downloadLink.href = textToSaveAsURL;			\
							    downloadLink.onclick = destroyClickedElement;				\
							    downloadLink.style.display = "none";				\
							    document.body.appendChild(downloadLink);			\
							    downloadLink.click();				\
							}			\
							function destroyClickedElement(event)			\
							{				\
							    document.body.removeChild(event.target);		\
							}				\
								function loadFileAsText()				\
					{			\
							    var fileToLoad = document.getElementById("fileToLoad").files[0];				\
							    var fileReader = new FileReader();				\
							    fileReader.onload = function(fileLoadedEvent)    \
							    {			\
							        var textFromFileLoaded = fileLoadedEvent.target.result;			\
							        document.getElementById("inputTextToSave").value = textFromFileLoaded;			\
							    };				\
							    fileReader.readAsText(fileToLoad, "UTF-8");			\
							}   \
						function 		addSelectText()						\
						{												\
							document.getElementById("inputTextToSave").value =  document.getElementById("inputTextToSave").value + "   [*]  "+ window.getSelection().toString();				\
						}         \
					';
		document.getElementsByTagName('body')[0].appendChild(div);
		document.getElementsByTagName('body')[0].appendChild(script);
		//console.log(div);
		var element = document.getElementById("updown")
		console.log(element);
		if(element)
		{
			element.addEventListener("click",function(e){
			if(e.target!= document.getElementById("triangle-down") && e.target!=document.getElementById("triangle-up"))
			{
				return;
			}
			if(triangleDown)
			{
				var down = document.getElementById("triangle-down");
				//console.log(down);
				down.id = "triangle-up";
				triangleDown=0;
				document.getElementById("noteDiv").style.maxHeight = '70px';	
			}
			else
			{
				var up = document.getElementById("triangle-up");
				//console.log(up)
				up.id = "triangle-down";
				triangleDown=1;
				document.getElementById("noteDiv").style.maxHeight = '400px';	
			}
			});	
		}	
	}
});


