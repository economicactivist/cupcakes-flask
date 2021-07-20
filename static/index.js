$( "#form" ).submit(function( event ) {
    alert( "Handler for .submit() called." );
    event.preventDefault();
  });

$(function(){
    var $select = $(".rating");
    for (i=1;i<=10;i++){
        $select.append($('<option></option>').val(i).html(i))
    }
})