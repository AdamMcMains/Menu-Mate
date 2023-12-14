let text = document.querySelector('#Location_result p');
let locationBox = document.querySelector('#Location');
let detectBtn = document.querySelector('#find_retaurants_btn');

function getRestaurants(zip){

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
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
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
  