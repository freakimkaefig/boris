<!DOCTYPE html>
<html>
  <head>
    <title>BORIS - DB Test</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <h1>Hello, world!</h1>
    
    <div class="container">
    	<h2>GetCocktails.php</h2>
        <span>
        	<?php 
				$base_url = 'http://localhost/ammi/php/';
				$url = $base_url . 'getCocktailList.php';
				
				$cURL = curl_init();
				
				curl_setopt($cURL, CURLOPT_URL, $url);
				curl_setopt($cURL, CURLOPT_HTTPGET, true);
				
				curl_setopt($cURL, CURLOPT_HEADER, array(
					'Content-Type: application/json',
					'Accept: application/json'
					)
				);
				
				$result = curl_exec($cURL);
				$json_result = json_decode($result, true);
				
				
				curl_close($cURL);
				
				
				print_r($json_result);
			 ?>
        </span>
    </div>
    
    <div class="container">
    	<h2>Auslesen mit jQuery</h2>
        
        <div class="btn-group">
  			<button type="button" class="btn btn-default" id="getCocktails">getCocktails</button>
			<button type="button" class="btn btn-default" id="getIngredients">getIngredients</button>
			<button type="button" class="btn btn-default" id="getRecipe">getRecipe</button>
            <button type="button" class="btn btn-default" id="getTags">getTags</button>
		</div>

    	<h2 id="outputHead"></h2>
        <div id="outputBody"></div>
    </div>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://code.jquery.com/jquery.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    
    <script>
		$(document).ready(function() {
			var
			$getCocktails = $('#getCocktails'),
			$getIngredients = $('#getIngredients'),
			$getRecipe = $('#getRecipe'),
			$getTags = $('#getTags'),
			
			$outputHead = $('#outputHead'),
			$outputBody = $('#outputBody'),
			
			url = '',
			
			handleRequest = function(event) {
				console.log(event.currentTarget.id);
				switch(event.currentTarget.id) {
					case "getCocktails":
						url = 'http://localhost/ammi/php/getCocktailList.php';
						break;
					case "getIngredients":
						url = 'http://localhost/ammi/php/getIngredients.php';
						break;
					case "getRecipe":
						url = 'http://localhost/ammi/php/getRecipe.php';
						break;
					case "getTags":
						url = 'http://localhost/ammi/php/getTags.php';
						break;
				}
				
				$.get(url, function(data) {
					$outputHead.text(url);
					$outputBody.text(JSON.stringify(data));
				});
			}
			
			$getCocktails.on('click', handleRequest);
			$getIngredients.on('click', handleRequest);
			$getRecipe.on('click', handleRequest);
			$getTags.on('click', handleRequest);
		});
	</script>
  </body>
</html>