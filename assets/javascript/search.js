/**
 * searchThis
 * @param {string} findme 
 * @param {integer} howMany 
 * @param {integer} startYear 
 * @param {integer} endYear 
 */
function searchThis(findme,howMany="10",startYear="2018",endYear="2019"){
  var apiKey = "fnXV6mDoynpDZ8Xrq1iTMUXpMGpP7Zpr";
  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + findme + "&sort=newest&api-key=" + apiKey;
  
  startYear = parseInt(startYear) + "0101";
  endYear = parseInt(endYear) + "0101";

  queryURL += "&begin_date=" + startYear;
  queryURL += "&end_date=" + endYear;

  // DOM ELEMENTS
  var resultDiv = $("#results");

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(dataResult) {
    console.log(dataResult);
    var docs = dataResult.response.docs;
    
    resultDiv.empty();
    for(var i=0; i < howMany; i++){
      var title = docs[i].headline.main;
      var written_by = docs[i].byline.original;
      console.log("Title: ",title);
      console.log("By: ",written_by);
      console.log("----------------------");


      var articleHeadline = $("<h3>").addClass("articleHeadline");
      var articleNumber = $("<span>").addClass("label label-primary").text(i);
      title = $("<strong>").text(title);
      articleHeadline.append(articleNumber,title);

      written_by = $("<h5>").text(written_by);
      
      var row = $("<div>").addClass("well").attr("id","article-well-"+i);
      row.append(articleHeadline, written_by);
      resultDiv.append(row);
    }
  });
  
};

$(function(){
  $("#search_button").on('click',function(e){
    e.preventDefault();
    var searchTerm = $("#search_term").val();
    searchThis(searchTerm);
  }); // END click search_button
});