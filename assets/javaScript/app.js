$(document).ready(function() {
	// ARRAY FOR ALL THE GIF BUTTONS
	var topics = [ 'LOL', 'SMIRK', 'LAUGH', 'CRY', 'SMH' ];

	// FUNCTION WITH AJAX CALL
	function displayGif() {
		var searchTopic = $(this).data('search');

		var queryURL =
			'https://api.giphy.com/v1/gifs/search?q=' +
			searchTopic +
			'&api_key=CfTQVZYQTKhGwNbpUerCqps76dcI0vS1&limit=9';

		$.ajax({
			url: queryURL,
			method: 'GET'
		}).done(function(response) {
			var results = response.data;

			//FOR LOOP TO GO THROUGH EACH GIF'S DATA SET AND FIND RATING
			for (var i = 0; i < results.length; i++) {
				var showDiv = $("<div class='thumbnail'>");
				var rating = results[i].rating;
				var defaultAnimatedSrc = results[i].images.fixed_height.url;
				var staticSrc = results[i].images.fixed_height_still.url;
				var showImage = $('<img>');
				var p = $('<p>').text('Rating: ' + rating.toString().toUpperCase());

				//ASSIGNING ATTRIBUTES TO GIFS AND ADDING THEM IN THE #GIFAREA DIV
				showImage.attr('src', staticSrc);
				showImage.addClass('giphy');
				showImage.attr('data-state', 'still');
				showImage.attr('data-still', staticSrc);
				showImage.attr('data-animate', defaultAnimatedSrc);
				showDiv.append(p);
				showDiv.append(showImage);
				$('#gifArea').prepend(showDiv);
			}
		});
	}

	//CLICKING THE SUBMIT BUTTON TO ADD A GIF TOPIC INTO THE ARRAY
	$('#addGif').on('click', function(event) {
		event.preventDefault();
		var newGif = $('#gifInput').val().trim();

		//CHECKING IF EMPTY STRING IS ENTERED
		if (newGif === '') {
			return false;
		}
		//CHECKING DUPLICATE ENTRY
		if (topics.toString().toLowerCase().indexOf(newGif.toLowerCase()) != -1) {
			alert('Topic already exists');
		} else topics.push(newGif);
		$('#gifInput').val('');
		displayButtons();
	});

	//FUNCTION FOR DISPLAYING THE TOPIC BUTTON
	function displayButtons() {
		$('#myButtons').empty();
		for (var i = 0; i < topics.length; i++) {
			var newButton = $("<button class='btn btn-primary gifItem'>");
			newButton.attr('data-search', topics[i]);
			newButton.text(topics[i]);
			$('#myButtons').append(newButton);
		}
	}

	displayButtons();

	//CLICK EVENT ON GIF BUTTON AND CALLING THE DISPLAY FUNCTION
	$(document).on('click', '.gifItem', displayGif);

	//CLICK EVENT ON THE GIFS TO PLAY AND PAUSE BY CALLING THE PAUSEPLAYGIFS FUNCTION
	$(document).on('click', '.giphy', pausePlayGifs);

	//FUNCTION TO ANIMATE THE GIFS
	function pausePlayGifs() {
		var state = $(this).attr('data-state');
		if (state === 'still') {
			$(this).attr('src', $(this).attr('data-animate'));
			$(this).attr('data-state', 'animate');
		} else {
			$(this).attr('src', $(this).attr('data-still'));
			$(this).attr('data-state', 'still');
		}
	}
});
