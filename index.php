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
		span{
			cursor: pointer;
			font-size: 20px;
			font-weight: bold;
			color: #b49d00;
			text-decoration: none;
		}
		span:hover{
			text-decoration: underline;
		}
	</style>
</head>
<body>
	<h1>The Space Impact</h1>
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