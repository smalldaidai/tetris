var startDate = Date.parse("2022-05-26 00:00:00");
var endDate = Date.parse("2022-06-07 23:59:59");

var getCount = function(userId){
	$("DIV").remove();
	$("body").append($("<DIV>").attr("id","content"));
	$("#content").text("胜场查询中...");
	$.getJSON("https://www.elevenvr.club/accounts/" + userId + "/elo-history",
					function(data){
						var count = 0;
						if(!data || !data.data){
							alert("请求失败");
							return;
						}

						//var start = findStart(data.data,0,data.data.length - 1);

						for(index=0;index<data.data.length;index++){
							var round = data.data[index];
							
							if(!round.attributes["won-game"]){
								continue;
							}

							var occureDate =  Date.parse(round.attributes["created-at"]);

							if(occureDate >= startDate && occureDate <= endDate){
								count++;
							}else if(occureDate > endDate){
								break;
							}
						}


						result(count);
					});
}

var result = function(count){
	$("#content").text("从2022-05-26 00:00:00至2022-06-07 23:59:59间的胜场数为");
	$("#content").after($("<DIV>").css({fontSize: "50px"}).text(count));
}

var findStart = function(rounds,start,end){

		if(end - start <3 ){
			for(index=start;index<=end;index++){
				var round = rounds[index];
				var occureDate = Date.parse(round.attributes["created-at"]);
				if(occureDate >= startDate){
					return index;
				}
			}
		}else{
			var middle = Math.trunc((start + end)/2);

			var round = rounds[middle];
			var occureDate = Date.parse(round.attributes["created-at"]);

			if(occureDate >= startDate){
				return findStart(rounds,start,middle);
			}else{
				return findStart(rounds,middle,end);
			}

		}
}

var init = function(){
	$("body").empty();

	$("body").append($("<input>").attr("id","user_name_append"));

	$("#user_name_append")
	.after(
		$("<button>").text("确定").click(
		function(){
			var userName = $("#user_name_append").val() || '';
			userName = $.trim(userName);

			if(userName.length == 0){
				alert("请输入昵称");
				return;
			}

			//首先根据昵称查用户id
			$.getJSON("https://www.elevenvr.club/accounts/search/" + userName,
				function(data){
					if(!data || !data.data){
						alert("请求失败");
						return;
					}

					if(data.data.length < 1){
						alert("未匹配到用户:" + userName);
						return;
					}

					var matchedUser;
					for(index=0;index<data.data.length;index++){
						var user = data.data[index];
						if(userName == user.attributes["user-name"]){
							matchedUser = user;
							break;
						}
					}
					if(!matchedUser){
						alert("未匹配到用户:" + userName);
						return;
					}

					if(localStorage){
						var userInfo = {};
						userInfo.name = userName;
						userInfo.id = matchedUser.id;
						localStorage.user = JSON.stringify(userInfo);
					}
					getCount(matchedUser.id);					

				});
		}
	));
	if(localStorage && localStorage.user){
		var userInfo = JSON.parse(localStorage.user);
		$("#user_name_append").val(userInfo.name);
		getCount(userInfo.id);
	}
}

