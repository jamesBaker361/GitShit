$(".joinButton").mouseenter(function(){
	var accounts=[];
	var okay=true;
	var c=0;
	while(okay){
		if(this.getAttribute("user"+c.toString())!==null){
			accounts.push(this.getAttribute("user"+c.toString()));
			c++;
			console.log(c);
		}else{
			okay=false;
			break;
		}
	}
	var h=new EJS({url:"ejs/hover.ejs"}).render({accounts:accounts});
	$("#main").append(h);
});


$(".joinButton").mouseleave(function(){
	$("#hover").remove();
});

$(".joinButton").click(function(){
	console.log(this);
	socket.emit("joinConvoReq",{user:user,convo:this.getAttribute("value")});
});

refreshUsers=function(){
socket.emit("userListReq",{userKey:user.key});

socket.on("userListRes",function(data){
	$("#userList").html(new EJS({url:"ejs/userList.ejs"}).render({ulist:data}));
	console.log(data);
});
}

refreshUsers();