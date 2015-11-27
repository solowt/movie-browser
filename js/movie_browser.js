// API Docs at:
// http://www.omdbapi.com
$("#search").on("submit", function(e){

  e.preventDefault();
  getAPI($("#movie-search").val());
})

function getAPI(keyword){
  url = "http://www.omdbapi.com/?s="+keyword.replace(/ /g,'+')+"&y=&plot=short&r=json"

  $.ajax({
    url: url,
    type: "get",
    dataType: "json"
  }).done(function(response){
    $("#movie-select").empty() //empty the select field before populating it
    for (var i=0; i<response.Search.length; i++){
      $("#movie-select").append($('<option>'+response.Search[i].Title+'</option>'))
    }
  })

}
