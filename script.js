/**	
 * Fetch API data
 */
 var city = "tokyo";
 var z;
 //Tokyo: Latitude(X): 35.6895 Longitude(Y): 139.6917
 //Dubai: Latitude(X): 25.276987 Longitude(Y): 55.296249
 //Detroit: Latitude(X): 42.331429 Longitude(Y): -83.045753
 var x;
 var y;
 var apiKey ='85532dca33b10140da462e2297968526';
function getAPIdataForecast() {
//openweather forecast---------------------------------------------------------------------------------------------
	var urlForecast = 'https://api.openweathermap.org/data/2.5/forecast';
	// construct request
	var request = urlForecast + '?' + 'appid=' + apiKey + '&' + 'q=' + city;
		
	// get weather forecast
	fetch(request)

	// parse to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	// render weather per day
	.then(function(response) {
		console.log(response);
		// render weatherCondition
		onAPISuccesForecast(response);
	})
	
	// catch error
	.catch(function (error) {
		onAPIErrorForecast();
		console.error('Request failed', error);
	});


}

/**
 * Render weather listing
 */
function onAPISuccesForecast(response) {
//openweather forecast---------------------------------------------------------------------------------------------
	var forecastList = response.list;
	var weatherBoxDegrees = document.getElementById('degrees');
	var weatherBoxIcon = document.getElementById('icon');
	var iconForecast;
	var degreesForecast;

	for(var i=0; i< forecastList.length; i++){
		//calc kelvin to celcius
		var temp = Math.floor(forecastList[i].main.temp - 273.15);
		var iconUrl = 'https://openweathermap.org/img/w/'+forecastList[i].weather[0].icon+'.png';

		iconForecast = "<div id='forecastDegrees'>" + temp + '&#176;C </div>';
		degreesForecast ='<div id=" "> <img id="forecastIcon" src="' + iconUrl + '"> </div>';

		weatherBoxDegrees.innerHTML = degreesForecast;
		weatherBoxIcon.innerHTML = iconForecast;
	}


x = response.city.coord.lat;
z = parseInt(10);
y = response.city.coord.lon;
console.log("lat",x, "long",y);
// getAPIdataPrecipitation();

date = new Date(); 
day = date.getDate();
month = date.getMonth() + 1; 
unixTimeRise = parseInt(response.city.sunrise);
unixTimeSet = parseInt(response.city.sunset);
console.log(
	addLeadingZero(day), '-' , addLeadingZero(month), ' rise: ',convertUNIX(unixTimeRise), "UTC",
	addLeadingZero(day)+1, '-', addLeadingZero(month), ' set: ',convertUNIX(unixTimeSet), "UTC"
			);
sunSetRise();

}

var unixTimeSet;
var unixTimeRise;
var date;
var day;
var month; 

function convertUNIX(unix) {
	var today = new Date(unix*1000);
	var hour = today.getHours();
  	var min = today.getMinutes();
  	var sec = today.getSeconds();

  	var time = hour + ':' + min + ':' + sec;
  	return time;
}

function sunSetRise() {
	var sunRise = document.getElementById("sunRise");
	var sunSet = document.getElementById("sunSet");
	var sunRiseIcon = "<div class=sun> <img class=sunIcon src='Fotos/sunrise.svg'> </div>";
	var sunSetIcon = "<div class=sun> <img class=sunIcon src='Fotos/sunset.svg'> </div>";
	sunRise.innerHTML = sunRiseIcon + '<div class=sunDate>' + addLeadingZero(day) + '-' + addLeadingZero(month) + ' rise: ' + '</div>' + '<div class=sunTimes>' + convertUNIX(unixTimeRise) + ' UTC' + '</div>'
	sunSet.innerHTML = sunSetIcon + '<div class=sunDate>' + addLeadingZero(day+1) + '-' + addLeadingZero(month) + ' set: ' +  '</div>' + '<div class=sunTimes>' + convertUNIX(unixTimeSet) + ' UTC' + '</div>'
}

/**
 * Error
 */
function onAPIErrorForecast() {
	var weatherBoxDegrees = document.getElementById('degrees');
	weatherBoxDegrees.className = 'hidden'; 

	var weatherBoxIcon = document.getElementById('icon');
	weatherBoxIcon.className = 'hidden'; 
}





// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Set api token for mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiYWx5c2lhZ29kZSIsImEiOiJja21ramd6d28xMXhpMndwZm9sajR6cjMxIn0.ua0uLtYyONuedJTByOJU5Q';
 //Tokyo: Latitude(X): 35.6895 Longitude(Y): 139.6917
 //Dubai: Latitude(X): 25.276987 Longitude(Y): 55.296249
 //Detroit: Latitude(X): 42.331429 Longitude(Y): -83.045753
