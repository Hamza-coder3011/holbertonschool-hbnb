const token = getCookie('token');

// --- MAPPING PLACES PICTURES ----
const placeImages = {
  "df89747e-3eab-4602-8e70-3bde8c2a7d8a": [
    "images/bungalow/1.jpg",
    "images/bungalow/2.jpg",
    "images/bungalow/3.jpg",
    "images/bungalow/4.jpg",
    "images/bungalow/5.jpg"
  ],
  "e55dfc2e-6b56-416c-b426-f77c635a0a72": [
    "images/forest_house/1.jpg",
    "images/forest_house/2.jpg",
    "images/forest_house/3.jpg",
    "images/forest_house/4.jpg",
    "images/forest_house/5.jpg",
    "images/forest_house/6.jpg"
  ],
  "ed9026b7-8e6d-422f-b75b-6619bf45f4dc": [
    "images/riad_marrakech/1.jpg",
    "images/riad_marrakech/2.jpg",
    "images/riad_marrakech/3.jpg",
    "images/riad_marrakech/4.jpg",
    "images/riad_marrakech/5.jpg"
  ],
  "f9488d98-84aa-40cc-b00b-ce4358ed62e4": [
    "images/studio_paris/1.jpg",
    "images/studio_paris/2.jpg"
  ]
};

// FUNCTIONS DEFINITIONS
// --- Function to fetch place ---------------------
async function fetchPlaces() {
  const response = await fetch('http://localhost:5000/api/v1/places/', {
    method: "GET",
    headers: {
      }
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'An error occured while loading Places');
  }
  return await response.json();
}

// --- Function to fetch place details
async function fetchPlaceById(id) {
  const response = await fetch(`http://localhost:5000/api/v1/places/${id}`, {
        method: "GET",
        headers: {}
      });
      if (!response.ok) {
        const error = await response.json();
        if (response.status === 404) {
          throw new Error(error.message || 'Place not found')
        }
        else if (response.status === 500) {
          throw new Error(error.message || 'Internal server')
        }
        else {
          throw new Error(error.message || "Error")
        }
      }
    return await response.json();
}

async function getUserById(id) {
  const user = await fetch(`http://localhost:5000/api/v1/users/${id}`, {
    method: "GET",
    headers: {}
  });
  if (!user.ok) {
    const error = await user.json();
    if (response.status === 404) {
      throw new Error(error.message || 'User not found')
    }
    else if (response.status === 500) {
      throw new Error(error.message || 'Internal server')
    }
    else {
      throw new Error(error.message || "Error")
    }
  }
  return await user.json();
}

async function displayPlaceById(place) {
  const addReviewSection = document.getElementById('add-review');
  if (addReviewSection && !token) {
    addReviewSection.style.display = 'none';
  };
  const placeDetailSection = document.querySelector('#place-details');
// Affiche toutes les images de la place
placeImages[place.id]?.forEach(imgPath => {
  const img = document.createElement('img');
  img.src = imgPath;
  img.alt = 'some beautiful place';
  img.classList.add('index-place-image');
  placeDetailSection.appendChild(img);
});

  const title = document.createElement('h2');
  title.textContent = place.title;
  placeDetailSection.appendChild(title);
  const host = document.createElement('p');
  host.textContent = `Host: ${place.owner.first_name} ${place.owner.last_name}`; // gérer l'affichage nom/prénom
  placeDetailSection.appendChild(host);
  const description = document.createElement('p');
  description.textContent = place.description;
  placeDetailSection.appendChild(description);
  const price = document.createElement('p');
  price.textContent = `Price: ${place.price}`;
  placeDetailSection.appendChild(price);
  if (place.amenities.length > 0) {
    const amenitiesTitle = document.createElement('h3');
    amenitiesTitle.textContent = 'Amenities';
    placeDetailSection.appendChild(amenitiesTitle);
    const ulist = document.createElement('ul');
    ulist.classList.add('place-info');
    for (const amenity of place.amenities) {
      const item = document.createElement('li');
      item.textContent = amenity.name;
      ulist.appendChild(item);
    }
    placeDetailSection.appendChild(ulist);
  }
  const reviewSection = document.getElementById('reviews');
  for (const review of place.reviews) {
    user = await getUserById(review.user_id);
    const reviewCard = document.createElement('div');
    reviewCard.classList.add('review-card');
    const author = document.createElement('h4');
    author.textContent = `${user.first_name} ${user.last_name}`;
    reviewCard.appendChild(author);
    const comment = document.createElement('p');
    comment.textContent = review.comment;
    reviewCard.appendChild(comment);
    const rating = document.createElement('p');
    rating.textContent = `${review.rating}/5`;
    reviewCard.appendChild(rating);
    reviewSection.appendChild(reviewCard);
  }
}

// --- Login function ----------------------------------------------
async function login(payload) {
  const response = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json"
        }
  });
  if (!response.ok) {
    const error = await response.json();
    if (response.status === 401) {
      throw new Error(error.message || 'Invalid credentials')
    }
    else if (response.status === 500) {
      throw new Error(error.message || 'Internal server')
    }
    else {
      throw new Error(error.message || "Error")
    }
  }
  return await response.json();
}

