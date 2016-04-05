var image;
var anImage = '';

var photosObj;

// Main Angular Application
var App = angular.module("myApp", []);

// Master Angular Controller
App.controller('masterCtrl', function($scope) {

	$scope.info = function() {
		alert('Search Images By a Query Term. The Button With The Arrow Will Put The Screen Back To The Top. Using Flickr API.');
	}

	$scope.loadGallery = function() {

		console.log('Loading Gallery...');

		var query = $('#query').val();
		console.log(query);

		if(query == '') {
			alert('Please Input a Query.');
			return;
		}

		var flickrAPI = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3909720ecbeba83d318a1dd0a7578f03&tags=' + query + '&format=json&callback=?';
		console.log(flickrAPI);

		$scope.photos = [];

		$.getJSON(flickrAPI, function(data){

			console.log(data);

			var photos = data.photos.photo;

			for(var i = 0; i < photos.length; i++) {

				var photo = photos[i];

				var title = photo.title;
				var farm = photo.farm;
				var id = photo.id;
				var owner = photo.owner;
				var secret = photo.secret;
				var server = photo.server;
				var isFamily = photo.isfamily;
				var isFriend = photo.isfriend;
				var isPublic = photo.ispublic;

				var img = 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '.jpg';

				$scope.Photos.push({

					title: title,
					img: img,
					owner: owner,
					text: 'This',

				});

			}
			console.log($scope.Photos);
			$scope.$apply(function(){
				console.log($scope.Photos);
			});

		})/*.error(function(){
			$('#msg').text('Error Occured. Images Could Not Be Loaded.');
			setTimeout(function(){
				$('#msg').text('');
			},4000)
			return;
		});*/

	}

	

});




function jsonFlickrApi(rsp){

	console.log(rsp);

	photosObj = rsp;

	if (rsp.stat != "ok"){
		$('#msg').text('Error Occured. Images Could Not Be Loaded.');
		setTimeout(function(){
			$('#msg').text('');
		}, 4000)
		return;
	}

	var Photos = [];

	var photos = rsp.photos.photo;

	for(var i = 0; i < photos.length; i++) {

		var photo = photos[i];

		var title = photo.title;
		var farm = photo.farm;
		var id = photo.id;
		var owner = photo.owner;
		var secret = photo.secret;
		var server = photo.server;
		var isFamily = photo.isfamily;
		var isFriend = photo.isfriend;
		var isPublic = photo.ispublic;

		var img = 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '.jpg';

		Photos.push({
			title: title,
			img: img,
			owner: owner,
		});

	}
	//console.log(Photos);

	document.getElementById('pictures-body').innerHTML = '';

	$.each(Photos, function(index , item) {

		$('#pictures-body').append(//'<center>' + 
		'<div class="picture-div transition">' + 
		'<img class="flickr-img transition" src="' + item.img + '">' + 
		'<h3 class="txt-center flickr-text transition">' + item.title + '</h3>' + 
		'</div>' 
		/*'</center>'*/);

	});

	$('#pictures-body').scrollTop('0px');
	$('#gc').scrollTop('0px');

}

$(document).ready(function() {

	$('#top-btn').click(function() {

		$('#pictures-body').scrollTop('0px');
		$('#gc').scrollTop('0px');

	});

});