// api token for openWeatherMap
var openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/weather';
var openWeatherMapUrlApiKey = '85532dca33b10140da462e2297968526';

// var cityTokyo = [
// 	{
// 		name: 'Tokyo',
//    		coordinates: [35.6895, 139.6917]
// 	}
// ];

// var cityDetroit = [
// 	{
// 		name: 'Detroit',
//    		coordinates: [42.331429, -83.045753]
// 	}
// ];

// var cityDubai = [
// 	{
// 		name: 'Dubai',
//    		coordinates: [25.276987, 55.296249]
// 	}
// ];

var cities = [
	  {
	    name: 'Tokyo',
	    coordinates: [139.6917,35.6895]
	  },
	  {
	    name: 'Dubai',
	    coordinates: [55.296249,25.276987]
	  },
	  {
	    name: 'Detroit',
	    coordinates: [-83.045753,42.331429]
	  },
  ];

// Initiate map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/alysiagode/ckmufm7ye0h8917mzbz2k8el1',
  center: [139.6917,35.6895],
  zoom: 7
});

map.on('load', function () {
  cities.forEach(function(city) {
    // Usually you do not want to call an api multiple times, but in this case we have to
    // because the openWeatherMap API does not allow multiple lat lon coords in one request.
    var request = openWeatherMapUrl + '?' + 'appid=' + openWeatherMapUrlApiKey + '&lon=' + city.coordinates[0] + '&lat=' + city.coordinates[1];

    // Get current weather based on cities' coordinates
    fetch(request)
      .then(function(response) {
        if(!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(function(response) {
        // Then plot the weather response + icon on MapBox
        plotImageOnMap(response.weather[0].icon, city)
      })
      .catch(function (error) {
        console.log('ERROR:', error);
      });
  });
});

function plotImageOnMap(icon, city) {
  map.loadImage(
    'https://openweathermap.org/img/w/' + icon + '.png',
    function (error, image) {
      if (error) throw error;
      map.addImage("weatherIcon_" + city.name, image);
      map.addSource("point_" + city.name, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: city.coordinates
            }
          }]
        }
      });
      map.addLayer({
        id: "points_" + city.name,
        type: "symbol",
        source: "point_" + city.name,
        layout: {
          "icon-image": "weatherIcon_" + city.name,
          "icon-size": 1.3
        }
      });
    }
  );
}




// Initiate map2
var map2 = new mapboxgl.Map({
  container: 'map2',
  style: 'mapbox://styles/alysiagode/ckmufq99l4p1z17l94idlwbyx',
  center: [139.6917,35.6895],
  zoom: 7
});

map2.on('load', function () {
  cities.forEach(function(city) {
    // Usually you do not want to call an api multiple times, but in this case we have to
    // because the openWeatherMap API does not allow multiple lat lon coords in one request.
    var request2 = openWeatherMapUrl + '?' + 'appid=' + openWeatherMapUrlApiKey + '&lon=' + city.coordinates[0] + '&lat=' + city.coordinates[1];

    // Get current weather based on cities' coordinates
    fetch(request2)
      .then(function(response) {
        if(!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(function(response) {
        // Then plot the weather response + icon on MapBox
        plotImageOnMap2(response.weather[0].icon, city)
      })
      .catch(function (error) {
        console.log('ERROR:', error);
      });
  });
});

function plotImageOnMap2(icon, city) {
  map2.loadImage(
    'https://openweathermap.org/img/w/' + icon + '.png',
    function (error, image) {
      if (error) throw error;
      map2.addImage("weatherIcon_" + city.name, image);
      map2.addSource("point_" + city.name, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: city.coordinates
            }
          }]
        }
      });
      map2.addLayer({
        id: "points_" + city.name,
        type: "symbol",
        source: "point_" + city.name,
        layout: {
          "icon-image": "weatherIcon_" + city.name,
          "icon-size": 1.3
        }
      });
    }
  );
}

// function getAPIdataPrecipitation() {
// //openweather precipitation---------------------------------------------------------------------------------------------
// 	var urlPrecipitation = 'https://tile.openweathermap.org/map/precipitation_new/'
// 	var requestPrecipitation = urlPrecipitation + z + '/' + x + '/' + y + '.png?appid=' + apiKey;

