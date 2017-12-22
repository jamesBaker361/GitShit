$("#registerForm").submit(function(e){
	e.preventDefault();
	socket.emit("registerReq",{name:$("#name").val(),password:$("#password").val()});
})

socket.on("registerRes",function(data){
	if(data==true){
		$("#result").html("Succes. You will be redirected to Login").css("color","green");
		window.setTimeout(function(){
			window.location.reload();
		},1000);
	}else{
		$("#result").html("Username taken! Try Again!").css("color","red")
	}
})