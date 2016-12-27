
//
//
//
//

/**
 *	0		1
 *	口
 *	口		口口口口
 *	口
 *	口
 */
var TYPE_0 = 0;

/**
 *	0		1			2		3
 *	口口	口            口	口口口
 *	口		口口口		  口		口
 *	口					口口		
 */
var TYPE_1 = 1;

/**
 *	0		1			2		3
 *	口口	口口口		口			口
 *	  口	口			口		口口口
 *	  口				口口
 */
var TYPE_2 = 2;


/**
 *	0		   1		  2		  3
 *	口					  口	口口口
 *	口口	  口		口口	  口
 *	口		口口口		  口
 */
var TYPE_3 = 3;


/**
 *	0		1
 *	  口	口口
 *	口口	  口口
 *	口
 */
var TYPE_4 = 4;


/**
 *  0		  1
 *	口		  口口
 *	口口	口口
 *	  口
 */
var TYPE_5 = 5;

/**
 *	0
 *	口口
 *	口口
 *	
 */
var TYPE_6 = 6;

/**
 *	旋转方向：逆时针
 */
var ANTI_CLOCKWISE = 0;

/**
 *	旋转方向：顺时针
 */
var CLOCKWISE = 1;

/**
 *	移动方向：左
 */
var LEFT = 0;
/**
 *	移动方向：右
 */
var RIGHT = 1;
/**
 *	移动方向：下
 */
var DOWN = 2;

//关卡速度，每隔xxx毫秒移动一次，所以数字越大，移动越慢
var LEVEL_ARRAY = [1000,900,800,700,600,500,400,300,200,100,75,50,25];

//一次消去行数与分数的关系，一次消去行数越多，分数越多
var SCORE_ARRAY = [0,100,300,800,1500];

//级别和分数的关系，每达到一定分数就会变为新的关卡
var LEVEL_SCORE_ARRAY = [0,10000,20000,30000,40000,50000,60000,70000,80000,90000,100000,110000,120000];

//级别对应的背景音乐
var BG_MUSIC_ARRAY = ['sound/1.ogg','sound/2.ogg','sound/3.ogg','sound/4.ogg','sound/5.ogg','sound/6.ogg','sound/7.ogg','sound/8.ogg','sound/9.ogg','sound/9.ogg','sound/9.ogg','sound/9.ogg','sound/9.ogg','sound/9.ogg','sound/9.ogg'];

