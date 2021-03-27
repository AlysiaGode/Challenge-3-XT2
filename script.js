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
		var iconUrl = 'http://openweathermap.org/img/w/'+forecastList[i].weather[0].icon+'.png';

		iconForecast = "<div id='forecastDegrees'>" + temp + '&#176;C </div>';
		degreesForecast ='<div id=" "> <img id="forecastIcon" src="' + iconUrl + '"> </div>';

		weatherBoxDegrees.innerHTML = degreesForecast;
		weatherBoxIcon.innerHTML = iconForecast;
	}
x = parseInt(response.city.coord.lat);
z = parseInt(10);
y = parseInt(response.city.coord.lon);
console.log(x,y);
getAPIdataPrecipitation();

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
	sunRise.innerHTML += sunRiseIcon + '<div class=sunDate>' + addLeadingZero(day) + '-' + addLeadingZero(month) + ' rise: ' + '</div>' + '<div class=sunTimes>' + convertUNIX(unixTimeRise) + ' UTC' + '</div>'
	sunSet.innerHTML += sunSetIcon + '<div class=sunDate>' + addLeadingZero(day+1) + '-' + addLeadingZero(month) + ' set: ' +  '</div>' + '<div class=sunTimes>' + convertUNIX(unixTimeSet) + ' UTC' + '</div>'
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





function getAPIdataPrecipitation() {
//openweather precipitation---------------------------------------------------------------------------------------------
	var urlPrecipitation = 'https://tile.openweathermap.org/map/precipitation_new/'
	var requestPrecipitation = urlPrecipitation + z + '/' + x + '/' + y + '.png?appid=' + apiKey;

	//get weather
	fetch(requestPrecipitation)
	// parse to JSON format
	.then(function(responsePrec) {
		if(!responsePrec.ok) throw Error(responsePrec.statusText);
		return responsePrec.json();
	})
	
	// render weather per day
	.then(function(responsePrec) {
		console.log(responsePrec);
		// render weatherCondition
		onAPISuccesPrecipitation(responsePrec);
	})
	
	// catch error
	.catch(function (errorPrec) {
		onAPIErrorPrecipitation();
		console.error('Request failed', errorPrec);
	});
}


function onAPISuccesPrecipitation(responsePrec) {
//openweather weather---------------------------------------------------------------------------------------------
	var precipitationList = responsePrec.list;
	var rain = document.getElementById("rain");
	var wind = document.getElementById("wind");
	var windWeather;
	var rainWeather;
console.log('test');
	for(var i=0; i< precipitationList.length; i++){

		// rain.innerHTML = degreesForecast;
		// wind.innerHTML = iconForecast;
	}
}


function onAPIErrorPrecipitation() {
	var rain = document.getElementById('rain');
	rain.className = 'hidden'; 

	var wind = document.getElementById('wind');
	wind.className = 'hidden'; 
}


// init data stream
getAPIdataForecast();
// getAPIdataPrecipitation();

setInterval(function(){
	// getAPIdataForecast();
	// getAPIdataPrecipitation();
},3000);
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
}

dubai.onclick = function() {
	city = 'dubai';
	dubai.classList.add("active");
	tokyo.classList.remove("active");
	detroit.classList.remove("active");
	slideshowCity = dubaiImages;
}

detroit.onclick = function() {
	city = 'detroit';
	detroit.classList.add("active");
	dubai.classList.remove("active");
	tokyo.classList.remove("active");
	slideshowCity = detroitImages;
}