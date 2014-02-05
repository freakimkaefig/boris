<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="">
<link rel="shortcut icon" href="../../docs-assets/ico/favicon.png">
<title>BORIS - Menu</title>

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

<body class="drink-list">

<div id="action-bar"><!-- Navigation -->
	<div id="logo"><a href="drink_list_02.php"><img src="img/logo_boris.png"></a></div>
    <div id="filter">
    	<a href="#" class="dropdown-toggle" id="filter-dropdown" data-toggle="dropdown"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-filter"></span></button></a>
        <ul class="dropdown-menu">

            <li class="dropdown-header">Taste</li>
              <ul class="input-group" style="list-style-type:none">
                  <li><input id="radio-taste-1" type="radio" name="groupTaste" value="Sweet" class="taste"/>Sweet</li>
                  <li><input id="radio-taste-2" type="radio" name="groupTaste" value="Fruity" class="taste"/>Fruity</li>
                  <li><input id="radio-taste-3" type="radio" name="groupTaste" value="Sour" class="taste"/>Sour</li>
                  <li><input id="radio-taste-4" type="radio" name="groupTaste" value="Bitter" class="taste"/>Bitter</li>
              </ul>

            <li class="dropdown-header">Alcohol Strength</li>
              <ul class="input-group" style="list-style-type:none">
                  <li><input id="radio-alc-1" type="radio" name="groupAlc" value="Alc-Free" class="alc"/>Alc-Free</li>
                  <li><input id="radio-alc-2" type="radio" name="groupAlc" value="Weak" class="alc"/>Weak</li>
                  <li><input id="radio-alc-3" type="radio" name="groupAlc" value="Middle" class="alc"/>Middle</li>
                  <li><input id="radio-alc-4" type="radio" name="groupAlc" value="Strong" class="alc"/>Strong</li>
              </ul>

        </ul>
    </div>
    <div id="search">
    	
        <a href="#" class="dropdown-toggle" id="search-dropdown" data-toggle="dropdown"><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-search"></span></button></a>
        <ul class="dropdown-menu">

            <li class="dropdown-header"></li>
              <ul class="input-group searchbarleft" style="list-style-type:none">
                  <li><input id="search-input" type="text" class="form-control" placeholder="Search" /></li>
              </ul>
              <ul class="input-group searchbuttonright" style="list-style-type:none">
                  <li><button id="search-submit" class="btn btn-default"><span class="glyphicon glyphicon-search"></span></button></li>
              </ul>
                  

        </ul>
        
    </div>
</div> <!-- Ende Navigation -->

<!-- Main jumbotron for a primary marketing message or call to action -->
<div class="container drink-list-container">
    <div id="search-output"class="well">
        <div class="output-line"><span>Results for: </span><span id="output"></span><span id="close" class="glyphicon glyphicon-remove-circle"></span></div>
    </div>
  <!-- Example row of columns -->
  <?php
    include('php/helper.php');
	$base_url = dirname('http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI']) . "/";
	$url = $base_url . "php/getCocktails.php?recipe=1&rating=1";
	$result = json_decode(file_get_contents($url));
	
	$cocktails = $result->data;
	//print_r ($cocktails);
    
    $ratingFilledRendering = '<div class="glyphicon glyphicon-star"></div>';
    $ratingEmptyRendering = '<div class="glyphicon glyphicon-star-empty"></div>';
?>

  <?php foreach ($cocktails as $cocktail_id  => $cocktail): ?>
  <a href="drink_detail.php?id=<?php print $cocktail_id; ?>" class="no-btn" role="button">
  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 inline-block row row-<?php print $cocktail_id; ?><?php if($cocktail_id==1) print " first"?><?php if($cocktail==end($cocktails)) print " last" ?>">
      <div class="panel panel-default">
        <div class="panel-heading">
            <div class="cocktail-title col-xs-6"><h3><?php print $cocktail->name; ?></h3></div>
            <div class="cocktail-rating col-xs-6">
                <div class="stars-line">
                <?php 
                    $rating = round($cocktail->rating->taste->average, 0, PHP_ROUND_HALF_UP);
                    echo renderRating($rating,5, $ratingFilledRendering,$ratingEmptyRendering);
                ?>
                </div>
            </div>
        </div>
        <div class="panel-body" style="clear:both;">
            <div class="col-xs-6"> <img src="img/drink_example.jpg" class="img img-responsive" alt="Responsive image" /> </div>
            <div class="col-xs-6">
            <?php
                $result = renderStrongTastes($cocktail);
                if($result != null) echo "<hr />";
            ?>
    	    <?php foreach($cocktail->recipe as $ingredient_index => $ingredient): ?>
    		    <div><?php print $ingredient->name; ?></div>
		    <?php endforeach; ?>
            </div>
        </div>
      </div>
  </div>
  </a>
  <?php endforeach; ?>
</div>
<footer>
</footer>
<!-- /container --> 

<!-- Bootstrap core JavaScript
    ================================================== --> 
<!-- Placed at the end of the document so the pages load faster --> 
<script src="js/jquery-ui-1.10.3/jquery-1.9.1.js"></script> 
<script src="js/bootstrap/bootstrap.min.js"></script>

<script src="js/libs/jquery.cookie.js"></script>

<!-- Custom Javascript -->
<script src="js/App.js"></script>
<script src="js/SearchView.js"></script>
<script src="js/FilterView.js"></script>
<script src="js/MainModel.js"></script>
<script src="js/MainController.js"></script>
<script src="js/SignView.js"></script>
<script src="js/QuestionnaireView.js"></script>
<script src="js/DetailView.js"></script>
<script src="js/DrinkModel.js"></script>
<script src="js/BorisModel.js"></script>

<script>
	$(function() {
        Boris.init();

        $('#search-button').click(function () {
            setTimeout(function () { $('#search-input').focus(); }, 0);
        });

        $('.dropdown-menu,.dropdown-header,.input-group,#search-input,input[name="groupTaste"],input[name="groupAlc"]').click(function (e)            { e.stopPropagation(); });

        $('#search-submit').click(function (e) {
            $('#search-dropdown').dropdown("toggle");
        });
        
        $('#search-input').keypress(function (e) {
            if (e.which == 13) {
                $('#search-dropdown').dropdown("toggle");
            }
        });
    });
</script>
</body>
</html>

