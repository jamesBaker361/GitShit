$(".userClick").click(function(){
	$(this).toggleClass("clicked");
});

$("#newChatForm").submit(function(e){
	e.preventDefault();
	var users=[]
	for(var i=0;i<$(".clicked").length;i++){
		console.log($(".clicked")[i]);
		users.push({key:$(".clicked")[i].getAttribute("id"),
			name:$(".clicked")[i].getAttribute("name")});
	}
	users.push({key:user.key,name:user.name});
	socket.emit("newChatReq",{users:users,main:user});
});

socket.on("wipe",function(data){
	newPage(new EJS({url:"/ejs/usermain.ejs"}).render(data));
	user=data;
	for(var h=0;h<$(".joinButton").length;h++){
		socket.emit("joinButtonReq",{
			id:$(".joinButton")[h].getAttribute("id"),
			convoKey:$(".joinButton")[h].getAttribute("value")
		});
	}
})

socket.on("newChatRes",function(data){
	$("#main").empty();
newPage(new EJS({url:"/ejs/usermain.ejs"}).render(data));
	user=data;
	for(var h=0;h<$(".joinButton").length;h++){
		socket.emit("joinButtonReq",{
			id:$(".joinButton")[h].getAttribute("id"),
			convoKey:$(".joinButton")[h].getAttribute("value")
		});
	}
	//refreshUsers();
})