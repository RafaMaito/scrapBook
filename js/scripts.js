const divCards = document.getElementById('divCards');
const buttonCard = document.getElementById('buttonCard');
const cards = JSON.parse(localStorage.getItem('cards')) || [];

function createCard(title, data) {
  const newCard = `
  <div class="col">
    <div class="card w-50">      
        <div class="card-body">
        <h5 class="card-title">${title}</h5>
            <p class="card-text">${data}</p>
            <a href="#" class="btn btn-primary">Editar</a>
            <a href="#" class="btn btn-danger" onclick="excluirCard(event)">Excluir</a>
        </div>
    </div>
</div>`;
  addCard(newCard);
}

function addCard(newCard) {
  cards.push(newCard);
  divCards.innerHTML += newCard;
}

function saveLocalStorage() {
  localStorage.setItem('cards', JSON.stringify(cards));
}

buttonCard.addEventListener('click', () => {
  const title = document.getElementById('title');
  const contentInput = document.getElementById('contentInput');
  createCard(title.value, contentInput.value);
  saveLocalStorage();
  clearInput();
});

function clearInput() {
  title.value = '';
  contentInput.value = '';
}

function showCards() {
  for (const item of cards) {
    divCards.innerHTML += item;
  }
}

showCards();
