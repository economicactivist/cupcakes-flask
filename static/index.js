

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

$(document).ready(async () => {
    let cupcakes = await getCupcakes();
    console.log(typeof cupcakes);
    let cupcakeDiv = document.querySelector('#cupcakes');
    cupcakeLength = Object.keys(cupcakes).length;
    
    console.log(cupcakes)
    for (let i = 0; i < cupcakeLength; i++) {
        let cupcakeImageDiv = document.createElement('div');
        cupcakeImageDiv.className = 'cupcake-image-div';
        let cupcakeImage = document.createElement('img');
        cupcakeImage.src = cupcakes['cupcakes'][i]['image']
        console.log(cupcakeImage.src)
        console.log(cupcakes['cupcakes'])
        cupcakeDiv.appendChild(cupcakeImageDiv);
        cupcakeImageDiv.appendChild(cupcakeImage);


    }

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