// 	//get weather
// 	fetch(requestPrecipitation)
// 	// parse to JSON format
// 	.then(function(responsePrec) {
// 		if(!responsePrec.ok) throw Error(responsePrec.statusText);
// 		return responsePrec.json();
// 	})
	
// 	// render weather per day
// 	.then(function(responsePrec) {
// 		console.log(responsePrec);
// 		// render weatherCondition
// 		onAPISuccesPrecipitation(responsePrec);
// 	})
	
// 	// catch error
// 	.catch(function (errorPrec) {
// 		onAPIErrorPrecipitation();
// 		console.error('Request failed', errorPrec);
// 	});
// }


// function onAPISuccesPrecipitation(responsePrec) {
// //openweather weather---------------------------------------------------------------------------------------------
// 	var precipitationList = responsePrec.list;
// 	var rain = document.getElementById("rain");
// 	var wind = document.getElementById("wind");
// 	var windWeather;
// 	var rainWeather;
// console.log('test');
// 	for(var i=0; i< precipitationList.length; i++){

// 		// rain.innerHTML = degreesForecast;
// 		// wind.innerHTML = iconForecast;
// 	}
// }


// function onAPIErrorPrecipitation() {
// 	var rain = document.getElementById('rain');
// 	rain.className = 'hidden'; 

// 	var wind = document.getElementById('wind');
// 	wind.className = 'hidden'; 
// }


// init data stream
getAPIdataForecast();
// getAPIdataPrecipitation();

setInterval(function(){
	getAPIdataForecast();
	// getAPIdataPrecipitation();
},500);
// ----------------------------------------------

//zorg dat alle getallen onder de 10 een 0 krijgen: 01 - 02 - 03 - 04 - 05 - 06 - 07 - 08 - 09
function addLeadingZero(getal) {
	if (getal < 10) {
		getal = "0"+ getal;
	}
	return getal;
}

function timeToday() {
	var date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	
	var year = date.getFullYear();
	var month = date.getMonth() + 1; 
	var day =  date.getDate();

    var timeH = document.getElementById("timeH");
    var timeM = document.getElementById("timeM");
		
	// textTime.innerHTML = addLeadingZero(hours) + ":" + addLeadingZero(minutes) + ":" + addLeadingZero(seconds);
	timeH.innerHTML = addLeadingZero(hours);
	timeM.innerHTML = addLeadingZero(minutes);
}
timeToday();






function blink() {
	if (document.getElementById("dubbelepunt").style.opacity == 1) {
		document.getElementById("dubbelepunt").style.opacity = "0";
	} else if (document.getElementById("dubbelepunt").style.opacity == 0) {
		document.getElementById("dubbelepunt").style.opacity = "1";
	}
}
//per seconde de nieuwe tijd weergeven
setInterval(function(){
	timeToday();
},500);

setInterval(function(){
	blink();
},500);

var slideId = document.getElementById("citySlide");
var tokyoImages = ["Fotos/tokyo/tokyo1.jpg","Fotos/tokyo/tokyo2.jpg","Fotos/tokyo/tokyo3.jpg"];
var dubaiImages = ["Fotos/dubai/dubai1.jfif","Fotos/dubai/dubai2.jpeg","Fotos/dubai/dubai3.jpg"];
var detroitImages = ["Fotos/detroit/detroit1.jpg","Fotos/detroit/detroit2.jpg","Fotos/detroit/detroit3.jpg"];
var slide = 0;
var slideshowCity = tokyoImages;
function startSlideShow() {
	setInterval(function(){
		slideId.src = slideshowCity[slide++];
		if (slide == slideshowCity.length) {
			slide = 0;
		}
	},2000)
}
//zorg dat de foto direct wordt weergeven zonder 2s te wachten
slideId.src = slideshowCity[slide++];
startSlideShow();

var tokyo = document.getElementById("tokyo");
var dubai = document.getElementById("dubai");
var detroit = document.getElementById("detroit");

