
var game_world = document.querySelector('#game_container');
// var hero = document.querySelector('#hero');
var hero = document.getElementById('hero');
var bugs = document.querySelector('#enemy_bug').children;
var hero_life = document.querySelector('.lifes');
var heroLife = [0,1,2];
var hero_rem_life = 3;
var missile = [];
var score = 0;

var hero_obj = {
	x : 0,
	y : 0,
	score : 0,
	life : 3
}

// var bugsArr = [];

var enemy_bug = [
	{x: 2000, y: 50,  life: 2, id: 0}, 
	{x: 1850, y: 150, life: 2, id: 1}, 
	{x: 1700, y: 280, life: 2, id: 2}, 
	{x: 1850, y: 400, life: 2, id: 3}, 
	{x: 2000, y: 500, life: 2, id: 4}	
];

var enemy_drone = [
	{x: 2500, y: 50, life: 5, id: 0}, 
	{x: 2900, y: 300, life: 5, id: 1}, 
	{x: 2500, y: 550, life: 5, id: 2}
];

var requestanimation = 	window.requestAnimationFrame ||
						window.mozRequestAnimationFrame ||
						window.webkitRequestAnimationFrame ||
						window.msRequestAnimationFrame;

game_world.addEventListener('mousemove', move_hero, true);

var herox = '';
var heroy = '';

function move_hero(e) {
	var reposition = getPosition(game_world);
	var xpos = e.clientX - reposition.x - (hero.offsetWidth -35);
	var ypos = e.clientY - reposition.y - (hero.offsetHeight +285);

	
	herox = xpos; //setting up to global variable
	heroy = ypos; //setting up to global variable

	hero.style.transform = 'translate3d('+xpos+'px, '+ypos+'px, 0px)';

	if (xpos > 800) {
		hero.style.transform = 'translate3d('+800+'px, '+ypos+'px, 0px)';
	}
}

function getPosition(el) {
	var xPosition = 0;
	var yPosition = 0;

	while (el) {
	if (el.tagName == "BODY") {
		// deal with browser quirks with body/window/document and page scroll
		var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
		var yScrollPos = el.scrollTop || document.documentElement.scrollTop;

		xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
		yPosition += (el.offsetTop - yScrollPos + el.clientTop);
	} else {
		xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
		yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
	}

	el = el.offsetParent;
	}
	return {
		x: xPosition,
		y: yPosition
	};
}

function project_enemyBug() {
	enemy1 = '';

	for(var z = 0; z<enemy_bug.length; z++){
		let bug_state = (enemy_bug[z].life == 0) ? 'destroyed' : 'alive';
		
		enemy1 += '<div id="bug_'+ z +'" class="enemy_bugs '+ bug_state +'" style="top:'+ enemy_bug[z].y +'px; left:'+ enemy_bug[z].x +'px;">\n \
					<ul id="enemy_health" data-id="'+ z +'">';

		/*	loop to show life remaining	*/
		for(var life = 0; life < enemy_bug[z].life ; life ++)
		{
			enemy1 += '<li class="enemy_barHealth health1"></li>\n';
		}

		enemy1 += '</ul>\n \
				</div>\n';
	}

	document.querySelector('#enemy_bug').innerHTML = enemy1;
}

function move_enemyBugs(){
    for (var i = 0; i<enemy_bug.length; i++) {
        enemy_bug[i].x -= 2;

        if (enemy_bug[i].x < -200){
            enemy_bug[i].x = 1700;
            enemy_bug[i].y = Math.random()*450; /*	use the browser height as reference	*/
        }
    }
}

function projectEnemyDrones() {
	enemy2 = '';

	for (var i = 0; i <enemy_drone.length; i++) {
		enemy2 += '<div class="enemy_drones" style="top:'+enemy_drone[i].y+'px; left:'+enemy_drone[i].x+'px;"></div>'
	}

	document.querySelector('#enemy_drone').innerHTML = enemy2;
}

function move_enemyDrones(){
    for (var i = 0; i<enemy_drone.length; i++) {
        enemy_drone[i].x -= 2;

        if (enemy_drone[i].x < -150){
            enemy_drone[i].x = 1700;
            enemy_drone[i].y = Math.random()*450;
        }
    }
}

	
function moveEnemies() {

	project_enemyBug();
	move_enemyBugs();

	if (score >= 1000) {
		move_enemyDrones();
		projectEnemyDrones();
	}

	requestanimation(moveEnemies);
}
moveEnemies();


function projectmissile() {
	output ='';

	for(var i = 0; i<missile.length; i++){
		output+= '<div class="missile" style="top:'+missile[i].y+'px; left:'+missile[i].x+'px;"></div>\n';
	}

	document.querySelector('#missiles').innerHTML = output;	
}

document.addEventListener('click', launch, true);

function hero_gun_effects() {
	var hero_gun = new Audio('../assets/sounds/gun_shot_hero.mp3');

	hero_gun.play();
}

