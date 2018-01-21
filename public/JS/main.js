$.ajax({
  type: "GET",
  url: "/movies/all",
  dataType: "json",
  success: function(response){
                var data = formObj(response.data);
                constructDOM(data);
              },
  error: function(err){ console.log("Error in method ",err);}
});

function formObj(res){
  console.log("Test");
  var list = [], lang =[];
  var totObj = [];
  for(i = 0; i < res.length ; i++){
      var movie = res [i];
      if (lang.indexOf(movie.language)==-1) {
          lang.push(movie.language);
      }
      else {
        var index = lang.indexOf(movie.language);
        totObj[index].movies.push(movie);
        continue;
      }
      var obj = {"category":movie.language, "movies": []};
      obj.movies.push(movie);
      totObj.push(obj);
  }
  return totObj;
}

function constructDOM(res){
    var categoryContent = [];
      for(i in res){
        obj = res[i];
        var categoryTitle = $('<div class="clearfix category">');
        categoryTitle.append('<h3 class="categoryName">'+obj.category+'</h3>');

        for(i=0;i<obj.movies.length;i++)
        {
          var code = '<div class="movie fleft">'+
                                    '<a href="#">'+
                                      '<div class="poster">'+
                                          '<img src='+obj.movies[i].posterUrl+'>'+
                                      '</div>'+
                                    '</a>'+
                                  '<div class="details">'+
                                      '<p class="yearOfRelease">'+obj.movies[i].releaseYear+'</p>'+
                                          '<h4 class="name">'+obj.movies[i].name+'</h4>'+
                                              '<div class="stars">';
          var rating = obj.movies[i].rating;
          while(rating>0){

                if(rating>0.5){
                    code +='<div class="star star-full"></div>';
                    rating -= 1 ;
                }
                else{
                  code +='<div class="star star-half"></div>';
                  rating = 0;
                }

          }
          code += '</div></div></div>';
            categoryTitle.append(code);
        }

        categoryContent.push(categoryTitle);
      }
      $('.content').html(categoryContent);

}