tokyo.onclick = function() {
	city = 'tokyo';
	tokyo.classList.add("active");
	dubai.classList.remove("active");
	detroit.classList.remove("active");
	slideshowCity = tokyoImages;

	map = new mapboxgl.Map({
 		container: 'map',
  		style: 'mapbox://styles/alysiagode/ckmufm7ye0h8917mzbz2k8el1',
  		center: [139.6917,35.6895],
 		zoom: 7
	});

	map2 = new mapboxgl.Map({
 		container: 'map2',
  		style: 'mapbox://styles/alysiagode/ckmufq99l4p1z17l94idlwbyx',
  		center: [139.6917,35.6895],
  		zoom: 7
	});

	map.on('load', function () {
  cities.forEach(function(city) {
    // Usually you do not want to call an api multiple times, but in this case we have to
    // because the openWeatherMap API does not allow multiple lat lon coords in one request.
    var request = openWeatherMapUrl + '?' + 'appid=' + openWeatherMapUrlApiKey + '&lon=' + city.coordinates[0] + '&lat=' + city.coordinates[1];

    // Get current weather based on cities' coordinates
    fetch(request)
      .then(function(response) {
        if(!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(function(response) {
        // Then plot the weather response + icon on MapBox
        plotImageOnMap(response.weather[0].icon, city)
      })
      .catch(function (error) {
        console.log('ERROR:', error);
      });
  });
});

function plotImageOnMap(icon, city) {
  map.loadImage(
    'https://openweathermap.org/img/w/' + icon + '.png',
    function (error, image) {
      if (error) throw error;
      map.addImage("weatherIcon_" + city.name, image);
      map.addSource("point_" + city.name, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: city.coordinates
            }
          }]
        }
      });
      map.addLayer({
        id: "points_" + city.name,
        type: "symbol",
        source: "point_" + city.name,
        layout: {
          "icon-image": "weatherIcon_" + city.name,
          "icon-size": 1.3
        }
      });
    }
  );
}


		map2.on('load', function () {
  cities.forEach(function(city) {
    // Usually you do not want to call an api multiple times, but in this case we have to
    // because the openWeatherMap API does not allow multiple lat lon coords in one request.
    var request2 = openWeatherMapUrl + '?' + 'appid=' + openWeatherMapUrlApiKey + '&lon=' + city.coordinates[0] + '&lat=' + city.coordinates[1];

    // Get current weather based on cities' coordinates
    fetch(request2)
      .then(function(response) {
        if(!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(function(response) {
        // Then plot the weather response + icon on MapBox
        plotImageOnMap2(response.weather[0].icon, city)
      })
      .catch(function (error) {
        console.log('ERROR:', error);
      });
  });
});

function plotImageOnMap2(icon, city) {
  map2.loadImage(
    'https://openweathermap.org/img/w/' + icon + '.png',
    function (error, image) {
      if (error) throw error;
      map2.addImage("weatherIcon_" + city.name, image);
      map2.addSource("point_" + city.name, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: city.coordinates
            }
          }]
        }
      });
      map2.addLayer({
        id: "points_" + city.name,
        type: "symbol",
        source: "point_" + city.name,
        layout: {
          "icon-image": "weatherIcon_" + city.name,
          "icon-size": 1.3
        }
      });
    }
  );
}

}

dubai.onclick = function() {
	city = 'dubai';
	dubai.classList.add("active");
	tokyo.classList.remove("active");
	detroit.classList.remove("active");
	slideshowCity = dubaiImages;

	map = new mapboxgl.Map({
 		container: 'map',
  		style: 'mapbox://styles/alysiagode/ckmufm7ye0h8917mzbz2k8el1',
  		center: [55.296249,25.276987],
 		zoom: 7
	});

	map2 = new mapboxgl.Map({
 		container: 'map2',
  		style: 'mapbox://styles/alysiagode/ckmufq99l4p1z17l94idlwbyx',
  		center: [55.296249,25.276987],
  		zoom: 7
	});


	map.on('load', function () {
  cities.forEach(function(city) {
    // Usually you do not want to call an api multiple times, but in this case we have to
    // because the openWeatherMap API does not allow multiple lat lon coords in one request.
    var request = openWeatherMapUrl + '?' + 'appid=' + openWeatherMapUrlApiKey + '&lon=' + city.coordinates[0] + '&lat=' + city.coordinates[1];

    // Get current weather based on cities' coordinates
    fetch(request)
      .then(function(response) {
        if(!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(function(response) {
        // Then plot the weather response + icon on MapBox
        plotImageOnMap(response.weather[0].icon, city)
      })
      .catch(function (error) {
        console.log('ERROR:', error);
      });
  });
});

function plotImageOnMap(icon, city) {
  map.loadImage(
    'https://openweathermap.org/img/w/' + icon + '.png',
    function (error, image) {
      if (error) throw error;
      map.addImage("weatherIcon_" + city.name, image);
      map.addSource("point_" + city.name, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: city.coordinates
            }
          }]
        }
      });
      map.addLayer({
        id: "points_" + city.name,
        type: "symbol",
        source: "point_" + city.name,
        layout: {
          "icon-image": "weatherIcon_" + city.name,
          "icon-size": 1.3
        }
      });
    }
  );
}


		map2.on('load', function () {
  cities.forEach(function(city) {
    // Usually you do not want to call an api multiple times, but in this case we have to
    // because the openWeatherMap API does not allow multiple lat lon coords in one request.
    var request2 = openWeatherMapUrl + '?' + 'appid=' + openWeatherMapUrlApiKey + '&lon=' + city.coordinates[0] + '&lat=' + city.coordinates[1];

    // Get current weather based on cities' coordinates
    fetch(request2)
      .then(function(response) {
        if(!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(function(response) {
        // Then plot the weather response + icon on MapBox
        plotImageOnMap2(response.weather[0].icon, city)
      })
      .catch(function (error) {
        console.log('ERROR:', error);
      });
  });
});

function plotImageOnMap2(icon, city) {
  map2.loadImage(
    'https://openweathermap.org/img/w/' + icon + '.png',
    function (error, image) {
      if (error) throw error;
      map2.addImage("weatherIcon_" + city.name, image);
      map2.addSource("point_" + city.name, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: city.coordinates
            }
          }]
        }
      });
      map2.addLayer({
        id: "points_" + city.name,
        type: "symbol",
        source: "point_" + city.name,
        layout: {
          "icon-image": "weatherIcon_" + city.name,
          "icon-size": 1.3
        }
      });
    }
  );
}

}

