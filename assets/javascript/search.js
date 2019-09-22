/**
 * searchThis
 * @param {string} findme 
 * @param {integer} startYear 
 * @param {integer} endYear 
 * @return calls ajax to fetch the data which is then passed to the updatePage function.
 */
function searchThis(findme, startYear, endYear){
  var apiKey = "fnXV6mDoynpDZ8Xrq1iTMUXpMGpP7Zpr";
  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

  // Build queryURL --- START --- 
  var queryParams = { "api-key" : apiKey };
  if(findme === ""){ return; } // Can't search nothing.
  
  queryParams.q = findme.trim();
  
  startYear = startYear.trim();
  if(parseInt(startYear)){
    startYear += "0101";
    queryParams.begin_date = startYear;
  }
  
  endYear = endYear.trim();
  if(parseInt(endYear)){
    endYear += "0101";
    queryParams.end_date = endYear;
  }
  
  queryParams.sort = "newest";
  // Build queryURL --- END --- 
  queryURL = queryURL + $.param(queryParams);
  console.log("--------------------------------------------------------------------");
  console.log(queryURL);
  console.log("--------------------------------------------------------------------");

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(updatePage);
};

/**
 * updatePage
 * @param {ajax response} NYTData 
 */
function updatePage(NYTData){
  var docs = NYTData.response.docs;
  var numArticles = parseInt($("#article-count").val());
  var resultDiv = $("#article-section");
  
  resultDiv.empty();
  for(var i=0; i < numArticles; i++){
    var title = docs[i].headline.main;
    var written_by = docs[i].byline.original;
    var section = docs[i].section_name;
    var datePublished = docs[i].pub_date;
    var linkURL = docs[i].web_url;

    var articleNumber = $("<span>").addClass("label label-primary").text(i+1);
    title = $("<strong>").text(" "+title);

    written_by = (written_by !== null ) ? $("<h5>").text(written_by) : "";
    section = $("<h5>").text(section);
    datePublished = $("<h5>").text(datePublished);
    linkURL = $("<a>").attr("href",linkURL).attr("target","_blank").text(linkURL);
    
    var row = $("<li>").addClass("list-group-item articleHeadline").append(articleNumber, title, written_by, section, datePublished, linkURL);
    row = $("<ul>").addClass("list-group").attr("id","article-"+(i+1)).html(row);
    resultDiv.append(row);
  }
}

$(function(){
  $("#search").on('click',function(e){
    e.preventDefault();
    
    var searchTerm = $("#search_term").val().trim();
    var startYear = $("#startYear").val().trim();
    var endYear = $("#endYear").val().trim();

    searchThis(searchTerm, startYear, endYear);
  }); 

  $("#clear-all").on("click", function(){
    $("#article-section").empty();
  });
});