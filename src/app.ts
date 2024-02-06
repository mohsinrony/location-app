import axios from 'axios';


const form = document.querySelector('form')!;// tells TypeScript that the element with the id 'address' is an input element

const GoogleApiKey = 'AIzaSyAuyPWb0vgdZ3j5PZ6ptox5pFoEUMoYMao';

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: 'OK' | 'ZERO_RESULTS';
}

//declare let google: any;
const searchInputHandler = (event: Event) => {
  event.preventDefault(); // Prevent the default behavior of the form
  const enteredText = document.getElementById('address') as HTMLInputElement; // tells TypeScript that the element with the id 'address' is an input element

  const enteredAddress = enteredText.value;

  axios.get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GoogleApiKey}`)
    .then(response => {
      const coordinates = response.data.results[0].geometry.location;

      const map = new google.maps.Map(document.getElementById('map')!, {
        center: coordinates,
        zoom: 8
      }); // Create a new map

      new google.maps.Marker({ position: coordinates, map: map }); // Add a marker to the map

      if (response.data.status !== 'OK') {
        throw new Error('Could not fetch location');
      }

    })
    .catch(err => {
      console.log(err);
      alert(err.message);
    });

  // send this to Google's API
}

form.addEventListener('submit', searchInputHandler);

// How can we make api calls in TypeScript?
// We can use the fetch API
// fetch('url').then(response => {

// });