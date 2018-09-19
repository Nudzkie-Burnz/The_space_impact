<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Space Impact</title>
	<link rel="stylesheet" href="../assets/css/space_impact.css">
	<script src="../assets/js/space_impact.js"></script>
</head>
<body>
	<div id="game_container" class="display_none">
		<div id="hero"></div>
		<div id="enemy_bug"></div>
		<div id="enemy_drone"></div>
		<div id="missiles"></div>
		<div id="enemy_backfire"></div>
		<div id="score_container">Score: <span id="score">0</span>
		</div>
		<div id="hero_life_container">
			<span class="life">Life:</span>
			<ul id="life_num">
			</ul>
		</div>
		<div id="boss1"></div>
		<div id="boss_missile_container"></div>
		<span id="victory">VICTORY!</span>
	</div>

	<div id="restart_game" class="display_none">
		<div id="restart_menu">
			<h1 class="game_over_title">Game Over</h1>
			<div id="final_score_container">Score: 
				<span id="final_score">0</span>
			</div>
			<div id="restart_option">
				<h3>Ouch! Try again</h3>
				<span id="gameOver_ok" class="ok">Ok</span>
			</div>
		</div>
	</div>

	<div id="wrapper">
		<h1 id="game_title">Space Impact I/O</h1>
		<div id="menu_container">
			<ul id="game_menu">
				<li id="new_game" class="game_menu_list">Start Game</li>
				<li id="about_game" class="game_menu_list">About</li>
				<li id="exit_game" class="game_menu_list">Exit</li>
			</ul>
			<div id="game_loader" class="display_none"></div>
			<span id="loading" class="display_none">Loading....</span>
		</div>	
	</div>

	<div id="victory_container" class="display_none">
		<div id="contents">
			<h1>You Are Victorious!</h1>
			<div id="victory_score_container">Score: &nbsp;
				<span id="victory_score" class="victory">&nbsp;0</span>
			</div>
			<span id="victory_exit" class="ok">Exit</span>
		</div>
	</div>
</body>
</html>