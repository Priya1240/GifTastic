var animals = ["cat", "dog", "goldfish", "horse", "pig", "hamster", "guinea pig", "skunk", "dolphin", "shark", "turtle", "frog", "zebra", "elephant", "ostrich", "parrot", "crocodile", "rhinocerous", "alligator"];


renderButtons();


function searchGif(animal) {


    var url = "http://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: url,
        method: "GET"
    })

    .done(function(response) {
        console.log("received response");

        var results = response.data;
        var gifs = [];

        for (var i = 0; i < results.length; i++) {


            var animalDiv = $("<div class='pull-left'>");

            console.log("results: ", results);

            var gif = {

                rating: results[i].rating,
                stllImg: results[i].images.fixed_height_still.url,
                vidImg: results[i].images.fixed_height.url

            };

            gifs.push(gif);

            var p = $('<p>').text("Rating: " + results[i].rating);

            var animalImg = $("<img class='pic'>");

            animalImg.attr("src", gif.stllImg);
            animalImg.attr("data-stll", gif.stllImg);

            animalImg.attr("data-video", gif.vidImg);
            animalDiv.append(p);
            animalDiv.append(animalImg);
            $("#gifs-appear-here").prepend(animalDiv);

        }

        $(".pic").on("click", function() {

            var stll = $(this).attr("data-stll");

            var src = $(this).attr("src");

            var video = $(this).attr("data-video");

            if (stll === src) {

                $(this).attr("src", video);
                console.log("setting source to video:", video);
            } else {


                $(this).attr("src", stll);
                console.log("setting source to still:", stll);
            }
        });
    });
}

function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < animals.length; i++) {

        var a = $("<button>");

        a.attr("data-animal", animals[i]);

        a.text(animals[i]);

        a.addClass("animal");

        $("#buttons-view").append(a);

    }

    $("button.animal").on("click", function() {

        $("#gifs-appear-here").empty();
        searchGif($(this).attr("data-animal"))
    });
}

$("#add-animal").on("click", function(event) {

    event.preventDefault();

    var animal = $("#animal-input").val().trim();

    animals.push(animal);

    renderButtons();

    $("#animal-input").val("");

});
