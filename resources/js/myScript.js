
function myFunction() 
{
	document.getElementById("form").reset();
}

function myFunction2() 
{
	document.getElementById("loginForm").reset();
}

function drag(event)
{
	event.dataTransfer.setData("text",event.target.id);
	
}
function allowDrop(event)
{
	event.preventDefault();
}

function drop(event)
{
	event.preventDefault();
	var data=event.dataTransfer.getData("text");
	event.target.appendChild(document.getElementById(data));
}
function getActualTime(a)
{
	var seconds=Math.floor((a/1000)%60);
	var minutes=Math.floor((a/1000/60)%60);
	return [seconds,minutes];
}	
function timer()
{
	var tt=getActualTime(t);
	if(tt[0]<10)
	{
		tt[0]="0"+tt[0];
	}
	document.getElementById("clock").innerHTML=
	"Time Left: "+"<br />"+tt[1]+" : "+tt[0]+"min";
	t-=1000;
	if(t<0)
	{
		if(!complete)
		{
			var res=getTime();
			localStorage.setItem("quittime",res);
			clearInterval(counter);
			localStorage.setItem("result","Lost");
			localStorage.setItem("storeRecord","true");
			document.getElementById("playerstatus").innerHTML="You Lose!";
			complete=true;
		}
		

	}
	else if(isWin) 
	{
			
			if(!complete)
			{
				var res=getTime();
				localStorage.setItem("quittime",res);
				clearInterval(counter);
				localStorage.setItem("result","win");
				localStorage.setItem("storeRecord","true");
				document.getElementById("playerstatus").innerHTML="You Win!";
				complete=true;
				return false;
			}
			
			
			
	}
	

}

function checkStatus()
{
	if(!isFinished)
	{
		if(localStorage.getItem("player")!=null
			&& localStorage.getItem("starttime")!=undefined
			&& localStorage.getItem("starttime")!=null
			&&localStorage.getItem("quittime")!=undefined
			&& localStorage.getItem("quittime")!=null)
		{
			createTable();
			setupRecord();
			createContent();
		}

		if(localStorage.getItem("record")!=undefined &&
		localStorage.getItem("record")!=null)
		{
			document.getElementById("logTable").style.display="block";
			
			
		}
		
		
	}
}


function createTable()
{
	
	
		var headerTr=document.createElement("tr");
		headerTr.className="titleName";
		for(var i=0;i<tableListName.length;i++)
		{
			var th=document.createElement("th");
			th.innerHTML=tableListName[i];
			headerTr.append(th);
		}
		document.getElementById("logTable").append(headerTr);
		isFinished=true;
	
	
}

function setupRecord()
{
	var resultObj={"name":localStorage.getItem("player"),
		"starttime":localStorage.getItem("starttime"),
		"quittime":localStorage.getItem("quittime"),
		"gameword":localStorage.getItem("gameword"),
		"result":localStorage.getItem("result")};

	if(localStorage.getItem("record")==undefined ||
		localStorage.getItem("record")==null)
		{
			if(localStorage.getItem("player")!=null
			&& localStorage.getItem("starttime")!=undefined
			&& localStorage.getItem("starttime")!=null
			&&localStorage.getItem("quittime")!=undefined
			&& localStorage.getItem("quittime")!=null)
			{
					if(localStorage.getItem("storeRecord")!=undefined &&
					localStorage.getItem("storeRecord")!=null)
					{
							var jsonStr=[];
						jsonStr.push(resultObj);
						localStorage.setItem("record",JSON.stringify(jsonStr));
						localStorage.removeItem("storeRecord");
					}
			
			}	
		}
		else
		{
				if(localStorage.getItem("player")!=null
			&& localStorage.getItem("starttime")!=undefined
			&& localStorage.getItem("starttime")!=null
			&&localStorage.getItem("quittime")!=undefined
			&& localStorage.getItem("quittime")!=null)
			{	
				if(localStorage.getItem("storeRecord")!=undefined &&
					localStorage.getItem("storeRecord")!=null)
				{
					var jsondecode=JSON.parse(localStorage.getItem("record"));
					jsondecode.push(resultObj);
					localStorage.setItem("record",JSON.stringify(jsondecode));
					localStorage.removeItem("storeRecord");
				}
				
			}
		}
}
function createContent()
{
	if(localStorage.getItem("record")!=undefined&&
		localStorage.getItem("record")!=null)
	{
		var res=JSON.parse(localStorage.getItem("record"));
		for(var r=0;r<res.length;r++)
		{
			var row=document.createElement("tr");

			var td=document.createElement("td");
			td.innerHTML=res[r].name;
			row.append(td);

			var td=document.createElement("td");
			td.innerHTML=res[r].starttime;
			row.append(td);

			var td=document.createElement("td");
			td.innerHTML=res[r].quittime;
			row.append(td);

			var td=document.createElement("td");
			td.innerHTML=res[r].gameword;
			row.append(td);

			var td=document.createElement("td");
			td.innerHTML=res[r].result;
			row.append(td);

			document.getElementById("logTable").append(row);
		}
	}
};

