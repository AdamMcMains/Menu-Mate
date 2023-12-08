const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer sW-dsNBeUuGD3tQgKOFBeUzIj5oj8T_O96mWZEngST-4EB7JqJZ_UHOmk7VGf4QXiSeJvOPF0lPaIzapvTEHpd4oykiivjD860xqNlLzt4ndWkxnwGNkEA2z-KNyZXYx'
    }
  };
  
fetch( 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?sort_by=best_match&limit=20', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
let text = document.querySelector('#Location_result p');
let locationBox = document.querySelector('.Location');
let detectBtn = document.querySelector('#find_retaurants_btn');