detroit.onclick = function() {
	city = 'detroit';
	detroit.classList.add("active");
	dubai.classList.remove("active");
	tokyo.classList.remove("active");
	slideshowCity = detroitImages;

	map = new mapboxgl.Map({
 		container: 'map',
  		style: 'mapbox://styles/alysiagode/ckmufm7ye0h8917mzbz2k8el1',
  		center: [-83.045753,42.331429],
 		zoom: 7
	});

	map2 = new mapboxgl.Map({
 		container: 'map2',
  		style: 'mapbox://styles/alysiagode/ckmufq99l4p1z17l94idlwbyx',
  		center: [-83.045753,42.331429],
  		zoom: 7
	});


map.on('load', function () {
  cities.forEach(function(city) {
    // Usually you do not want to call an api multiple times, but in this case we have to
    // because the openWeatherMap API does not allow multiple lat lon coords in one request.
    var request = openWeatherMapUrl + '?' + 'appid=' + openWeatherMapUrlApiKey + '&lon=' + city.coordinates[0] + '&lat=' + city.coordinates[1];

    // Get current weather based on cities' coordinates
    fetch(request)
      .then(function(response) {
        if(!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(function(response) {
        // Then plot the weather response + icon on MapBox
        plotImageOnMap(response.weather[0].icon, city)
      })
      .catch(function (error) {
        console.log('ERROR:', error);
      });
  });
});

function plotImageOnMap(icon, city) {
  map.loadImage(
    'https://openweathermap.org/img/w/' + icon + '.png',
    function (error, image) {
      if (error) throw error;
      map.addImage("weatherIcon_" + city.name, image);
      map.addSource("point_" + city.name, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: city.coordinates
            }
          }]
        }
      });
      map.addLayer({
        id: "points_" + city.name,
        type: "symbol",
        source: "point_" + city.name,
        layout: {
          "icon-image": "weatherIcon_" + city.name,
          "icon-size": 1.3
        }
      });
    }
  );
}

	map2.on('load', function () {
  cities.forEach(function(city) {
    // Usually you do not want to call an api multiple times, but in this case we have to
    // because the openWeatherMap API does not allow multiple lat lon coords in one request.
    var request2 = openWeatherMapUrl + '?' + 'appid=' + openWeatherMapUrlApiKey + '&lon=' + city.coordinates[0] + '&lat=' + city.coordinates[1];

    // Get current weather based on cities' coordinates
    fetch(request2)
      .then(function(response) {
        if(!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(function(response) {
        // Then plot the weather response + icon on MapBox
        plotImageOnMap2(response.weather[0].icon, city)
      })
      .catch(function (error) {
        console.log('ERROR:', error);
      });
  });
});

function plotImageOnMap2(icon, city) {
  map2.loadImage(
    'https://openweathermap.org/img/w/' + icon + '.png',
    function (error, image) {
      if (error) throw error;
      map2.addImage("weatherIcon_" + city.name, image);
      map2.addSource("point_" + city.name, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: city.coordinates
            }
          }]
        }
      });
      map2.addLayer({
        id: "points_" + city.name,
        type: "symbol",
        source: "point_" + city.name,
        layout: {
          "icon-image": "weatherIcon_" + city.name,
          "icon-size": 1.3
        }
      });
    }
  );
}


}