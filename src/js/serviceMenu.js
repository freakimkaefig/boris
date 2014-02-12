        var refillID = 0,
            editID = 0,
            glassSize = 0,
            slotContents = [],//["NOTHING","GIN", "VODKA", "RUM", "LIKOER"],
            slotSizes = [500,1500],
            postData = "",
            slotData = [{"id":"0","name":"NOTHING","fillingLevel":"0","containerSize":"500"},{"id":"1","name":"NOTHING","fillingLevel":"0","containerSize":"500"},{"id":"2","name":"NOTHING","fillingLevel":"0","containerSize":"500"},{"id":"3","name":"NOTHING","fillingLevel":"0","containerSize":"500"},{"id":"4","name":"NOTHING","fillingLevel":"0","containerSize":"500"},{"id":"5","name":"NOTHING","fillingLevel":"0","containerSize":"500"},{"id":"6","name":"NOTHING","fillingLevel":"0","containerSize":"500"},{"id":"7","name":"NOTHING","fillingLevel":"0","containerSize":"500"},{"id":"8","name":"NOTHING","fillingLevel":"0","containerSize":"500"},{"id":"9","name":"NOTHING","fillingLevel":"0","containerSize":"500"}];
               
        //init();

        function init(){
          getConfig();
          getGlassVol();
          updateGlassSize();
          initDropdownElements();
          initSpinner();

          if ($.cookie('service') != "true") {
              $('body').empty();
              $('body').append("<div style='text-align:center; font-size:30px;'><p><span class='glyphicon glyphicon-warning-sign' style='font-size:160px; color:#f00;'></span></p><p>PERMISSION DENIED</p><p><a href='sign_in.html'>Login</a></p></div>");
          }
      };

      function setIngredients(ingredients) {
          console.log("SetIngredients");

          slotContents = ingredients;
          console.log("slotContents", slotContents);
      };

        function initSpinner(){ 
          $("input[name='inputRefill']").TouchSpin({
              initval: 0,
              min: 0,
              max: 1500,
              step: 50,
              booster: true,
              postfix: 'ml'
          });
          $("input[name='inputSetup']").TouchSpin({
              initval: 0,
              min: 0,
              max:  1500,
              step: 50,
              booster: true,
              postfix: 'ml'
          });

        };

        function updateSpinner(slotName, slotSize){
          $("input[name='"+slotName+"']").trigger("touchspin.updatesettings",
           {
              initval: 0,
              min: 0,
              max: slotSize,
              step: 50,
              booster: true,
              postfix: 'ml'
          });        
        }

        function initDropdownElements(){
          slotContents.forEach(function(entry){
             $("#slotContent").append('<option>'+entry+'</option>');
          });
          slotSizes.forEach(function(entry){
             $("#slotSize").append('<option>'+entry+'</option>');
          });
         
        };

        function updateGlassSize(){
           $( "#glassSize").text(glassSize+" ml");
           $("#glassMilliliter").val('');
        };

        function initSlotElements(){
           slotData.forEach(function(entry){
              number = Math.round(entry.fillingLevel/entry.containerSize*100);
              slotID= parseInt(entry.id)+1;

              $(".slot"+ slotID).html("");
              $(".slot"+ slotID).append('<div class="well well-sm"><div class= "slotName" id="slotName'+ entry.id +'"> Slot '+ slotID +' </div> <div class ="row"> <div class="col-xs-6 col-sm-6" align="center">  <span class= "slotMilliliter" id="slotMilliliter'+ entry.id +'">  '+ Math.round(entry.fillingLevel) +' ml  </span>  </div>  <div class="col-xs-5 col-sm-5" align="center">      <span class = "slotPercentage" id="slotPercentage'+ entry.id +'">    '+ number +' %   </span>  </div></div><div class ="slotContent" >   <span class="contentColor" id="slotContent'+ entry.id +'">'+ entry.name +'</span> </div>    <div class ="row"><div class="col-xs-6 col-sm-6" align="center"> <button class="btn btn-default btn-sm" id="btnRefill'+ entry.id +'" onclick = "updateInputSpinner('+ entry.id +')" >Refill</button>  </div><div class="col-xs-6 col-sm-6" align="center">  <button class="btn btn-default btn-sm" id="btnEdit'+ entry.id +'" onclick = "updateInputElements('+entry.id+')">Edit</button> </div> </div> </div> ');

              updateFillingLevelColor(number, entry.id);  

              $( "#btnRefill" + entry.id).click(function() {
                  var id = $(this).attr("id").replace('btnRefill','');
                  refillID= id;
                  slotID = parseInt(id) +1;

                  $("#infoTextRefill").text( "Enter the new Filling Level of Slot "+slotID+":");

                  $("#inputRefillMilliliter").val('0');
                  $("#bottleContainer").hide();
                  $("#refillContainer").show();

                  addTabDisabledState();
              });

              $( "#btnEdit" + entry.id).click(function() {
                  var id = $(this).attr("id").replace('btnEdit','');
                  editID = id;
                  
                  $("#inputEditMilliliter").val('0');
                  $("#bottleContainer").hide();
                  $("#setupContainer").show();

                  addTabDisabledState();
              });
            });
        };
           

        $( '#commonTab').click(function(event){
            if ($(this).hasClass('disabled')) {
                return false;
            }
        });


        $( '#cleaningTab').click(function(event){
            if ($(this).hasClass('disabled')) {
                return false;
            }
        });

        $( "#btnRefillCancel").click(function() {
              $("#bottleContainer").show();
              $("#refillContainer").hide();
              refillID = 0;
              removeTabDisabledState();
        });

        $( "#btnEditCancel").click(function() {
              $("#bottleContainer").show();
              $("#setupContainer").hide();
              editID = 0;
              removeTabDisabledState();
        });

        $( "#btnRefillSubmit").click(function() {
              milliliter = $("#inputRefillMilliliter").val();
              slotSize = slotData[refillID].containerSize;
              
              if(parseInt(milliliter)<=parseInt(slotSize)){
                refill(refillID,milliliter);
              }
              else{
                console.log("wrong input");
              }           
        });

         $( "#btnEditSubmit").click(function() {
              milliliter = $("#inputEditMilliliter").val();
              slotSize = $("#slotSize").val();
              slotContent = $("#slotContent").val();

              if(parseInt(milliliter)<=parseInt(slotSize) ){
                config(editID,slotContent,milliliter,slotSize);
              }
              else{
                console.log("wrong input");
              }
        });

        $( "#btnGlassChange").click(function(){
          milliliter = $("#glassMilliliter").val();
          glassSize = milliliter;

          setGlassVol(glassSize);
        });
          
        function addTabDisabledState(){
          $('#commonTab').attr('class', 'disabled');
          $('#cleaningTab').attr('class', 'disabled');
        }; 

        function removeTabDisabledState(){
           $('#commonTab').attr('class', '');
           $('#cleaningTab').attr('class', '');
        };

        function updateInputElements(id){ 
          $('.selectpicker').selectpicker('deselectAll');
       
          $('#slotContent').selectpicker('val', slotData[id].name);
          $("#slotSize").selectpicker('val', Math.round(slotData[id].containerSize));
          $('.selectpicker').selectpicker('refresh');  

          updateSpinner("inputSetup", Math.round(slotData[id].containerSize));         
        };

        function updateInputSpinner(id){
           updateSpinner("inputRefill", Math.round(slotData[id].containerSize));
        };

        function updateFillingLevelColor(number,id){
          if(number<=20){
            $("#slotMilliliter"+id).addClass("empty");
            $("#slotPercentage"+id).addClass("empty");
          }
          else{
            $("#slotMilliliter"+id).removeClass("empty");
            $("#slotPercentage"+id).removeClass("empty");
          }
        };

        function config(id, name, fillingLevel, containerSize) {
            postData= '{"config": {"id": "'+id+'","fillingLevel": "'+fillingLevel+'","name": "'+name+'","containerSize": "'+containerSize+'", }}';
            sendRequest(handleConfigResponse);
        };

        function handleConfigResponse (response) {
            console.log("Success!", response.success);
            response = JSON.parse(response);
            if(response.success=="true"){
              $("#bottleContainer").show();
              $("#setupContainer").hide();
              editID = 0;
              removeTabDisabledState();
              getConfig();
            }
            else{
              //Fehlerbehandlung
            }
        };


        function refill (id, milliliter) {
            postData = '{"refill": {"id": "'+id+'","fillingLevel": "'+milliliter+'" }}';
            sendRequest(handleRefillResponse);
        };

        function handleRefillResponse (response) {
            response = JSON.parse(response);
            console.log("Success!", response.success);
            if(response.success=="true"){
              $("#bottleContainer").show();
              $("#refillContainer").hide();
              refillID = 0;
              removeTabDisabledState();
              getConfig();
            }
            else{
              //Fehlerbehandlung
            }            
        };

        function getConfig() {
            postData= '{"getStatus":"config"}';
            sendRequest(handleGetConfigResponse);
        };

        function handleGetConfigResponse (response) {
            response = JSON.parse(response);
            console.log("getConfig!", response);

            response.forEach(function(entry){
                slotData[entry.id]=entry;
              });
            console.log(slotData);
            initSlotElements();
            
        };

        function setGlassVol (volume) {
            postData='{"setGlassVol":{"volume":"'+volume+'"}}';
            sendRequest(handleSetGlassVolResponse);
        };

        function handleSetGlassVolResponse (response) {
            response = JSON.parse(response);
            console.log("Success!", response.success);
            if(response.success=="true"){
              updateGlassSize();
            }
            else{
              //Fehlermeldung
            }
            
        };

        function getGlassVol () {
            postData = '{"getStatus":"glassVol"}';
            sendRequest(handleGetGlassVolResponse);
        };

        function handleGetGlassVolResponse (response) {
            response = JSON.parse(response);
            console.log("Success!", response);
            glassSize = response.volume;
            updateGlassSize();            
        };

        function sendRequest (responseHandler) {
        $.ajax({
            // The 'type' property sets the HTTP method.
            // A value of 'PUT' or 'DELETE' will trigger a preflight request.
            type: 'POST',
            // The URL to make the request to.
            url: 'http://localhost:8009/',
            // Here is defined which data shall be sent. This is interpreted by BORIS.
            data: postData,

            // The 'contentType' property sets the 'Content-Type' header.
            // The JQuery default for this property is
            // 'application/x-www-form-urlencoded; charset=UTF-8', which does not trigger
            // a preflight. If you set this value to anything other than
            // application/x-www-form-urlencoded, multipart/form-data, or text/plain,
            // you will trigger a preflight request.
            contentType: 'text/plain',
            xhrFields: {
                // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
                // This can be used to set the 'withCredentials' property.
                // Set the value to 'true' if you'd like to pass cookies to the server.
                // If this is enabled, your server must respond with the header
                // 'Access-Control-Allow-Credentials: true'.
                withCredentials: false
            },
            headers: {
                // Set any custom headers here.
                // If you set any non-simple headers, your server must include these
                // headers in the 'Access-Control-Allow-Headers' response header.
            },
            success: function (response) {
                // Here's where you handle a successful response.
                responseHandler(response);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                // Here's where you handle an error response.
                // Note that if the error was due to a CORS issue,
                // this function will still fire, but there won't be any additional
                // information about the error.
                console.log("Error :(", xhr);
            }
        });
    };