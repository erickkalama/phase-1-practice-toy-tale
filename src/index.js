let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const toyCollection = document.getElementById('toy-collection');

  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => {
      toys.forEach(toy => {
        const card = createToyCard(toy);
        toyCollection.appendChild(card);
      });
    })
    .catch(error => console.error('Error fetching toys:', error));
});

function createToyCard(toy) {
  const card = document.createElement('div');
  card.className = 'card';

  const h2 = document.createElement('h2');
  h2.textContent = toy.name;

  const img = document.createElement('img');
  img.src = toy.image;
  img.className = 'toy-avatar';

  const p = document.createElement('p');
  p.textContent = `${toy.likes} Likes`;

  const button = document.createElement('button');
  button.className = 'like-btn';
  button.id = toy.id;
  button.textContent = 'Like ❤️';
  button.addEventListener('click', handleLike);

  card.appendChild(h2);
  card.appendChild(img);
  card.appendChild(p);
  card.appendChild(button);

  return card;
}
document.addEventListener('DOMContentLoaded', () => {
  // Existing code for fetching toys

  const addToyForm = document.querySelector('.add-toy-form');
  addToyForm.addEventListener('submit', handleAddToy);
});

function handleAddToy(event) {
  event.preventDefault();

  const toyName = event.target.name.value;
  const toyImage = event.target.image.value;
  const newToy = {
    name: toyName,
    image: toyImage,
    likes: 0
  };

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(newToy)
  })
    .then(response => response.json())
    .then(toy => {
      const card = createToyCard(toy);
      const toyCollection = document.getElementById('toy-collection');
      toyCollection.appendChild(card);
      event.target.reset();
    })
    .catch(error => console.error('Error adding toy:', error));
}
function handleLike(event) {
  const toyId = event.target.id;
  const toyCard = event.target.closest('.card');
  const likesDisplay = toyCard.querySelector('p');
  
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      likes: parseInt(likesDisplay.textContent) + 1
    })
  })
    .then(response => response.json())
    .then(updatedToy => {
      likesDisplay.textContent = `${updatedToy.likes} Likes`;
    })
    .catch(error => console.error('Error updating likes:', error));
}

