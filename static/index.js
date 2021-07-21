// $(document).ready()
$( "#form" ).submit(function( event, addCupcake) {
    alert( "Handler for .submit() called." )
    event.preventDefault()
    let $form = $( this )
        $select = $(".rating")

    async function addCupcake() {
        await axios.post( "http://localhost:5000/api/cupcakes", {
            image: $form.find( "input[name=image]" ).val(),
            flavor: $form.find( "input[name=flavor]" ).val(),
            size: $form.find( "input[name=size]" ).val(),
            rating: $select.val()

        }); 
        alert( "Cupcake added!" );
    }
    addCupcake()

  });

$(function(){
    var $select = $(".rating");
    for (i=1;i<=10;i++){
        $select.append($('<option></option>').val(i).html(i))
    }
})