function carousel()
	{
		
		var media=document.getElementById("media");
			media.style.opacity=0;
			
			if(i>=images.length)
			{
				i=0;
			}

			
			media.style.backgroundImage="url("+images[i++]+")";
			media.style.backgroundSize="100% 100%";
			media.style.opacity=1;
			setTimeout(carousel,30000);
			
	}

function compareForWin(string)
{
	var targets=document.getElementsByClassName("target");
	for(var k=0;k<targets.length;k++)
	{
		string+=targets[k].childNodes[0].innerHTML;
	}
	if(string!=null && string!="" && string.length===targets.length)
	{
		for(var i=0;i<answer.length;i++)
		{
			if(answer[i]===string)
			{
			
				
				
				
				clearInterval(status);
				isWin=true;

			}
		}
	}


}


function getTime()
{
	var d=new Date();
	var m=d.getHours()>12?"pm":"am";
	var month=d.getMonth()+1;
	var minutes=d.getMinutes()>9?d.getMinutes():("0"+d.getMinutes());
	var result=month+"/"+d.getDate()
		+"/"+d.getFullYear()+" "+
		d.getHours()+":"+minutes+":"+d.getSeconds()+m;

	return result;
}

var rand;
var t=180000;
var i=0;
var jsonStr=[];
var checkForWinStatus=false;
var counter;
var isWin=false;
var complete=false;
var num=5;
var cars = ["PALPE", "GATTRE", "MBW","DOWR","EEEEDLJBW"];
var answer=["APPLE","TARGET","BMW","WORD","BEJEWELED"];
var images=['resources/css/img/1.png','resources/css/img/2.png','resources/css/img/3.png'];
var tableListName=['Player Name','Start Date and Time','End Date and Time',
'Game Word','Result'];

var isFinished=false;

