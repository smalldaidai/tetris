var startDate = Date.parse("2022-03-21 11:00:00");
var endDate = Date.parse("2022-03-28 11:00:00");

var getCount = function(userId,url,count){
	$("#content").text($("#content").text() + ".");
	$.getJSON(url,
		function(data){

			if(!data || !data.data){
				alert("请求失败");
				return;
			}

			if(data.data.length == 0){
				result(count);
				return;
			}

			for(index=0;index<data.data.length;index++){
				

				var round = data.data[index];
				var occurDate = Date.parse(round.attributes["created-at"]);
				if(occurDate > endDate){
					continue;
				}

				if(occurDate < startDate){
					result(count);
					return;
				}

				var ids = [round.attributes["home-user-id"],round.attributes["away-user-id"]];
				var winner = ids[round.attributes["winner"]];

				if(winner == userId){
					count++;
				}

			}

			if(data.links && data.links.next){
				getCount(userId,data.links.next,count);
			}else{
				result(count);
			}


		});
}

var result = function(count){
	$("#content").text("从2022-03-21 11:00:00至2022-03-28 11:00:00间的胜场数为");
	$("#content").after($("<DIV>").css({fontSize: "50px"}).text(count));
}

var init = function(){
	$("body").empty();

	$("body").prepend($("<input>").attr("id","user_name_append"));

	$("#user_name_append")
	.after(
		$("<button>").text("确定").click(
		function(){
			$("div").remove();
			$("body").append($("<DIV>").attr("id","content").text("查询中......"));
			var count = 0;
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
						if(userName.toLowerCase() == user.attributes["user-name"].toLowerCase()){
							matchedUser = user;
							break;
						}
					}
					if(!matchedUser){
						alert("未匹配到用户:" + userName);
						return;
					}


					$("#user_name_append").val(userName);
					var userId = matchedUser.id;

					getCount(userId,"https://www.elevenvr.club/accounts/" + userId + "/matches/ranked",count);
				});
		}
	));
}
