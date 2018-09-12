
var game_world = document.querySelector('#game_container');
var hero = document.getElementById('hero');
var bugs = document.querySelector('#enemy_bug').children;
var hero_life = document.querySelector('.lifes');
var missile = [];
var enemy_missiles = [];
var score = 0;

var hero_obj = {
	x : 50,
	y : 300,
	score : 0,
	life : 3
}

var enemy_bug = [
	{x: 2000, y: 50,  life: 2}, 
	{x: 1850, y: 150, life: 2}, 
	{x: 1700, y: 280, life: 2}, 
	{x: 1850, y: 400, life: 2}, 
	{x: 2000, y: 500, life: 2}	
];

var enemy_drone = [
	{x: 2500, y: 50, life: 5}, 
	{x: 2900, y: 300, life: 5}, 
	{x: 2500, y: 550, life: 5}
];

var requestanimation = 	window.requestAnimationFrame ||
						window.mozRequestAnimationFrame ||
						window.webkitRequestAnimationFrame ||
						window.msRequestAnimationFrame;

function displayHero() {
	document.getElementById('hero').style.top = hero_obj.y +'px';
	document.getElementById('hero').style.left = hero_obj.x +'px';
}

var heroId = document.getElementById('hero');

document.onkeydown = function (e) {

	if (e.keyCode == 37) {
        hero_obj.x -= 30;

        if (hero_obj.x <= -15) {
        	hero_obj.x = -15;
        }
    }
    else if (e.keyCode == 38) {
       	hero_obj.y -= 30;

       	if (hero_obj.y <= 0) {
       		hero_obj.y = 0;
       	}
    }
    else if (e.keyCode == 39) {
        hero_obj.x += 30;

        if (hero_obj.x >= 950) { 
        	hero_obj.x = 950;    //boundery set for boss area
        }
    }
    else if (e.keyCode == 40) {	
        hero_obj.y += 30;

        if (hero_obj.y >= 640) {
        	hero_obj.y = 640;
        }
    }
    else if (e.keyCode == 32) {	
        missile.push(
    	{
    		x: hero_obj.x + 90, 
    		y:hero_obj.y + 5
    	});

		// hero_gun_effects();
		move_hero_missiles();
    }
    displayHero();
}


function project_enemybugs() {
	enemy1 = '';

	for(var z = 0; z<enemy_bug.length; z++){
		let bug_state = (enemy_bug[z].life == 0) ? 'destroyed' : 'alive';
		
		enemy1 += '<div id="bug_'+ z +'" class="enemy_bugs '+ bug_state +'" style="top:'+ enemy_bug[z].y +'px; left:'+ enemy_bug[z].x +'px;">\n \
					<ul id="enemy_health">';

		/*	loop to show life remaining	*/
		for(var life = 0; life < enemy_bug[z].life ; life ++)
		{
			enemy1 += '<li class="enemy_barHealth"></li>\n';
		}

		enemy1 += '</ul>\n \
				</div>\n';
	}

	document.querySelector('#enemy_bug').innerHTML = enemy1;
}

function move_bug_enemies(){
    for (var i = 0; i<enemy_bug.length; i++) {
        enemy_bug[i].x -= 2;

       	if (enemy_bug[i].x < -200){
            enemy_bug[i].x = 1700;
            enemy_bug[i].y = Math.random()*document.body.clientHeight; /*	use the browser height as reference	*/
        }
    }
}

function project_enemy_drones() {
	enemy2 = '';

	for (var i = 0; i < enemy_drone.length; i++) {
		enemy2 += '<div class="enemy_drones" style="top:'+enemy_drone[i].y+'px; left:'+enemy_drone[i].x+'px;"></div>'
	}

	document.querySelector('#enemy_drone').innerHTML = enemy2;
}

function move_enemy_drones(){
    for (var i = 0; i<enemy_drone.length; i++) {
        enemy_drone[i].x -= 2;

        if (enemy_drone[i].x < -150){
            enemy_drone[i].x = 1700;
            enemy_drone[i].y = Math.random()*450;
        }
    }
}

function enemy_bugs_backFire() {
	var enemy_bullet = '';

	for (var i = 0; i < enemy_missiles.length; i++) {
		enemy_bullet += '<div class="enem_bullets" style="top:' + enemy_missiles[i].y + 'px; left:' + enemy_missiles[i].x + 'px;"></div>';
	}
	
	document.getElementById('enemy_backfire').innerHTML = enemy_bullet;
}


function enemy_bug_missile_move() {
	for (var i = 0; i < enemy_missiles.length; i++) {
        enemy_missiles[i].x -= 3;

       	if (enemy_missiles[i].x < -50){
            enemy_missiles.splice(i, 1);
        }
    }
}

function enemy_bug_backfire_timeout() {
	setTimeout(function () {
		
		for (var i = Math.floor((Math.random() * enemy_bug.length) + 1); i < enemy_bug.length; i++) {
			enemy_missiles.push({
	      		x: enemy_bug[i].x + 50, 
	      		y: enemy_bug[i].y + 30,
	      	});
		}

        enemy_bug_backfire_timeout();
    }, 5000);	
}
enemy_bug_backfire_timeout();

function project_hero_missile() {
	output ='';

	for(var i = 0; i<missile.length; i++){
		output+= '<div class="missile" style="top:'+missile[i].y+'px; left:'+missile[i].x+'px;"></div>\n';
	}

	document.querySelector('#missiles').innerHTML = output;	
}

function hero_gun_effects() {
	var hero_gun = new Audio('../assets/sounds/gun_shot_hero.mp3');

	hero_gun.play();
}

function move_hero_missiles() {
	for (var i = 0; i<missile.length; i++) {
        missile[i].x += 5;

        if (missile[i].x > 1400) {
            missile[i] = missile[missile.length-1];
            missile.pop();
        }
    }
}

