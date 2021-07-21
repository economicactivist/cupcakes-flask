// $(document).ready()
$( "#form" ).submit(function( event, addCupcake) {
    alert( "Handler for .submit() called." );
    event.preventDefault();
    let $form = $( this ),
        $inputs = $form.find( "input" ),
        $select = $(".rating").select2()
    
    async function addCupcake() {
        let cupcake = await $.ajax({
            url: "/api/cupcake",
            type: "POST",
            data: {
                image: $inputs.eq(0).val(),
                flavor: $inputs.eq(1).val(),
                size: $inputs.eq(2).val(),
                rating: $select.val()
            }
        });
        alert( "Cupcake created: " + cupcake.flavor );
    }
    addCupcake()

  });

$(function(){
    var $select = $(".rating");
    for (i=1;i<=10;i++){
        $select.append($('<option></option>').val(i).html(i))
    }
})