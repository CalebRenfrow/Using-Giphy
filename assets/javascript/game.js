$(document).ready(function() {
var animalsArray = ["frog","leopard","fox","spider","bull","bat","lion","black bear", "eagle","beetle","human"];


function createAnimalTags(){
    $("#animal-tags").empty();

    for(let i = 0; i < animalsArray.length; i++){
        var newBtn = $("<button>");
        newBtn.addClass("animal");
        newBtn.attr('data-name', animalsArray[i]);
        newBtn.text(animalsArray[i]);
        $("#animal-tags").append(newBtn);
    }
}

$("#addAnimal").on("click",function(event){
    event.preventDefault();

    let newAnimal = $("#animal-input").val().trim();
    animalsArray.push(newAnimal);
    $("#animal-input").val("");
    createAnimalTags();
   
});

function giphySearch(){
  
   var searchAnimal =  $(this).attr("data-name");
    console.log(searchAnimal);
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=hwY5P3sm5Y7UtHDsIeSNOJnRrugQEGgo&q=" + searchAnimal +"&limit=10&offset=0&lang=en";

   $.ajax({
       url: queryURL,
       method: "GET"
   }).done(function(response)
   {
    console.log(response);
    for (let i = 0; i<10;i++){
    var newDiv = $("<div>");
    var newIMG = $("<img>");

    var gifStill = response.data[i].images.fixed_height_still.url;
    newIMG.attr('data-still', gifStill);
    newIMG.attr("src",gifStill);
    newIMG.attr("alt",searchAnimal);

    var gifImage = response.data[i].images.fixed_height.url;
    newIMG.attr('data-animate', gifImage);
    newIMG.attr('data-state', 'still');
    
    var gifRating = response.data[i].rating;
    
    var newP = $("<p>");
    newP.text( "Rating: " + gifRating);
    // need to append to the div in html
    newDiv.append(newP);
    newDiv.append(newIMG);
    newDiv.addClass("animal-gif");
    
    $(".gifs-here").prepend(newDiv);
    
    }
 });
       
}
$(document).on("click",".animal-gif",function(){
    console.log("clicked")
    var state = $(this).find('img').attr('data-state');    
    
    if (state === "still"){
        $(this).find('img').attr('src', $(this).find('img').attr('data-animate') );
        $(this).find('img').attr('data-state','animate');
    }
    if (state === "animate"){
        $(this).find('img').attr('src', $(this).find('img').attr('data-still') );
        $(this).find('img').attr('data-state','still');
    }
});
$(document).on("click", ".animal", giphySearch);

createAnimalTags();


});