function enemy_explosion_effects() {
	var enemy_explosion = new Audio('../assets/sounds/explode_enemy.mp3');

	enemy_explosion.play();
}

function missile_collision_Bugs() {
	
    for (var i = 0; i<missile.length; i++) {
        for (var z = 0; z<enemy_bug.length; z++) {
        	if( enemy_bug.indexOf(z) ){
        		if( (missile[i].x+5 > enemy_bug[z].x + 20 && missile[i].x + 5 <= enemy_bug[z].x + 40 ) 
	        		&& (missile[i].y + 5 >= enemy_bug[z].y + 10 && missile[i].y + 3 <= enemy_bug[z].y + 70) ) {
	        
	        		missile[i].x = 1400;
	        		enemy_bug[z].life--;

	    			if (enemy_bug[z].life == 1) {
						if (bugs[z].getAttribute('id') == enemy_bug[z].id) {
							var enemy_explode = bugs[z];
						}
					}

					if (enemy_bug[z].life == 0) {
						enemy_bug.splice(z, 1);
						// enemy_explosion_effects();
						hero_obj.score +=100;
					}
	    	   	}
        	}
        }
    }
}

function missile_collision_Drones() {
	
    for (var i = 0; i < missile.length; i++) {
        for (var z = 0; z<enemy_drone.length; z++) {

        	if((missile[i].x + 5 > enemy_drone[z].x && missile[i].x + 5 <= enemy_drone[z].x + 80) 
        		&& (missile[i].y+5 >= enemy_drone[z].y +10 && missile[i].y+3 <= enemy_drone[z].y+70)) {
        		missile[i].x = 1400;
 				enemy_drone[z].life --;

 				if (enemy_drone[z].life == 0) {
					enemy_drone.splice(z, 1);
					// enemy_explosion_effects();
					hero_obj.score +=300;
				}
        	}
        }
    }
}

function enemy_return() {
	
	//return bug enemies
	if (enemy_bug.length == 0) {

		for (var i = 0; i < 10; i++) {
			enemy_bug.push({ 
				x: Math.floor((Math.random() * 3000) + 2000), 
				y: Math.random() * 634,  
				life:2
			});
		}
	}
	
	//return drone enemies
	if (enemy_drone.length == 0) {
		for (var i = 0; i < 5; i++) {
			enemy_drone.push({ 
				x: Math.floor((Math.random() * 3000) + 2500), 
				y: Math.random() * 634,  
				life:5
			});
		}
	}
}


function project_hero_Life() {
	heart = '';
	
	for (var i = 0; i < hero_obj.life; i++) {
		heart += '<li class="lifes" data-id="'+ i +'">❤️</li>';
	}

	document.querySelector('#life_num').innerHTML = heart;
}

function hero_collision() {
	var heroPos = hero.getBoundingClientRect();
	var heroY = heroPos.y +40;
	var heroFinalX = heroPos.x + 110;
	var heroFinalY = heroPos.y + 80;
	var Hero_rem_life = document.getElementById('life_num').children;
	
	for(var y=0; y<enemy_bug.length; y++) {
		if ( (heroFinalX >= enemy_bug[y].x +40 && heroFinalX <= enemy_bug[y].x +170) 
		&& (heroY >= enemy_bug[y].y && enemy_bug[y].y +80 >= heroY)) {

			hero_obj.life --;
		}
	}
}

function hero_enemyMissileCollide() {
	var heroPos = hero.getBoundingClientRect();
	var heroY = heroPos.y +40;
	var heroFinalX = heroPos.x + 80;
	var heroFinalY = heroPos.y + 80;

	for (var i = 0; i < enemy_bug.length; i++) {
		for (var x = 0; x < enemy_missiles.length; x++) {
			
			if ( (enemy_missiles[x].x <= heroFinalX && heroPos.x <= enemy_missiles[x].x) 
				&& enemy_missiles[x].y + 8 > heroPos.y && heroFinalY > enemy_missiles[x].y + 8){
				console.log('hit');
			}
		}
	}
}



function project_score() {
	document.querySelector('#score').innerHTML = hero_obj.score;
}

function moveEnemies() {
	enemy_bugs_backFire(); //Enemy shooots back
	enemy_bug_missile_move(); //Enemy Missile move
	move_bug_enemies(); //Move Enemies
	project_enemybugs(); // Project the bug enemies

	displayHero(); //Display the space hero
	move_hero_missiles(); //Hero Missile moves
	project_hero_missile(); //Project the hero missile

	project_hero_Life(); //Projects the hero life
	project_score(); //Project the score

	if (hero_obj.score >= 1000) {
		move_enemy_drones();
		project_enemy_drones();
	}

	requestanimation(moveEnemies); // Request animation frame for the game
}
moveEnemies();

function setGameloop() {
    setTimeout(function () {  //Game logic loop changed to setTimeout to prevent data garbage collection
    	
    	missile_collision_Bugs(); 
		missile_collision_Drones();
		hero_collision();

		hero_enemyMissileCollide();
       	
    	enemy_return();

        setGameloop();
    }, 50);
}
setGameloop()
 

 /*	COMMENTS	*/
/*
	- make variables and function names more readable
	- add spacing between variables and operands (e.g. <= , == , >=)
	- separate diplay code from logic code
*/

/*	ISSUES SOLVED BY INSTRUCTOR	*/
/*
	- enemy bug life checking and handling upon collision with missiles
	- implemented hero life checking and rendering
*/

/*	GOALS:	*/
/*	
	- use keyboard-driven controls done!
	- use Hero object done!
	- generate enemies using looping statements done!
	- implement enemies shooting back at player done!
	- implement different Boss enemies
*/