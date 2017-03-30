<!DOCTYPE html>
<html lang="en">
<head>
<title>Framework Core Indonesia</title>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="keywords" content="Flamecore, Framework Core, Core CSS, Templates with Core, Framework CSS Indonesia,
Framework Indonesia, Core, Core Column, Core Color">
<meta name="description" content="Framework CSS with Library Colors Indonesia">
<meta name="author" content="Andika Chamberlin">
<link rel="icon" href="getcore.github.io/images/icore.png" type="image/x-icon">
<link rel="stylesheet" href="getcore.github.io/core/core.css" type="text/css">
<link rel="stylesheet" href="core/core.css" type="text/css">
<link href="https://fonts.googleapis.com/css?family=Averia+Sans+Libre|Finger+Paint" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Averia+Sans+Libre" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-89516576-3', 'auto');
  ga('send', 'pageview');

</script>
<style>
.font{font-family: 'Finger Paint', cursive;}
.font2{font-family: 'Averia Sans Libre', cursive;}
.navbar a{color:#fff}
</style>
</head>
<body>
	<div class="container-full">
		<!-- Navbar -->
		<div class="row">
			<div class="column eq12">
				<ul class="navbar navbar-crimson bg-darkslategray box-shadow animation-top fixed-top">
					<li class="hm hl">
						<div class="dropdown">
							<a onclick="dropdown()"><i class="fa fa-bars dropdown-button"></i></a>
							<div id="dropdownMenu" class="dropnav-content bg-darkslategray box-shadow">
								<a href="index.php">Core</a>
								<a href="learn.php">Learn</a>
								<a href="column.php">Column</a>
								<a href="color.php">Color</a>
								<a href="js.php">JS</a>
								<a href="templates.php">Templates</a>
								<a href="author.php">Author</a>
							</div>
						</div>
					</li>
					<li class="bg-crimson hs"><a href="/core/index.php">Core</a></li>
					<li class="hs"><a href="/core/index.php?page=learn">Learn</a></li>
					<li class="hs"><a href="/core/index.php?page=column">Column</a></li>
					<li class="hs"><a href="/core/index.php?page=color">Color</a></li>
					<li class="hs"><a href="/core/index.php?page=js">JS</a></li>
					<li class="hs"><a href="/core/index.php?page=templates">Templates</a></li>
					<li class="right hs">
						<a href="/core/index.php?page=author">
							Author
						</a>
					</li>
				</ul>
			</div>
		</div>
		<!-- End Navbar -->

		<!-- Content -->
		<?php
			if(isset($_GET['page'])){
				$page=$_GET['page'];
						
			if($page=='learn'){
					include_once("page/learn.php");
					}
					else if($page=='column'){
						include_once("page/column.php");
					}
					else if($page=='color'){
						include_once("page/color.php");
					}
					else if($page=='js'){
						include_once("page/js.php");
					}
					else if($page=='templates'){
						include_once("page/templates.php");
					}
					else if($page=='author'){
						include_once("page/author.php");
					}
				}

			else{
				include_once("page/home.php");
			}

		?>
	
		<!-- End Content -->
	</div>
</body>
<script>
function dropdown() {
    document.getElementById("dropdownMenu").classList.toggle("show");
}

window.onclick = function(event) {
	if (!event.target.matches('.dropdown-button')) {

    var dropdowns = document.getElementsByClassName("dropnav-content");
    var i;
	for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
</script>
</html>