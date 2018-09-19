<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>The Space Impact</title>
	<style>
		*{
			font-family: sans-serif;
			margin: 0px;
			padding: 0px;
		}
		body{
			background-color: #000;
			text-align: center;
		}
		h1{
			color: #0b96be;
			font-size: 50px;
			margin: 100px 0 30px 0;
		}
		span#play{
			border: 2px solid #0b96be;
			color: #b49d00;
			cursor: pointer;
			font-size: 20px;
			font-weight: bold;
			padding: 10px;
		}
		span#play:hover{
			background-color: #0b96be;
			text-shadow: 2px 1px 4px #000;
		}
		div#controls{
			border: 2px solid #b49d00;
			height: 150px;
			padding: 10px;
			margin: 50px auto 40px auto;
			width: 400px;
		}
		h2{
			color: #0b96be;
			margin: 5px 0px 20px 0px;
		}
		div#controls .ctrl_list{
			color: #b49d00;
			display: block;
			font-size: 20px;
			font-weight: bold;
			margin-bottom: 30px;
		}
	</style>
</head>
<body>
	<h1>The Space Impact</h1>

	<div id="controls">
		<h2>- CONTROLS -</h2>
		<span class="ctrl_list">Fire / Shoot -&nbsp; (Space Bar)</span>
		<span class="ctrl_list">Movement -&nbsp; (Arrow Keys)</span>
	</div>

	<span id="play">Play Space Impact II</span>

	<script>
		var play = document.getElementById('play');

		play.addEventListener('click', play_space_impact,true);

		function play_space_impact() {
			window.open('The_space_impact/views/space_impact.php');
		}
	</script>
</body>
</html>