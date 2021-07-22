

    // let list = document.querySelector('#cupcakes');
    // let cupcakeList = list.querySelectorAll('li');
    // let cupcakeCount = cupcakeList.length;
    // let cupcakes = [];
    // for (let i = 0; i < cupcakeCount; i++) {
    //     cupcakes.push(cupcakeList[i].innerHTML);
    // }
    // return cupcakes;



async function getCupcakes() {
    let cupcakeList = await fetch('api/cupcakes').then(res => res.json());
    console.log(typeof cupcakeList);
    console.log(cupcakeList)
    return cupcakeList;
}

$(document).ready(() => {
    let cupcakes = await getCupcakes();
    let list = document.querySelector('#cupcakes');
    let ul = list.querySelector('ul');
    ul.innerHTML = '';
    console.log(cupcakes)
    cupcakes.forEach(cupcake => {
        let li = document.createElement('li');
        li.innerHTML = cupcake;
        ul.appendChild(li);
    });
    alert('cupcake list loaded')
});

    



$( "#form" ).submit(function( event, addCupcake) {
    alert( "Handler for .submit() called." )
    event.preventDefault()
    let $form = $( this ), 
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
    let $select = $(".rating");
    for (i=1;i<=10;i++){
        $select.append($('<option></option>').val(i).html(i))
    }
})