// --- Post Review :
async function postReview(payload, token) {
  const response = await fetch('http://localhost:5000/api/v1/reviews/', {
    method: "POST",
    body: JSON.stringify(payload),
    headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || 'Error')
    }
  return data;
  }

// --- GET COOKIE BY NAME
function getCookie(name) {
  const cookie = document.cookie.split("; ");
  for (const element of cookie) {
    const [key, value] = element.split("=");
    if (key === name) return value;
  }
  return null;
}

//--- DISPLAY PLACES ----------------------------------------------
function displayPlaces(places) {
  const placeSection = document.querySelector('#places-list');
  if (!placeSection) return; // si pas de liste, ne rien faire

  // Vide la section avant d'afficher
  placeSection.innerHTML = "";

  places.forEach(place => {
    const placeCard = document.createElement('div');
    placeCard.classList.add('place-card');

    const placeImg = document.createElement('img');
    placeImg.src = placeImages[place.id]?.[0] || "images/default.jpg";
    placeImg.alt = 'picture of the place';
    placeImg.classList.add('index-place-image');
    placeCard.appendChild(placeImg);

    const placeTitle = document.createElement('h4');
    placeTitle.textContent = place.title;
    placeCard.appendChild(placeTitle);

    const placePrice = document.createElement('p');
    placePrice.textContent = place.price;
    placeCard.appendChild(placePrice);

    const placeDetails = document.createElement('a');
    placeDetails.classList.add('details-button');
    placeDetails.href = `place.html?id=${place.id}`;
    placeDetails.textContent = 'View details';
    placeCard.appendChild(placeDetails);

    placeSection.appendChild(placeCard);
  });
}


// ------------------------------------------------------------------//
// --- SCRIPT -------------------------------------------------------//

document.addEventListener('DOMContentLoaded', async () => {
  // header include
  await fetch('header.html')
  .then(response => response.text())
  .then(html => {document.querySelector('header').innerHTML = html;});
  // footer include
  await fetch('footer.html')
  .then(r => r.text())
  .then(html => {document.querySelector('footer').innerHTML = html;});

  //---CHECK IF LOGGED / LOG BUTTONS AND LINK
  if (token) {
    const loginNav = document.getElementById('login-link');
    loginNav.textContent = 'logout';
    const loginButton = document.querySelector('.login-button')
    loginButton.textContent = 'logout';
    loginButton.addEventListener('click', () => {
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; samesite=strict"; 
      loginButton.removeAttribute('href')
      window.location.href = 'index.html';
    })
    loginNav.addEventListener('click', () => {
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; samesite=strict"; 
      loginNav.removeAttribute('href');
      window.location.href = 'index.html';
    })
  }
  //---FETCH PLACES AND DISPLAY PLACES CARDS
  const placeList = document.getElementById('places-list');
  if (placeList) {
    try {
    const places = await fetchPlaces();
    if (places) {
      const placeSection = document.querySelector('#places-list');
      displayPlaces(places);
      const filter = document.getElementById('price-filter')
    filter.addEventListener('change', (event) => {
      const maxPrice = event.target.value === 'all' ? Infinity : Number(event.target.value);
      placeSection.innerHTML = "";
      let filteredPlaces = places;
      filteredPlaces = places.filter(p => p.price <= maxPrice);
      displayPlaces(filteredPlaces);
    });
    }
    } catch (error) {
      console.error("Error: ", error)
    }
    }

  //--- PLACE DETAILS -------------------------------------------------
  const placeById = document.querySelector('#place-details');
  if (placeById) {
    const parameters = new URLSearchParams(window.location.search);
    const placeId = parameters.get('id');
    try {
      const placeByIdDetails = await fetchPlaceById(placeId);
      if (placeById) {
        displayPlaceById(placeByIdDetails);
      }
      } catch (error) {
        console.error("Error: ", error);
      }
  };

  const reviewForm = document.querySelector('#review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', async event => {
    event.preventDefault();
    const comment = document.getElementById('review-text').value;
    const rating = document.getElementById('rating').value;
    const parameters = new URLSearchParams(window.location.search);
    const payloadReview = {
      "comment": comment,
      "rating": parseInt(rating),
      "place_id": parameters.get('id')
    };
    const responseP = document.getElementById('response');
    try {
      const response = await postReview(payloadReview, token);
      responseP.textContent = "Review successfully submitted";
      responseP.style.color = 'green';
    } catch (error) {
      responseP.textContent = error.message;
      responseP.style.color = 'red';
      console.error("Error: ", error);
    }
  })
  };
  

  //---LOGIN----------------------------------------------------------- 
  const loggin = document.querySelector('#login-form')
  const errorText = document.querySelector('#error-text')
  // repère l'élément loggin sur la page
  if (loggin) {
    loggin.addEventListener('submit', async (event) => {
      event.preventDefault(); // évite le refresh de la page ?
      const payload = {
        'email': document.querySelector('input[name=email]').value,
        'password': document.querySelector('input[name=password]').value
      }
      try {
        const data = await login(payload);
        errorText.textContent = "";
        document.cookie = "token=" + data.access_token + "; path=/; SameSite=strict"; 
        // ajouter "secure" plus tard
        window.location.href = 'index.html';
        } catch (error) {
          errorText.textContent = error.message;
        }
    });
  }
});