window.onload=function()
{

	
	carousel();
	var string=""; //check for win
	var length=0; 
	var page=window.location.pathname.split('/').pop();
	if(page=="game.html")
	{
		if(localStorage.getItem("player")==undefined ||
			localStorage.getItem("player")==null)
		{
			document.getElementById("game").style.display="none";

			document.getElementById("loginprompt").innerHTML="Please login first!";

		}
		else
		{	
			var status=setInterval(function()
				{
					var targets=document.getElementsByClassName("target");
					if(rand!=null && rand!=undefined)
					{
						for(var n=0;n<rand.length;n++)
						{
							if(!targets[n].hasChildNodes())
							{
								checkForWinStatus=false;
								break;
							}
							else
							{
								checkForWinStatus=true;
							}
						}

						if(checkForWinStatus){compareForWin(string);}
					}
				},1000);
			document.getElementById("loginprompt").style.display="none";
			document.getElementById("game").style.display="inline-block";
			//login information
			document.getElementById("playerName").innerHTML="Player: "+
			localStorage.getItem("player");

			document.getElementById("newGame").onclick=function()
			{	
				
				
				var res=getTime();
				localStorage.setItem("starttime",res);
				complete=false;
				isWin=false;
				counter=setInterval(timer,1000);
				document.getElementById("div1").innerHTML="";
				document.getElementById("div2").innerHTML="";
				var randIndex=Math.floor(Math.random() * cars.length);
				rand = cars[randIndex];
				localStorage.setItem("gameword",answer[randIndex]);
					for(var i=0;i<rand.length;i++)
					{
						
						var div=document.createElement("div");
						var target=document.createElement("div");
						div.className="from "+i;
						target.className="target "+i;
						var p=document.createElement("p");
						var t = document.createTextNode(rand[i]);
						p.className="ps";
						p.id=i+"";
						p.appendChild(t);
						p.draggable=true;
						div.appendChild(p);
					   document.getElementById("div1").appendChild(div);
					   document.getElementById("div2").appendChild(target);
					
					}
				var ps=document.getElementsByClassName("ps");
				var sources=document.getElementsByClassName("from");
				var targets=document.getElementsByClassName("target");
				for(var j=0;j<rand.length;j++)
				{
					ps[j].ondragstart = function(event){drag(event);}
			
					  targets[j].ondragover = function(event){
					  		
					  		
					  			allowDrop(event);
					  }
			
					  targets[j].ondrop = function(event)
					  {
					  		if(!this.hasChildNodes())
					  		{
					  			drop(event);
					  		}
					  	
					  	
					  }
					 
					sources[j].ondragover = function(event)
					{
						
						allowDrop(event);
					}
				
					sources[j].ondrop = function(event)
					{

				 			if(!this.hasChildNodes())
					  		{
					  			drop(event);
					  		}

				 		
					}
				}//for
			}//newgame button


			document.getElementById("quitGame").onclick=function()
			{
				
					if(!complete)
					{
						var res=getTime();
						localStorage.setItem("quittime",res);
						document.getElementById("playerstatus").innerHTML="You cancle the game!";
						localStorage.setItem("result","Cancelled");
						clearInterval(counter);
						complete=true;
						localStorage.setItem("storeRecord","true");
						return false;
					}
					
					
					
				
			}//quitgame button
		}

	}//game page
	

	



if(document.getElementById("form")!==null)
{
	document.getElementById("form").onsubmit=function()
	{
		var user=document.getElementById('user').value;
		var pwd=document.getElementById('pwd').value;
		var myObj={"user":user,"pwd":pwd};
		if(localStorage.getItem("info")==undefined||localStorage.getItem("info")==null )
		{
			
			jsonStr.push(myObj);
			localStorage.setItem("info",JSON.stringify(jsonStr));

		}
		else if(JSON.parse(localStorage.getItem("info")).length>=num)
		{
					document.getElementById("demo").innerHTML = "Registration full!";
					return false;
			
		}
		else
		{
			
			var jsondecode=JSON.parse(localStorage.getItem("info"));
			for(var i=0;i<jsondecode.length;i++)
			{
				if(jsondecode[i].user==user)
				{
					document.getElementById("demo").innerHTML = "Repeat username!";
					console.log("test");
					return false;
				}
			}

			jsondecode.push(myObj);
			localStorage.setItem("info",JSON.stringify(jsondecode));

		}


		location.href = 'login.html';
		return false;
		

	}//onsubmit
}
	

if(document.getElementById("loginForm")!==null)
{
	document.getElementById("loginForm").onsubmit=function()
	{

		var user=document.getElementById('user').value;
		var pwd=document.getElementById('pwd').value;
		objs=JSON.parse(localStorage.getItem("info"));
		for(var i=0;i<objs.length;i++)
		{
			if(user==objs[i].user && pwd==objs[i].pwd)
			{
				localStorage.setItem("player",user);
				location.href="index.html";
				return false;
			}

		}

		document.getElementById("demo").innerHTML="Illegal user!";
		return false;
	}//onsubmit

}//loginForm


if(page=="logs.html")
{
	isFinished=false;
	if(localStorage.getItem("player")==undefined || localStorage.getItem("player")==null)
	{
		var content=document.createElement("p");
		content.innerHTML="Please login first.";
		document.body.append(content);
		document.getElementsById("logTable").style.display="none";
	}
	else
	{
		
		
			
			if(!isFinished)
				setInterval(checkStatus,1500);
		
		
	}
}//logs page






	

	




};//onload








	





	