function launch(heroX, heroY) {
	missile.push({x: herox + 170, y:heroy +387});
	// hero_gun_effects();
	projectmissile();
}

function movemissiles() {
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

function missile_collision() {
	
    for (var i = 0; i<missile.length; i++) {
        for (var z = 0; z<enemy_bug.length; z++) {
        	if( enemy_bug.indexOf(z) )
        	{
        		if( (missile[i].x+5 >= enemy_bug[z].x + 50) 
	        		&& (missile[i].y + 5 >= enemy_bug[z].y + 10 && missile[i].y + 3 <= enemy_bug[z].y + 70) ) {
	        		missile.splice(i, 1);
	        		enemy_bug[z].life--;

	    			if (enemy_bug[z].life == 1) {
					// var enem_health = bugs[z].children[0].children[1];
						if (bugs[z].getAttribute('id') == enemy_bug[z].id) {
							var enemy_explode = bugs[z];
						}
					}

					if (enemy_bug[z].life == 0) {
						enemy_bug.splice(z, 1);
						enemy_explosion_effects();
						score += 100;
					}
	    	   	}
        	}
        }
    }
}

function missile_collision_Drone() {
	
    for (var i = 0; i < missile.length; i++) {
        for (var z = 0; z<enemy_drone.length; z++) {

        	if((missile[i].x + 5 >= enemy_drone[z].x +85) 
        		&& (missile[i].y+5 >= enemy_drone[z].y +10 && missile[i].y+3 <= enemy_drone[z].y+70)) {
        		missile.splice(i, 1);
 				enemy_drone[z].life --;

 				if (enemy_drone[z].life == 0) {
					enemy_drone.splice(z, 1);
					// enemy_explosion_effects();
					score+=300;
				}
        	}
        }
    }
}

function enemy_return() {
	//return bug enemies
	if (enemy_bug.length == 0) {
		enemy_bug.push(
			{x: 2500, y: Math.random()*630,  life:2, id: 0}, 
			{x: 1850, y: Math.random()*630,  life:2, id: 1}, 
			{x: 1700, y: Math.random()*630,  life:2, id: 2}, 
			{x: 1850, y: Math.random()*630,  life:2, id: 3}, 
			{x: 2000, y: Math.random()*630,  life:2, id: 4}, 
			{x: 1980, y: Math.random()*630,  life:2, id: 5}, 
			{x: 2300, y: Math.random()*630,  life:2, id: 6},
			{x: 3000, y: Math.random()*630,  life:2, id: 7},
			{x: 2800, y: Math.random()*630,  life:2, id: 8},
			{x: 2350, y: Math.random()*630,  life:2, id: 9}
		);
	}
	//return drone enemies
	if (enemy_drone.length == 0) {
		enemy_drone.push(
			{x: 5500, y: Math.random()*600,  life:5, id: 0}, 
			{x: 4200, y: Math.random()*600,  life:5, id: 1}, 
			{x: 4400, y: Math.random()*600,  life:5, id: 2},
			{x: 3800, y: Math.random()*600,  life:5, id: 4},
			{x: 3000, y: Math.random()*600,  life:5, id: 5}
		);
	}
}

function projectHero_Life() {
	heart = '';
	
	for (var i = 0; i < hero_rem_life; i++) {
		heart += '<li class="lifes">❤️</li>';
	}

	document.querySelector('#life_num').innerHTML = heart;
}

function hero_collision() {
	var heroPos = hero.getBoundingClientRect();
	var heroY = heroPos.y +40;
	var heroFinalX = heroPos.x + 110;
	var heroFinalY = heroPos.y + 80;
	
	for(var y=0; y<enemy_bug.length; y++) {
		if ( (heroFinalX >= enemy_bug[y].x +40 
			&& heroFinalX <= enemy_bug[y].x +170) 
			&& (heroY >= enemy_bug[y].y 
			&& enemy_bug[y].y +80 >= heroY)) {
			
			hero_rem_life--;

			// for (var i = 0; i < heroLife.length; i++) {
			// 	heroLife.splice(heroLife.length-1,1);
			// }

			console.log(hero_rem_life);

			if(hero_rem_life == 0)
			{
				hero.classList.add('explode');
			}

			// hero.classList.add('explode');
			// setInterval(dissapear_hero, 2000);
			// enemy_explosion_effects();
			// console.log(hero_life.length);
		}
	}
}

function dissapear_hero() {
	hero.style.transition = 'all 100s ease-in';
	hero.style.opacity = '0';
}

function project_score() {
	document.querySelector('#score').innerHTML = score;
}

function gameloop() {
	missile_collision();
	enemy_return();
	hero_collision();
	missile_collision_Drone();

	project_score();
	projectHero_Life();

	movemissiles();
	projectmissile();
}

/*	change to setTimeout	*/
 setInterval(gameloop, 16.67);

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
	- use keyboard-driven controls
	- use Hero object
	- generate enemies using looping statements
	- implement enemies shooting back at player
	- implement different Boss enemies
*/