/**
 * Fetch API data
 */
function getAPIdata() {
	var url = 'https://api.openweathermap.org/data/2.5/forecast';
	var apiKey ='85532dca33b10140da462e2297968526';
	var city = 'the%20Hague';

	// construct request
	var request = url + '?' + 'appid=' + apiKey + '&' + 'q=' + city;
	
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
		onAPISucces(response);
	})
	
	// catch error
	.catch(function (error) {
		// onAPIError();
		console.error('Request failed', error);
	});
}

/**
 * Render weather listing
 */
function onAPISucces(response) {

	var weatherList = response.list;
	var weatherBox = document.getElementById('weather');

	for(var i=0; i< weatherList.length; i++){
		//console.log(weatherList[i].main.temp - 273.15);

		var dateTime = new Date(weatherList[i].dt_txt);
		var date = formDate(dateTime);
		var time = formTime(dateTime);
		var temp = Math.floor(weatherList[i].main.temp - 273.15);
		var iconUrl = 'http://openweathermap.org/img/w/'+weatherList[i].weather[0].icon+'.png';

		forecastMessage =  '<div class="forecastMoment">';
		forecastMessage +=   '<div class="date"> '+date+' </div>';
		forecastMessage +=	 '<div class="time"> '+ time +' </div>';
		forecastMessage +=	 '<div class="temp"> '+temp+'&#176;C </div>';
		forecastMessage +=	 '<div class="icon"> <img src="'+iconUrl+'"> </div>';
		forecastMessage += '</div>';

		// weatherBox.innerHTML += forecastMessage;
		console.log(forecastMessage);
	}
}

/**
 * Error
 */
function updateUIError() {
	var weatherBox = document.getElementById('weather');
	weatherBox.className = 'hidden'; 
}
// init data stream
// getAPIdata();
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
},1000);

setInterval(function(){
	blink();
},500);