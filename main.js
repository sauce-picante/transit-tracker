/**
* Web document stuff
* 
* Multiple URLs are needed for getting locations of Regional Rail
* Station locations.For some reason the max radius to get locations is around 8 miles.
* 
* Trolley stop locations are gathered by route number. Might divide the the location gathering
* by trolley route/rail line
*/
$(document).ready(function() {

  let railStationURLs = ["https://www3.septa.org/api/locations/get_locations.php?lon=-75.161&lat=39.952&type=rail_stations&radius=55&callback=?",
      "https://www3.septa.org/api/locations/get_locations.php?lon=-75.598&lat=40.031&type=rail_stations&radius=55&callback=?",
      "https://www3.septa.org/api/locations/get_locations.php?lon=-75.625&lat=39.079&type=rail_stations&radius=55&callback=?",
      "https://www3.septa.org/api/locations/get_locations.php?lon=-75.705&lat=39.689&type=rail_stations&radius=55&callback=?",
      "https://www3.septa.org/api/locations/get_locations.php?lon=-75.403&lat=39.828&type=rail_stations&radius=55&callback=?",
      "https://www3.septa.org/api/locations/get_locations.php?lon=-75.325&lat=40.053&type=rail_stations&radius=55&callback=?",
      "https://www3.septa.org/api/locations/get_locations.php?lon=-75.050&lat=40.053&type=rail_stations&radius=55&callback=?",
      "https://www3.septa.org/api/locations/get_locations.php?lon=-74.857&lat=40.171&type=rail_stations&radius=55&callback=?",
      "https://www3.septa.org/api/locations/get_locations.php?lon=-75.221&lat=40.241&type=rail_stations&radius=55&callback=?",
      "https://www3.septa.org/api/locations/get_locations.php?lon=-75.094&lat=40.184&type=rail_stations&radius=55&callback=?"
  ];

  let trolleyStopURLs = ["https://www3.septa.org/api/Stops/index.php?req1=10",
      "https://www3.septa.org/api/Stops/index.php?req1=11",
      "https://www3.septa.org/api/Stops/index.php?req1=15",
      "https://www3.septa.org/api/Stops/index.php?req1=34",
      "https://www3.septa.org/api/Stops/index.php?req1=36",
      "https://www3.septa.org/api/Stops/index.php?req1=101",
      "https://www3.septa.org/api/Stops/index.php?req1=102"
  ];
  

  $("#trainInfo").on('click', function(event) {
    map.flyTo([39.952325, -75.163705],10);
    sendRequest();
    function sendRequest(){
        $.ajax({
            url: "https://www3.septa.org/api/TrainView/index.php?&callback=?",
            type: 'GET',
            dataType: "jsonp",
            success: function(data) {
                trainLayer.clearLayers();
                $.each(data, function(i, item) {
                displayTrainCurrentLoc(item, trainIcon, trainLayer);
                });
              },
              complete: function(){
                setInterval(sendRequest, 5000);
              }
          });
    }
    setTimeout( function(){
    $.each(railStationURLs, function(i, u) {
          $.ajax(u, {
              type: 'GET',
              dataType: 'jsonp',
              success: function(data) {
                  $.each(data, function(i, item) {
                      displayStationLoc(item);
                  });
              }
          });
      });
    }, 500);
      event.preventDefault();
  }); //End Train Button Event Handler

  $("#trolleyInfo").on('click', function(event) {
    let route = $("#slct__trolley option:selected").val();
    if(route == "" || route == null || route == undefined){
        alert("Please select a route!");
    } else {
            console.log(route);
            sendRequest(route);
            function sendRequest(route){
                let trolleyUrl = `https://www3.septa.org/api/TransitView/index.php?route=${route}`;
                console.log(trolleyUrl);
                trolleyLayer.clearLayers();
            $.ajax({
                    url: trolleyUrl,
                    type: 'GET',
                    dataType: 'jsonp',
                    success: function(data){
                        $.each(data, function(i,item,route) {
                            
                            displayTrolleyLoc(item,route);
                        });
                    }
            });
            }
        }
    /**$.each(trolleyStopURLs, function(i, u) {
        $.ajax(u, {
                type: 'GET',
                dataType: 'jsonp',
                success: function(data) {
                    $.each(data, function(i, item) {
                        displayTrolleyStops(item);
                    });
                }
            });
    });**/
    event.preventDefault();
  }); //End Trolley Button Event Handler

$("#clear").on('click', function(event){
    location.reload();
    });
$("#njtRail").on('click', function(event){
   //TO DO: finish this
 });
});