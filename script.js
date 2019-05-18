function separator(tags){
    var tagsString='';
    someVar = tags;
    splittedTags = someVar.split(' ');
    for (i=0; i < splittedTags.length; i++){
        tagsString+='<span>' + splittedTags[i] + '</span>';
    }
    return tagsString;
}


$.getJSON('snippetList.json', function(data){ //Сниппеты Главной страницы
    var items = [];
    for (var i=0; i < data.length; i++) {
        items.push('<li><div class="tags">' + separator(data[i].tags) + '</div><a href="' + data[i].user_id + '-' + data[i].snippetName + '" id="' + data[i].snippetId + '">' + data[i].snippetName + '</a></li>');
    }
    $('<ul/>', {
      'class': 'my-new-list snippets',
      html: items.join('')
    }).appendTo('.usersSnippets');
});

$.getJSON('snippetList.json', function(data){ //Сниппеты Личного Кабинета
    var items = [];

    for (var i=0; i < data.length; i++) {
        items.push('<li><div class="tags">' + separator(data[i].tags) + '</div><a href="' + data[i].user_id + '-' + data[i].snippetName + '" id="' + data[i].snippetId + '">' + data[i].snippetName + '</a></li>');
    }
    $('<ul/>', {
      'class': 'my-new-list snippets',
      html: items.join('')
    }).appendTo('.userSnippetContainer');
  });



$.getJSON('popSearch.json', function(data){
    var items = [];

    for (var i=0; i < data.length; i++) {
        items.push('<li><a href="">' + data[i].query + '</a></li>');
    }
    $('<ul/>', {
      'class': 'popSearchBlock',
      html: items.join('')
    }).appendTo('.popularSearch');
});

$.getJSON('searchResults.json', function(data){  //Сниппеты Поиска
    var items = [];

    for (var i=0; i < data.length; i++) {
        items.push('<li><div class="tags">' + separator(data[i].tags) + '</div><a href="' + data[i].user_id + '-' + data[i].snippetName + '" id="' + data[i].snippetId + '">' + data[i].snippetName + '</a></li>');
    }
    $('<ul/>', {
      'class': 'my-new-list snippets',
      html: items.join('')
    }).appendTo('.searchResults');
});


$(document).ready(function() {
    $(".icon").click(function(event){
        event.preventDefault();
        $(".usersSnippets").hide();
        $(".searchResults").fadeToggle("fast");
    });
});

$(document).ready(function() {
    $(".closeResults").click(function(event){
        event.preventDefault();
        $(".searchResults").hide();
        $(".usersSnippets").show("fast");
    });
});





$(':password').keyup(function(){
    var pas1 = $('input[name=pass1]');
    console.log(pas1);
    console.log(123);
    var pas2 = $('input[name=pass2]');
    if (pas1.val() == pas2.val()) {
      pas2.next().replaceWith('<span></span>');
    } else {
       pas2.next().replaceWith('<span id="xxx"></span>');
    }
});

$(document).ready(function(){
    $('.login-button').click(function(){
        $(this).next('.login-content').slideToggle();
        $(this).toggleClass('active');					
        
        if ($(this).hasClass('active')) $(this).find('span').html('&#x25B2;')
            else $(this).find('span').html('&#x25BC;')
        })
});



$(init);

function init() {
  $('span').click(function(){
      if ($('tagField').val() == '')  {
          $('.tagField').val($(this).text())}
        else {
            $('.tagField').val($('.tagField').val() + ' ' + $(this).text())
        }
  })
}

// SKINUT MISHE
$.getJSON('randomSnippet.json', function(data){
 
    $("<b>" + data.snippetName + "</b>").prependTo($(".SnipName"));
    $("<span>" + data.uploadDate + "</span>").prependTo($(".release"));
    $("<span>Like" + data.likesCount + "</span>").appendTo($(".button-like"));
    $(".button-like span").addClass('remove');
});


$('.button-like').click(function changeState(userId, snippetName) {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/likes/changeState/" + userId + "-" + snippetName,
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function(data) {
            $(".button-like").toggleClass("liked");
            $(".remove").replaceWith("<span>Liked " + (data.likesCount+1) + "</span>")
        },
        error: function (e) {

            var json = "<h4>Ajax Response</h4><pre>"
                + e.responseText + "</pre>";
            $('#feedback').html(json);

            console.log("ERROR : ", e);

        }

    });
})
