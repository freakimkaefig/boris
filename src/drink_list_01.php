﻿<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="">
<link rel="shortcut icon" href="../../docs-assets/ico/favicon.png">
<title>Jumbotron Template for Bootstrap</title>

<!-- Bootstrap core CSS -->
<link href="css/bootstrap.css" rel="stylesheet">

<!-- Custom styles for this template -->
<link href="css/common.css" rel="stylesheet">

<!-- Just for debugging purposes. Don't actually copy this line! -->
<!--[if lt IE 9]><script src="../../docs-assets/js/ie8-responsive-file-warning.js"></script><![endif]-->

<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
<style type="text/css"></style>
</head>

<body style="">
<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
  <div class="container">
    <div class="navbar-header"> <a class="navbar-brand" href="#"> <img src="img/logo_boris.png" class="img img-responsive" alt="Responsive image"> </a> </div>
    <ul class="nav navbar-nav navbar-right">
      <li class="dropdown"> <a href="#" class="dropdown-toggle" data-toggle="dropdown">
        <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-filter"></span></button>
        <!--Dropdown <b class="caret"></b>--> 
        </a>
        <ul class="dropdown-menu">
          <li class="dropdown-header">Taste</li>
          <li>
            <div class="input-group"> <span class="input-group-addon">
              <input type="checkbox" />
              Sweet </span> <br />
              <span class="input-group-addon">
              <input type="checkbox" />
              Fruity </span> <span class="input-group-addon">
              <input type="checkbox" />
              Very sour </span> <span class="input-group-addon">
              <input type="checkbox" />
              Bitter </span> </div>
          </li>
          <li class="divider"></li>
          <li class="dropdown-header">Taste</li>
          <li>
            <div class="btn-group">
              <button type="button" class="btn btn-default">Alc-Free</button>
              <button type="button" class="btn btn-default">Weak</button>
              <button type="button" class="btn btn-default">Middle</button>
              <button type="button" class="btn btn-default">Strong</button>
            </div>
          </li>
        </ul>
      </li>
      <form class="navbar-form navbar-left" role="search">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search" />
        </div>
        <button type="submit" class="btn btn-default"><span class="glyphicon glyphicon-search"></span></button>
      </form>
      </li>
    </ul>
  </div>
</div>

<!-- Main jumbotron for a primary marketing message or call to action -->
<div class="container drink-list-container"> 
  <!-- Example row of columns -->
  <?php
	$base_url = 'http://localhost/boris/src/php/';
	$url = $base_url . 'getCocktails.php?recipe=1';
	$result = json_decode(file_get_contents($url));
	$cocktails = $result->data;
	//print_r ($cocktails);
?>
  <?php foreach ($cocktails as $cocktail_id  => $cocktail): ?>
  <a href="#" class="no-btn" role="button">
  <div class="row row-<?php print $cocktail_id; ?><?php if($cocktail_id==1) print " first"?><?php if($cocktail==end($cocktails)) print " last" ?> col-xs-12 col-md-6 col-lg-4 inline-block">
    <div class="col-xs-4"> <img src="img/drink_example.jpg" class="img img-responsive" alt="Responsive image" /> </div>
    <div class="col-xs-4">
      <label><?php print $cocktail->name; ?></label>
      <div class="stars-line">
        <div class="glyphicon glyphicon-star"></div>
        <div class="glyphicon glyphicon-star"></div>
        <div class="glyphicon glyphicon-star"></div>
        <div class="glyphicon glyphicon-star"></div>
        <div class="glyphicon glyphicon-star"></div>
      </div>
    </div>
    <div class="col-xs-4">
    	<?php foreach($cocktail->recipe as $ingredient_index => $ingredient): ?>
    		<div><?php print $ingredient->name ?></div>
		<?php endforeach; ?>
    </div>
  </div>
  </a>
  <?php endforeach; ?>
</div>
<footer>
	<p>© Company 2013</p>
</footer>
<!-- /container --> 

<!-- Bootstrap core JavaScript
    ================================================== --> 
<!-- Placed at the end of the document so the pages load faster --> 
<script src="js/jquery-ui-1.10.3/jquery-1.9.1.js"></script> 
<script src="js/bootstrap/bootstrap.min.js"></script>
</body>
</html>