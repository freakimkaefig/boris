<!DOCTYPE html>
<html>
  <head>
    <title>Boris Service Menu</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/bootstrap-select.min.css" rel="stylesheet">

    <link rel="stylesheet" href="css/common.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->

     <?php
        include 'php/helper.php';
        
	    $base_url = 'http://localhost/boris/src/php/';
        
        //Get selected cocktail
	    $getCocktailUrl = $base_url . 'getIngredients.php';
	    $result = json_decode(file_get_contents($getCocktailUrl));           
	    $ingredients = $result->data;
        $ingredientNames = array();
        /*
        for ($i = 0; $i < count($ingredients); $i++)
        {
            $ingredientNames = array_fill($i, $ingredient->name);
        }
        */
    ?>

  </head>
  <body>
    <div id="action-bar"><!-- Navigation -->
	    <div id="logo"><a href="#"><img src="img/logo_boris.png"></a></div>
        <div id="logout">
    	    <a href="sign_in.html"><button id="rateDrink" type="button" class="btn btn-default navbar-btn navbar-right">
                        <span class="glyphicon glyphicon-off"></span>
                    </button></a>        
        </div>    
    </div> <!-- Ende Navigation -->

    <div class= "tabbable">
      <div class="container">
        <div class="col-xs-12 col-sm-12">
          <ul class="nav nav-tabs">
            <li class="active"><a href="#slotContainer" data-toggle="tab">Bottle</a></li>
            <li id="commonTab"><a  href="#commonContainer" data-toggle="tab">Common</a></li>
            <li id="cleaningTab"><a href="#cleaningContainer" data-toggle="tab">Cleaning</a></li>
          </ul>
        </div>
      </div>

      <div class="tab-content">

        <div class="tab-pane active" id="slotContainer">
          <div class="container" id="bottleContainer">
            <div class="row" align="center">
              <div class="col-xs-6 col-sm-3" align="center">
                <div class ="slot1">
                </div>
              </div>
              <div class="col-xs-6 col-sm-3" align="center">
                  <div class ="slot2">
                  </div>
              </div>
              <div class="col-xs-6 col-sm-3" align="center">
                <div class="slot3">
                </div>
              </div>
              <div class="col-xs-6 col-sm-3" align="center">
                <div class="slot4">
                </div>
              </div>

            </div>
            <div class="row">
              <div class="col-xs-6 col-sm-3" align="center">
                <div class="slot5">
                </div>
               </div>
              <div class="col-xs-6 col-sm-3" align="center">
                <div class="slot6">
                </div>
              </div>
              <div class="col-xs-6 col-sm-3" align="center">
                <div class="slot7">
                </div>
              </div>
              <div class="col-xs-6 col-sm-3" align="center">
                <div class="slot8">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-6 col-sm-3" align="center">
                <div class="slot9">
                </div>
              </div>
              <div class="col-xs-6 col-sm-3" align="center">
                <div class="slot10">
                </div>
              </div>
            </div>
          </div>

          <div  class="container" id="setupContainer" hidden="true">
            <div class="col-xs-12 col-sm-12" align="center">
              <div class="row" id="input">
                <div class="col-xs-3 col-sm-3" >
                  <span class="inputDescription">
                    Content Type:
                  </span>
                </div>
                <div class="col-xs-3 col-sm-3" align="center">
                  <select id="slotContent" class="selectpicker">
                  </select>
                </div>
              </div>
              <div class="row" id="input">
                <div class="col-xs-3 col-sm-3" align="center">
                  <span class="inputDescription">
                    Slot Size(ml):
                  </span>
                </div>
                <div class="col-xs-3 col-sm-3" align="center">
                  <select id="slotSize" class="selectpicker" >
                  </select>
                </div>
              </div>
              <div class="row" id="input">
                <div class="col-xs-3 col-sm-3" align="center">
                  <span class="inputDescription">
                    Filling Level:
                  </span>
                </div>
                <div class="col-xs-6 col-sm-3" align="center">
                  <div class="input-group" id="inputEdit" >
                    <input type="number" class="form-control" id="inputEditMilliliter" name="inputSetup" >
                  </div>
                </div>
              </div>
              <div class ="row" id="btnEdit">
                <div class="col-xs-10 col-xs-offset-1 col-sm-10  col-sm-offset-1" align="center">
                  <div class="btn-group">
                    <button class="btn btn-default btn-sm" id="btnEditCancel">
                     Cancel
                    </button> 
                    <button class="btn btn-warning btn-sm" id="btnEditSubmit">
                     Submit
                    </button> 
                  </div>         
                </div> 
              </div>
            </div>
          </div>

          <div class="container" id="refillContainer" hidden="true">
            <div class="col-xs-8 col-xs-offset-2 col-sm-6  col-sm-offset-3">
              <span class="inputDescription" id="infoTextRefill" align="center">
              </span>
              <div class="input-group" id="inputRefill" >
                <input type="number" class="form-control" id="inputRefillMilliliter" name="inputRefill">
              </div>
              <div class ="row" >
                <div class="col-xs-10 col-xs-offset-1 col-sm-10  col-sm-offset-1" align="center">
                  <div class="btn-group" id="btnRefill">
                    <button class="btn btn-default btn-sm" id="btnRefillCancel">
                     Cancel
                    </button> 
                    <button class="btn btn-warning btn-sm" id="btnRefillSubmit">
                     Submit
                    </button> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="tab-pane" id="commonContainer">
         
            <div class="col-xs-10 col-sm-10 col-xs-offset-1 col-sm-offset-1" align="center">
              <span class="inputDescription" ><p>The current quantity of the Cocktail liquid is:</p></span>
              <p><span id="glassSize" class="textLabel"></span></p>
              <span class="inputDescription"><p>You can set a new quantity depending on your glass size!</p></span>
            </div>
            <div class="col-xs-8 col-sm-8 col-xs-offset-4 col-sm-offset-4" align="center">
              <div class="row">
                <div class="col-xs-6 col-sm-4 ">
                  <div class="input-group" id="inputRefill" >
                    <input type="number" class="form-control" id="glassMilliliter" >
                    <span class="input-group-addon">ml</span>
                  </div>
                </div>
                <div class="col-xs-2 col-sm-2 ">
                  <button class="btn btn-warning btn-sm" id="btnGlassChange">
                       Change
                  </button> 
                </div>
              </div>
            </div>
            
         
        </div>

        <div class="tab-pane" id="cleaningContainer">
        </div>

       
        </div>
        
        <br />
        <hr />

    <footer class="text-center">
        <a href="logout.html">Logout</a>            
    </footer>
    <br />
    </div>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="js/jquery-ui-1.10.3/jquery-1.9.1.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap/bootstrap.min.js"></script>
    <script src="js/bootstrap/bootstrap-select.min.js"></script>
    <script src="js/bootstrap/bootstrap.touchspin.js"></script>
    <script src="js/libs/jquery.cookie.js"></script>
    <script src="js/serviceMenu.js"></script>
    
    <script type="text/javascript">
        $(function() {    
            var ingredients = $(<?php echo json_encode($ingredients) ?>)[0]; 
            var ingredientNames = [];
            ingredientNames.push("NOTHING");
            $.each(ingredients, function(key, value) {
                ingredientNames.push(value.name/*.toLowerCase()*/)
            });
            console.log("ingredientNames: ", ingredientNames);
            setIngredients(ingredientNames);
            
            init();
	    });
	</script>
  </body>
</html>