$(document).ready(function(){
  
    var streams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
    
    var url = "https://api.twitch.tv/kraken/streams/freecodecamp?client_id=uzrq8rphkfuv6ik6fd43yd86bttt5d";
    
    $.getJSON(url, function(data){
      if(data.stream===null){
        $("#fccStatus").html("Free Code Camp is Currently OFFLINE!");
      }
      else{
        $("#fccStatus").html("Free Code Camp is Currently ONLINE!");  
      }
    });
    
    for(var i = 0; i < streams.length; i++){
      $.ajax({
        type: "GET",
        url: "https://api.twitch.tv/kraken/channels/"+ streams[i],
        headers: {
          "client-ID":"uzrq8rphkfuv6ik6fd43yd86bttt5d"
        },
        success: function(data1){
          //console.log(data1);
          $.getJSON("https://api.twitch.tv/kraken/streams/"+ data1.name +"?client_id=uzrq8rphkfuv6ik6fd43yd86bttt5d", function(data2){
            //console.log(data2);
            var name = data2._links.self.slice(37);
            //console.log(name);
            if(data2.stream===null){
              $("#user").append('<a target="blank" href="https://www.twitch.tv/' + name + '">' + name + '</a><br>');
              $("#status").append("offline<br>")
              $("#game").append("N/A<br>")
            }
            else{
              $("#user").append('<a target="blank" href="https://www.twitch.tv/' + name + '">' + name + '</a><br>'); 
              $("#status").append("ONLINE<br>")
              $("#game").append(data2.stream.game + "<br>");
            }
          });
        },
        error: function(err){
          //alert("Error: User Not Found");
          $("#user").append('Invalid User<br>');
          $("#status").append("Not Found<br>")
          $("#game").append("N/A<br>")
        }
      });
    };
    
  });