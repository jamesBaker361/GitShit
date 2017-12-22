console.log("client main!");
socket=io();
user={};
convo={key:"null"};
font="";
myColor="#b2db41";
yourColor="#f4a6db";
socket.on("hello",function(data){
	console.log("hello "+data.name);
});

socket.on("user",function(data){
	newPage(new EJS({url:"/ejs/usermain.ejs"}).render(data));
	user=data;
	for(var h=0;h<$(".joinButton").length;h++){
		socket.emit("joinButtonReq",{
			id:$(".joinButton")[h].getAttribute("id"),
			convoKey:$(".joinButton")[h].getAttribute("value")
		});
	}
});

socket.on("joinButtonRes",function(data){
	console.log(data);
	$("#"+data.id).html("Join "+data.name);
	for(var f=0;f<data.accounts.length;f++){
		$("#"+data.id).attr("user"+f.toString(),data.accounts[f].nickname);
	}
});

socket.on("joinConvoRes",function(data){
	console.log(data);
	convo=data;
	newPage(new EJS({url:"/ejs/convo.ejs"}).render(data));
});

socket.on("updateConvo",function(data){
	console.log("bluh");
	if(data.key==convo.key){
		console.log("update sucesful, the new message is "+data.messages[data.messages.length-1].content);
		convo=data;
		newPage(new EJS({url:"/ejs/convo.ejs"}).render(data));
	}else{
		console.log("update failed!!!");
	}
})

$(document).ready(function(){
	console.log("j chilling with j query");
	$("#main").append(new EJS({url:"/ejs/login.ejs"}).render({dummy:"420 blaze it faggot"}));
	$("#login").submit(function(e){
		e.preventDefault();
		socket.emit("login",{username:$("#username").val(),password:$("#password").val()});
	});
	$("#registerButton").click(function(){
		newPage(new EJS({url:"/ejs/register.ejs"}).render({}))
	});
});