Block = function(type,direction){
	
	this.rects = [];
	//创建四个div作为方块
	for(index = 0 ; index < 4 ; index++ ){
		var rect = document.createElement("div");
		rect.className = "block";
		this.rects.push(rect);
	}

	this.getRect = function(index){

		return this.rects[index];

	}
	this.direction = direction;
	//根据类型和方向确定刚出现时的坐标以及初始化数据
	if(type == TYPE_0){

		this.data = [
						[	{x:1,y:0},
							{x:1,y:1},
							{x:1,y:2},
							{x:1,y:3} 
						],
						[
							{x:0,y:1},
							{x:1,y:1},
							{x:2,y:1},
							{x:3,y:1}
						]
					];

		//TYPE_0，只有0和1两个方向
		this.direction = direction % 2;
		
		if(this.direction == 0)
			this.position = {x:3,y:-4};
	
		if(this.direction == 1)
			this.position = {x:3,y:-2};
	
	}else if(type == TYPE_1){

		this.data = [
						[	{x:0,y:0},
							{x:1,y:0},
							{x:0,y:1},
							{x:0,y:2}
						],
						[
							{x:0,y:1},
							{x:0,y:2},
							{x:1,y:2},
							{x:2,y:2}
						],
						[
							{x:2,y:0},
							{x:2,y:1},
							{x:1,y:2},
							{x:2,y:2}
						],
						[
							{x:0,y:0},
							{x:1,y:0},
							{x:2,y:0},
							{x:2,y:1}
						]
					];

		if(this.direction == 0)
			this.position = {x:4,y:-3};
		
		if(this.direction == 1 || this.direction == 2)
			this.position = {x:3,y:-3};

		if(this.direction == 3)
			this.position = {x:3,y:-2};

	}else if(type == TYPE_2){

		this.data = [
						[	{x:1,y:0},
							{x:2,y:0},
							{x:2,y:1},
							{x:2,y:2}
						],
						[
							{x:0,y:0},
							{x:1,y:0},
							{x:2,y:0},
							{x:0,y:1}
						],
						[
							{x:0,y:0},
							{x:0,y:1},
							{x:0,y:2},
							{x:1,y:2}
						],
						[
							{x:2,y:1},
							{x:0,y:2},
							{x:1,y:2},
							{x:2,y:2}
						]
					];
		if(this.direction == 0 || this.direction == 3)
			this.position = {x:3,y:-3};

		if(this.direction == 1)
			this.position = {x:3,y:-2};

		if(this.direction == 2)
			this.position = {x:4,y:-3};

	}else if(type == TYPE_3){
		this.data = [
						[	{x:1,y:0},
							{x:1,y:1},
							{x:2,y:1},
							{x:1,y:2}
						],
						[
							{x:1,y:0},
							{x:0,y:1},
							{x:1,y:1},
							{x:2,y:1}
						],
						[
							{x:1,y:0},
							{x:0,y:1},
							{x:1,y:1},
							{x:1,y:2}
						],
						[
							{x:0,y:1},
							{x:1,y:1},
							{x:2,y:1},
							{x:1,y:2}
						]
					];
		if(this.direction == 0)
			this.position = {x:3,y:-3};

		if(this.direction == 1)
			this.position = {x:3,y:-2};

		if(this.direction == 2)
			this.position = {x:4,y:-3};

		if(this.direction == 3)
			this.position = {x:3,y:-3};
	}else if(type == TYPE_4){


		this.data = [
				[	{x:1,y:0},
					{x:0,y:1},
					{x:1,y:1},
					{x:0,y:2}
				],
				[
					{x:0,y:1},
					{x:1,y:1},
					{x:1,y:2},
					{x:2,y:2}
				]
			];
		
		//TYPE_4，只有0和1两个方向
		this.direction = direction % 2;
		
		if(this.direction == 0)
			this.position = {x:4,y:-3};

		if(this.direction == 1)
			this.position = {x:3,y:-3};

	}else if(type == TYPE_5){
		
		this.data = [
				[	{x:1,y:0},
					{x:1,y:1},
					{x:2,y:1},
					{x:2,y:2}
				],
				[
					{x:1,y:1},
					{x:2,y:1},
					{x:0,y:2},
					{x:1,y:2}
				]
			];
		
		//TYPE_5，只有0和1两个方向
		this.direction = direction % 2;
		this.position = {x:3,y:-3};

	}else if(type == TYPE_6){

				this.data = [
				[	
					{x:0,y:0},
					{x:1,y:0},
					{x:0,y:1},
					{x:1,y:1}
				]
			];

		//TYPE_6，只有一个方向
		this.direction = 0;
		this.position = {x:4,y:-2};

	}

	this.refreshPosition = function(){

		for(index = 0 ; index < 4; index++){
			this.rects[index].style.top = (this.position.y + this.data[this.direction][index].y) * 20 + 'px';
			this.rects[index].style.left = (this.position.x + this.data[this.direction][index].x) * 20 + 'px';

			if((this.position.y + this.data[this.direction][index].y) < 0)
				this.rects[index].style.display='none';
			else
				this.rects[index].style.display='';

		}
		
	}

	this.getRealPosition = function(index){

		return {x:this.position.x + this.data[this.direction][index].x,y:this.position.y + this.data[this.direction][index].y};	

	}

	this.getOffsetPosition = function(index){
		
		return this.data[this.direction][index];
	}


	this.getRealPositionAfterRotate = function(index,way){

		switch(way){
			
			case	CLOCKWISE:
				return {
							x:this.position.x + this.data[(this.direction - 1 + this.data.length) % this.data.length][index].x,
							y:this.position.y + this.data[(this.direction - 1 + this.data.length) % this.data.length][index].y
						};
			case	ANTI_CLOCKWISE:
				return {
							x:this.position.x + this.data[(this.direction + 1) % this.data.length][index].x,
							y:this.position.y + this.data[(this.direction + 1) % this.data.length][index].y
						};
			default:
				return {x:0,y:0};

		}

	}

	this.move = function(way,gameData){

		switch(way){

			case LEFT:
				//遍历四块砖，是否都可以向左移动
				for(index = 0 ; index < 4 ; index++){
					//小于0时，说明撞到左边的墙了,不能移动
					if(this.getRealPosition(index).x - 1 < 0){
						return false;
					}

					//是否被已有的砖块挡住
					if(gameData[this.getRealPosition(index).y]){
						if (gameData[this.getRealPosition(index).y][this.getRealPosition(index).x - 1]){
							return false;
						}
					}
				}
				
				//向左移动一格
				this.position.x = this.position.x - 1;
				break;

			case RIGHT:
				//遍历四块砖，是否都可以向右移动
				for(index = 0 ; index < 4 ; index++ ){
					//大于等于10时，说明撞到右边的墙了，不能移动
					if(this.getRealPosition(index).x + 1 >= 10){
						return false;
					}

					//是否被已有的砖块挡住
					if(gameData[this.getRealPosition(index).y]){
						if (gameData[this.getRealPosition(index).y][this.getRealPosition(index).x + 1]){
							return false;
						}
					}

				}
				
				//向右移动一格
				this.position.x = this.position.x + 1;
				break;
			case DOWN:
				//遍历四块砖，是否都可以向下移动
				for(index = 0 ; index < 4 ; index++ ){
					//大于等于10时，说明撞到下边的墙了，不能移动
					if(this.getRealPosition(index).y + 1 >= 20){
						return false;
					}
					
					//是否被已有的砖块挡住
					if(gameData[this.getRealPosition(index).y + 1]){
						if (gameData[this.getRealPosition(index).y + 1][this.getRealPosition(index).x]){
							return false;
						}
					}
				}

				//向下移动一格
				this.position.y = this.position.y + 1;
				break;
		}

		this.refreshPosition();
		return true;

	}

	this.rotate = function(way,gameData){
		
		//在靠近边缘旋转时，允许旋转后的横向位移
		var avaOffsetArray = [0,-1,1,-2,2];

		var avaOffset = 0;
		
		var ava = true;

		for(avaIndex = 0 ; avaIndex < avaOffsetArray.length;avaIndex++){
			ava = true;
			//检查旋转后是否被挡住
			for(index = 0 ; index < 4 ; index++){

				var newPos = this.getRealPositionAfterRotate(index,way);
				//撞到左边、右边或下边
				if(newPos.x + avaOffsetArray[avaIndex] < 0 || newPos.x + avaOffsetArray[avaIndex] >= 10 || newPos.y >=20){
					ava = false;
					break;
				}
				
				//被已有的砖块挡住了
				if(gameData[newPos.y]){
					if(gameData[newPos.y][newPos.x + avaOffsetArray[avaIndex]]){
						ava = false;
						break;
					}
				}
			}

			if(ava){
				avaOffset = avaOffsetArray[avaIndex];
				break;
			}
		}

		if(!ava)
			return;



		if(way == CLOCKWISE)
			this.direction = (this.direction - 1 + this.data.length) % this.data.length;
		else
			this.direction = (this.direction + 1) % this.data.length;
		
		this.position.x = this.position.x + avaOffset;

		this.refreshPosition();
	}

}


