// API Docs at:
// http://www.omdbapi.com
$("#search").on("submit", function(e){

  e.preventDefault();
  getAPI($("#movie-search").val());
})

function getAPI(keyword){
  url = "http://www.omdbapi.com/?s="+keyword.replace(/ /g,'+')+"&y=&plot=short&r=json";
  $.ajax({
    url: url,
    type: "get",
    dataType: "json"
  }).done(function(response){
    $("#movie-select").empty() //empty the select field before populating it
    for (var i=0; i<response.Search.length; i++){
      $("#movie-select").append($('<option id='+response.Search[i].imdbID+'>'+response.Search[i].Title+'</option>'))
    }
    addListener();
  })
}
function addListener(){
  //check for a change in the select menu
  $("#movie-select").change("submit", function(e){
    //make a new ajax call based on the id given to the selected
    //element
    $.ajax({
      url:"http://www.omdbapi.com/?i="+$('select option:selected' ).attr('id')+"&y=&plot=short&r=json",
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
  })
}
