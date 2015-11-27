$("document").ready(function(){
  $("#search").on("submit", function(e){
    e.preventDefault();
    getAPI($("#movie-search").val());
  })
})

function getAPI(keyword){
  url = "http://www.omdbapi.com/?s="+keyword.replace(/ /g,'+')+"&y=&plot=short&r=json";
  $.ajax({
    url: url,
    type: "get",
    dataType: "json"
  }).done(function(response){
    $("#movie-select").children().remove() //empty the select field before populating it
    //define the first option
    $("<option value=''>Results for: "+keyword+"</option>").appendTo($("#movie-select"))
    for (var i=0; i<response.Search.length; i++){
      $("#movie-select").append($('<option id='+response.Search[i].imdbID+'>'+response.Search[i].Title+'</option>'))
    }
    addListener();
    //show the dropdown menu, it's hidden by default
    $("#movie-select").show();
  })
}
function addListener(){
  //check for a change in the select menu
  $("#movie-select").change("submit", function(e){
    if ($('select option:selected').attr('id')) {
      //make a new ajax call based on the id given to the selected
      //element
      $.ajax({
        url:"http://www.omdbapi.com/?i="+$('select option:selected'  ).attr('id')+"&y=&plot=short&r=json",
        type:"get",
        dataType: "json"
      }).done(function(response){
        //empty info div, then append information from the json
        $("#movie-detail").empty()
        $("#movie-detail").append($("<img src="+response.Poster+"/>"))
        $("#movie-detail").append($("<p>Title: "+response.Title+"</p>"+
        "<p>Director: "+response.Director+"</p>"+
        "<p>Actors: "+response.Actors+"</p>"+
        "<p>Country: "+response.Country+"</p>"))
      })
    }
  })
}
