let text = document.querySelector('#Location_result p');
let locationBox = document.querySelector('#Location');
let detectBtn = document.querySelector('#find_retaurants_btn');

function restaurantNames(response){


    var restaurantList = document.getElementById('Location_result')
=======
    var restaurantList = document.getElementById('Location_result');


    console.log(response);

    for(i = 0; i < response.businesses.length; i++){

        var restaurants = document.createElement('div');

        restaurants.innerHTML = response.businesses[i].name;

        restaurantList.appendChild(restaurants);





    }
}

function getRestaurants(zip){



    var category;

    if(document.getElementById("vegetarian").checked){
        category = "vegetarian";
        console.log("vegetarian was checked");
    }
    else if(document.getElementById("vegan").checked){
        category = "vegan";
        console.log("vegan was checked");
    }
    else if (document.getElementById("gluten_free").checked){
        category = "gluten_free";
        console.log("gluten free was checked");
    }
    else if (document.getElementById("kosher").checked){
        category = "kosher";
        console.log("kosher was checked");
    }
    else{
      category = "";
      console.log("nothing was checked");
    }


    const options = {
        method: 'GET',
        headers: {
          "x-requested-with": "xmlhttprequest",
          "Access-Control-Allow-Origin": "*",
          accept: 'application/json',
          Authorization: 'Bearer sW-dsNBeUuGD3tQgKOFBeUzIj5oj8T_O96mWZEngST-4EB7JqJZ_UHOmk7VGf4QXiSeJvOPF0lPaIzapvTEHpd4oykiivjD860xqNlLzt4ndWkxnwGNkEA2z-KNyZXYx'
        }
      };

    
      fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${zip}&attributes=&sort_by=best_match&limit=20`, options)



      fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${zip}&categories=${category}&sort_by=best_match&limit=50`, options)

        .then(response => response.json())
        //.then(response => console.log(response))
        .then(response => restaurantNames(response))
       // .catch(err => console.error(err));


       

    };

let successFunction = (position) => {
    text.innerHTML = '';
    detectBtn.innerHTML = 'Detecting Your Location...';
    let { latitude, longitude } = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=32a3d8e9c3b64898a02f43e9b2f09e34`)
        .then(response => response.json()).then(response => {
            let allDetails = response.results[0].components;
            console.table(allDetails);
            let { county, postcode, country, state_code } = allDetails;
            locationBox.innerText = `${county} ${postcode} ${state_code}, ${country}`;
            detectBtn.style.display = 'none';
            getRestaurants(postcode);
        }).catch(() => {
            detectBtn.innerText = "Something went wrong";
        });  
}

let errorFunction = (error) => {
    if (error.code == 1) {
        text.innerHTML = 'You denied to access your location';
    } else if (error.code == 2) {
        text.innerHTML = 'Location is not available';
    } else {
        text.innerHTML = 'Something went wrong';
    }
}

detectBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        text.innerHTML = 'Allow location access to Detect your location.';
       console.log (text)
        navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    } else {
        alert('It seems like Geolocation, which is required for this page, is not enabled in your browser.');
    }

});




