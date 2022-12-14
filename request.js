//SEPTA Regional Rail train location tracking
function getRegionalRailLoc() {
    $.ajax({
        url: "https://www3.septa.org/api/TrainView/index.php?&callback=?",
        type: 'GET',
        dataType: "jsonp",
        success: function(data) {
            trainLayer.clearLayers();
            $.each(data, function(i, item) {
                displayTrainCurrentLoc(item, trainLayer, trainIcon);
            });
        },
        complete: function() {
            setTimeout(getRegionalRailLoc, 5000);
        }
    });
}

function getStations(agency, routeId) {
    if (agency == 'septa') {
        let color = '#2C3E50';
        let fillColor = '#c9d3d9';
        console.log(routeId);
        if (routeId === 'ALL') {
            let url = "/api/stop/septa";
            $.getJSON(url)
                .done(function (data) {
                    $.each(data, function (key, item) {
                        displayStations(color, fillColor, item);
                    })
                })
        } else {
            let url = `/api/stop/septa/${routeId}`;
            $.getJSON(url)
                .done(function (data) {
                    $.each(data, function (key, item) {
                        displayStations(color, fillColor, item);
                    })
                })
        }
    }
    if (agency == 'njt') {
        let color = '#f5853e';
        let fillColor = '#075aaa';
        if (routeId == '0') {
            let url = "api/stop/njt";
            $.getJSON(url)
                .done(function (data) {
                    $.each(data, function (key, item) {
                        displayStations(color, fillColor, item);
                    })
                })
        } else {
            let url = `/api/stop/njt/${routeId}`;
            $.getJSON(url)
                .done(function (data) {
                    $.each(data, function (key, item) {
                        displayStations(color, fillColor, item);
                    })
            }) 
        }
    }
    
}

function getArrivals(station, optText) {
    $.ajax({
        url: `https://www3.septa.org/api/Arrivals/index.php?station=${station}&results=10`,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            $('#departuresTable tbody').empty();
            $.each(data, function(i, item) {
                loadBoard(item, optText);
            });
        }
        //complete: function() {
         //   setTimeout(getArrivals, 5000);
       // }
    });
}

//SEPTA Subway-surface trolley location tracking
function getTrolleyLoc(route) {
    let trolleyUrl = `https://www3.septa.org/api/TransitView/index.php?route=${route}`;
    $.ajax({
        url: trolleyUrl,
        type: 'GET',
        dataType: 'jsonp',
        success: function(data) {
            $.each(data, function(i, item) {
                trolleyLayer.clearLayers();
                displayTrolleyLoc(item, route, trolleyLayer, trolleyIcon);
            });
        },
        complete: function() {
            setInterval(`getTrolleyLoc(${route})`, 2000);
        }
    });
}

//SEPTA Subway-surface trolley stop marking
function getTrolleyStops(route) {
    let stopUrl = `https://www3.septa.org/api/Stops/index.php?req1=${route}`;
    $.ajax({
        url: stopUrl,
        type: 'GET',
        dataType: 'jsonp',
        success: function(data) {
            $.each(data, function(i, item) {
                displayTrolleyStops(item);
            });
        }
    });
}

/*function getTrainShape(agency, routeId) {
    if (agency == 'septa') {
        let color = '#566573'; //add septa color
        let url = `/api/shapes/septa/${routeId}`;
        $.getJSON(url)
            .done(function (data) {
                $.each(data, function (key, item) {
                    displayShapes(routeId, color, item);
                }
            )});  
        }
    
}*/