Game = function(container){
	

	this.init = function(){

		//当前活动的方块对象
		this.activeBlock = null;
		
		//游戏刷新的进程id
		this.processId = -1;

		//移动方块的进程id
		this.actionProcessId = -1;

		//为实现类似游戏机的效果使用的一个timerId
		this.actionTimerId = -1;

		//记录上一次点击事件的代码
		this.actionCode = -1;

		//下一个将出现的方块
		this.nextBlock = null;

		//当前关卡：0
		this.level = 0;
		
		this.score = 0;

		this.hiScore = localStorage.getItem("hi_score");

		if(!this.hiScore)
			this.hiScore = 0;

		this.gameData = [
							[null,null,null,null,null,null,null,null,null,null],
							[null,null,null,null,null,null,null,null,null,null],
							[null,null,null,null,null,null,null,null,null,null],
							[null,null,null,null,null,null,null,null,null,null],
							[null,null,null,null,null,null,null,null,null,null],
							[null,null,null,null,null,null,null,null,null,null],
							[null,null,null,null,null,null,null,null,null,null],
							[null,null,null,null,null,null,null,null,null,null],
							[null,null,null,null,null,null,null,null,null,null],
							[null,null,null,null,null,null,null,null,null,null],
							[null,null,null,null,null,null,null,null,null,null],
							[null,null,null,null,null,null,null,null,null,null],
							[null,null,null,null,null,null,null,null,null,null],
							[null,null,null,null,null,null,null,null,null,null],
							[null,null,null,null,null,null,null,null,null,null],
							[null,null,null,null,null,null,null,null,null,null],
							[null,null,null,null,null,null,null,null,null,null],
							[null,null,null,null,null,null,null,null,null,null],
							[null,null,null,null,null,null,null,null,null,null],
							[null,null,null,null,null,null,null,null,null,null]
						];

		var container = document.createElement("div");
		container.className = "container";
		document.body.appendChild(container);
		
		//游戏区域
		this.gameArea = document.createElement("div");
		this.gameArea.className = "gameArea";
		container.appendChild(this.gameArea);
		


		//游戏扩展区域
		this.extArea = document.createElement("div");
		this.extArea.className = "extArea";
		container.appendChild(this.extArea);
		
		//按钮区域
		var buttonTable = document.createElement("table");
		container.appendChild(buttonTable);
		

		buttonTr = document.createElement("tr");
		buttonTable.appendChild(buttonTr);

		buttonTd = document.createElement("td");
		buttonTr.appendChild(buttonTd);
		this.leftButton = document.createElement("button");
		this.leftButton.style.backgroundImage = 'url(image/left.png)';
		buttonTd.appendChild(this.leftButton);
	

		buttonTd = document.createElement("td");
		buttonTr.appendChild(buttonTd);
		this.rightButton = document.createElement("button");
		this.rightButton.style.backgroundImage = 'url(image/right.png)';
		buttonTd.appendChild(this.rightButton);

		buttonTd = document.createElement("td");
		buttonTd.className = "place";
		buttonTr.appendChild(buttonTd);

		buttonTd = document.createElement("td");
		buttonTr.appendChild(buttonTd);
		this.rotateButton1 = document.createElement("button");
		this.rotateButton1.style.backgroundImage = 'url(image/rotate-anti-clock.png)';
		buttonTd.appendChild(this.rotateButton1);


		var buttonTr = document.createElement("tr");
		buttonTable.appendChild(buttonTr);
		
		var buttonTd = document.createElement("td");
		buttonTd.colSpan = 2;
		buttonTr.appendChild(buttonTd);
		this.downButton = document.createElement("button");
		this.downButton.style.backgroundImage = 'url(image/down.png)';
		buttonTd.appendChild(this.downButton);

		buttonTd = document.createElement("td");
		buttonTd.className = "place";
		buttonTr.appendChild(buttonTd);

		buttonTd = document.createElement("td");
		buttonTr.appendChild(buttonTd);
		this.rotateButton2 = document.createElement("button");
		this.rotateButton2.style.backgroundImage = 'url(image/rotate-clock.png)';
		buttonTd.appendChild(this.rotateButton2);

		//最高得分区域标签
		var hiScoreLabel = document.createElement("div");
		hiScoreLabel.className = "contentLabel";
		hiScoreLabel.innerText = "HI-Score";
		this.extArea.appendChild(hiScoreLabel);

		//最高得分区域内容
		this.hiScoreArea = document.createElement("div");
		this.hiScoreArea.className = "contentArea";
		this.hiScoreArea.innerText = this.hiScore;
		this.extArea.appendChild(this.hiScoreArea);


		
		//下一方块区域
		var nextLabel = document.createElement("div");
		nextLabel.className = "contentLabel";
		nextLabel.innerText = "Next";
		this.extArea.appendChild(nextLabel);

		this.nextBlockArea = document.createElement("div");
		this.nextBlockArea.className = "nextBlockArea";
		this.extArea.appendChild(this.nextBlockArea);

		//信息区域

		//关卡区域标签
		var levelLabel = document.createElement("div");
		levelLabel.className = "contentLabel";
		levelLabel.innerText = "Level";
		this.extArea.appendChild(levelLabel);
		//关卡区域内容
		this.levelArea = document.createElement("div");
		this.levelArea.className = "contentArea";
		this.levelArea.innerText = this.level;
		this.extArea.appendChild(this.levelArea);

		//得分区域标签
		var scoreLabel = document.createElement("div");
		scoreLabel.className = "contentLabel";
		scoreLabel.innerText = "Score";
		this.extArea.appendChild(scoreLabel);

		//得分区域内容
		this.scoreArea = document.createElement("div");
		this.scoreArea.className = "contentArea";
		this.scoreArea.innerText = this.score;
		this.extArea.appendChild(this.scoreArea);

		//图片区域
		var img = document.createElement("img");
		img.src = "./image/img.jpeg";
		this.extArea.appendChild(img);

		document.addEventListener("visibilitychange", function() {
			if(document.hidden){
				this.pause();
			}else{
				this.resume();
			}
		}.bind(this));

		
		this.prepareBlock();
		this.newBlock();
		this.status = "active";
	}

	this.appendBlock = function(block){

		this.activeBlock = block;
		for(index = 0 ; index < 4 ; index++){
			this.gameArea.appendChild(block.getRect(index));
		}
		block.refreshPosition();
	}
	
	this.newBlock = function(){
		
		
		this.appendBlock(this.nextBlock);
		if(this.processId == -1)
			this.processId = window.setInterval(this.refresh.bind(this),LEVEL_ARRAY[this.level]);
		window.clearTimeout(this.actionTimerId);
		window.clearInterval(this.actionProcessId);
		this.actionProcessId = -1;
		this.actionTimerId = -1;
		this.prepareBlock();
	}
	

	this.prepareBlock = function(){
		
		var nextType = Math.floor(Math.random() * 7);
		var nextDirection = Math.floor(Math.random() * 4);
		this.nextBlock = new Block(nextType,nextDirection);


		//再将这一次的内容显示在上面
		for(index = 0 ; index < 4 ; index++){
			this.nextBlockArea.appendChild(this.nextBlock.getRect(index));
			this.nextBlock.getRect(index).style.left = 20 * this.nextBlock.getOffsetPosition(index).x + 'px';
			this.nextBlock.getRect(index).style.top = 20 * this.nextBlock.getOffsetPosition(index).y + 'px';
		}
	}

	this.pause = function(){
		if(this.status == "active"){
			this.bgAudio.pause();
			window.clearInterval(this.processId);
			this.processId = -1;
			this.status = "pause";
		}
	}

	this.resume = function(){
		if(this.status == "pause"){
			if(this.processId == -1)
				this.processId = window.setInterval(this.refresh.bind(this),LEVEL_ARRAY[this.level]);
			this.status = "active";
			this.bgAudio.play();
		}
	}

	

	this.refresh = function(){

		if(!this.activeBlock)
			return;

		if(this.activeBlock.move(DOWN,this.gameData)){
			return;
		}else{
			window.clearInterval(this.processId);
			this.processId = -1;
			//如果有方块放不下了，那么游戏结束了
			for(index = 0 ; index < 4 ; index++){
				if(this.activeBlock.getRealPosition(index).y < 0){
					window.clearTimeout(this.actionTimerId);
					window.clearInterval(this.actionProcessId);
					this.actionTimerId = -1;
					this.actionProcessId = -1;
					this.status = "end";
					this.bgAudio.pause();
					this.failAudio.play();
					//alert("游戏结束");
					return;
				}
				
				//将div放到gameData数组中
				this.gameData[this.activeBlock.getRealPosition(index).y][this.activeBlock.getRealPosition(index).x] = this.activeBlock.getRect(index);
			}
			//TODO:下面添加判断填满一行后消去的逻辑
			
			//保存已经处理过的行，用行数作为下标
			var done = [];

			//保存全满的行
			var needDeal = [];
			

			for(index = 0 ; index < 4 ; index++){
			
				if(done[this.activeBlock.getRealPosition(index).y]){
					continue;
				}

				var row = this.gameData[this.activeBlock.getRealPosition(index).y];
				var full = true;
				for(col = 0 ; col < 10 ; col++){
					if(!row[col]){
						full = false;
						break;
					}
				}
				done[this.activeBlock.getRealPosition(index).y] = 1;
				if(full){
					needDeal.push(this.activeBlock.getRealPosition(index).y);
					
				}
			}
			
			//从小到大排序
			needDeal.sort();
			
			var needRefreshPosition = false;
			//清空摆满的行
			for(index = 0 ; index < needDeal.length ; index++){
				needRefreshPosition = true;
				var row = this.gameData[needDeal[index]];
				//清空显示的方块
				for(col = 0 ; col < 10 ; col++){
					this.gameArea.removeChild(row[col]);
				}
				//清空数组中的数据
				this.gameData.splice(needDeal[index],1);
				//向数组头部插入一条数据
				this.gameData.unshift([null,null,null,null,null,null,null,null,null,null]);

			}

			if(needRefreshPosition){
				var maxRow = needDeal[needDeal.length - 1];
				this.refreshPosition(maxRow);
				//记分
				this.score = this.score + SCORE_ARRAY[needDeal.length];
				this.refreshScore();
				this.cleanAudio.play();

			}else{
				this.downAudio.play();
			}
			
			this.newBlock();
		}
	}
	
	this.refreshPosition = function(maxRow){
		
		for(index = maxRow;index>=0;index--){
			for(col = 0 ; col < 10 ; col++){
				var rect = this.gameData[index][col];
				if(rect){
					rect.style.top = index * 20 + 'px';
					rect.style.left = col * 20 + 'px';
				}
			}

		}
		
	}

	this.refreshScore = function(){

		this.scoreArea.innerText = this.score;
		if(this.score > this.hiScore){
			this.hiScore = this.score;
			localStorage.setItem("hi_score",this.hiScore);
			this.hiScoreArea.innerText = this.hiScore;
		}
		var newLevel = this.level;
		for(index = 9;index >=0;index--){
			if(LEVEL_SCORE_ARRAY[index] <= this.score){
				newLevel = index;
				break;
			}
		}

		if(newLevel != this.level){
			
			this.level = newLevel;
			this.refreshLevel();

		}


	}

	this.refreshLevel = function(){
		this.levelArea.innerText = this.level;
		this.changeBgMusic();
	}

/**
	window.addEventListener("keydown",function(){

			if(!this.activeBlock)
				return;
			
			//方向键的重复事件，不处理
			if(event.repeat
				&& (		event.keyCode == 37
							|| event.keyCode == 65
							|| event.keyCode == 40
							|| event.keyCode == 83
							|| event.keyCode == 39
							|| event.keyCode == 68))
				return;

			switch(event.keyCode){

				case 37:	case 65:
					this.activeBlock.move(LEFT,this.gameData);
				
					if(this.actionTimerId != -1 || this.actionProcessId != -1){
						window.clearTimeout(this.actionTimerId);
						window.clearInterval(this.actionProcessId);
						this.actionProcessId = window.setInterval(function(){

							this.activeBlock.move(LEFT,this.gameData);

						}.bind(this),10);

					}else{
					
						this.actionTimerId = window.setTimeout(function(){
							this.actionProcessId = window.setInterval(function(){

								this.activeBlock.move(LEFT,this.gameData);

							}.bind(this),10);
						}.bind(this),300);
					}
					this.actionCode = event.keyCode;
					break;
				case 40:	case 83:

					window.clearTimeout(this.actionTimerId);
					window.clearInterval(this.actionProcessId);
					this.actionTimerId = -1;

					this.activeBlock.move(DOWN,this.gameData);
					this.actionProcessId = window.setInterval(function(){

						this.activeBlock.move(DOWN,this.gameData);

					}.bind(this),20);
					this.actionCode = event.keyCode;
					break;
				case 39:	case 68:
					this.activeBlock.move(RIGHT,this.gameData);
					if(this.actionTimerId != -1 || this.actionProcessId != -1){

						window.clearTimeout(this.actionTimerId);
						window.clearInterval(this.actionProcessId);

						this.actionTimerId = -1;
						this.actionProcessId = window.setInterval(function(){

							this.activeBlock.move(RIGHT,this.gameData);

						}.bind(this),10);

					}else{
					
						this.actionTimerId = window.setTimeout(function(){
							this.actionProcessId = window.setInterval(function(){

								this.activeBlock.move(RIGHT,this.gameData);

							}.bind(this),10);
						}.bind(this),300);
					}
					this.actionCode = event.keyCode;
					break;
				case 74:
					this.activeBlock.rotate(ANTI_CLOCKWISE,this.gameData);
					break;
				case 75:
					this.activeBlock.rotate(CLOCKWISE,this.gameData);
					break;
				default:
					break;
			}
	}.bind(this));

	window.addEventListener("keyup",function(){
	
		//如果keyup事件对应的键代码，与上一个记录的键代码不一致，则不作处理
		if(this.actionCode != event.keyCode){
			return;
		}

		if(		event.keyCode == 37
			|| event.keyCode == 65
			|| event.keyCode == 40
			|| event.keyCode == 83
			|| event.keyCode == 39
			|| event.keyCode == 68){

			window.clearTimeout(this.actionTimerId);
			window.clearInterval(this.actionProcessId);
			this.actionProcessId = -1;
			this.actionTimerId = -1;
		}
		
	}.bind(this));
*/

	

	this.initAudio = function(){
		
		this.bgAudio = new Audio(BG_MUSIC_ARRAY[this.level]);
		this.bgAudio.loop = 'loop';
		this.changeBgMusic();

		this.moveAudio = new Audio('sound/move.ogg');
		this.downAudio = new Audio('sound/down.ogg');
		this.cleanAudio = new Audio('sound/clean.ogg');
		this.failAudio = new Audio('sound/fail.mp3');
		this.rotateAudio = new Audio('sound/rotate.ogg');

	}

	this.changeBgMusic = function(){

		this.bgAudio.pause();
		this.bgAudio.src = BG_MUSIC_ARRAY[this.level];
		this.bgAudio.play();
	}
	
	this.init();

	this.initAudio();

	this.leftButton.onmousedown = this.leftButton.ontouchstart = function(){

		if(this.status != "active")
			return;

		this.leftButton.style.backgroundColor = "#0FF";
		this.moveAudio.play();
		this.activeBlock.move(LEFT,this.gameData);
				
		if(this.actionTimerId != -1 || this.actionProcessId != -1){
			window.clearTimeout(this.actionTimerId);
			window.clearInterval(this.actionProcessId);
			this.actionProcessId = window.setInterval(function(){
				this.moveAudio.play();
				this.activeBlock.move(LEFT,this.gameData);

			}.bind(this),10);

		}else{
		
			this.actionTimerId = window.setTimeout(function(){
				this.actionProcessId = window.setInterval(function(){
					this.moveAudio.play();
					this.activeBlock.move(LEFT,this.gameData);

				}.bind(this),10);
			}.bind(this),300);
		}
		this.actionCode = LEFT;

	}.bind(this);

	this.leftButton.onmouseup = this.leftButton.ontouchend = function(){
		
		if(this.status != "active")
			return;
		
		this.leftButton.style.backgroundColor = "#FFF";

		if(this.actionCode != LEFT){
			return;
		}
		
		window.clearTimeout(this.actionTimerId);
		window.clearInterval(this.actionProcessId);
		this.actionProcessId = -1;
		this.actionTimerId = -1;
	}.bind(this);


	this.rightButton.onmousedown = this.rightButton.ontouchstart = function(){

		if(this.status != "active")
			return;

		this.rightButton.style.backgroundColor = "#0FF";
		this.moveAudio.play();
		this.activeBlock.move(RIGHT,this.gameData);
				
		if(this.actionTimerId != -1 || this.actionProcessId != -1){
			window.clearTimeout(this.actionTimerId);
			window.clearInterval(this.actionProcessId);
			this.actionProcessId = window.setInterval(function(){
				this.moveAudio.play();
				this.activeBlock.move(RIGHT,this.gameData);

			}.bind(this),10);

		}else{
		
			this.actionTimerId = window.setTimeout(function(){
				this.actionProcessId = window.setInterval(function(){
					
					this.activeBlock.move(RIGHT,this.gameData);

				}.bind(this),10);
			}.bind(this),300);
		}
		this.actionCode = RIGHT;

	}.bind(this);

	this.rightButton.onmouseup = this.rightButton.ontouchend = function(){

		if(this.status != "active")
			return;

		this.rightButton.style.backgroundColor = "#FFF";
		if(this.actionCode != RIGHT){
			return;
		}
		
		window.clearTimeout(this.actionTimerId);
		window.clearInterval(this.actionProcessId);
		this.actionProcessId = -1;
		this.actionTimerId = -1;
	}.bind(this);

	this.downButton.onmousedown = this.downButton.ontouchstart = function(){

		if(this.status != "active")
			return;

		this.downButton.style.backgroundColor = "#0FF";
		window.clearTimeout(this.actionTimerId);
		window.clearInterval(this.actionProcessId);
		window.clearInterval(this.processId);
		this.actionTimerId = -1;
		this.processId = -1;
		this.moveAudio.play();
		this.refresh();

		this.actionProcessId = window.setInterval(function(){
			this.moveAudio.play();
			this.refresh();

		}.bind(this),20);
		this.actionCode = DOWN;
	}.bind(this);

	this.downButton.onmouseup = this.downButton.ontouchend = function(){

		if(this.status != "active")
			return;

		this.downButton.style.backgroundColor = "#FFF";
		if(this.actionCode != DOWN){
			return;
		}
		window.clearTimeout(this.actionTimerId);
		window.clearInterval(this.actionProcessId);
		this.actionProcessId = -1;
		this.actionTimerId = -1;

		if(this.processId == -1)
			this.processId = window.setInterval(this.refresh.bind(this),LEVEL_ARRAY[this.level]);

	}.bind(this);
	
	this.rotateButton1.onmousedown = this.rotateButton1.ontouchstart = function(){

		if(this.status != "active")
			return;
		this.rotateAudio.play();

		this.rotateButton1.style.backgroundColor = "#0FF";
		this.activeBlock.rotate(ANTI_CLOCKWISE,this.gameData);
	}.bind(this);

	this.rotateButton2.onmousedown = this.rotateButton2.ontouchstart = function(){

		if(this.status != "active")
			return;
		this.rotateAudio.play();
		this.rotateButton2.style.backgroundColor = "#0FF";
		this.activeBlock.rotate(CLOCKWISE,this.gameData);
	}.bind(this);

	this.rotateButton1.onmouseup = this.rotateButton1.ontouchend = function(){

		if(this.status != "active")
			return;

		this.rotateButton1.style.backgroundColor = "#FFF";
	}.bind(this);

	this.rotateButton2.onmouseup = this.rotateButton2.ontouchend = function(){

		if(this.status != "active")
			return;

		this.rotateButton2.style.backgroundColor = "#FFF";
	}.bind(this);

	window.ontouchstart = function(e) { e.preventDefault(); };

}