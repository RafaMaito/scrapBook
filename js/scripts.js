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
            <a href="#" class="btn btn-primary" onclick="editCard(event)">Editar</a>
            <a href="#" class="btn btn-danger" onclick="deleteCard(event)">Excluir</a>
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

function deleteCard(event) {
  const card = event.path[3];
  let idx = Array.from(divCards.children).indexOf(card);
  card.remove();
  cards.splice(idx, 1);
  showCards();
  saveLocalStorage();
}

let newInput = document.createElement('input');
let saveButton = document.createElement('button');

function editCard(event) {
  const card = event.path[1];
  newInput.value = card.childNodes[1].textContent;
  card.childNodes[1].insertAdjacentElement('afterend', newInput);
  card.childNodes[1].remove();
  saveButton.innerHTML = 'Salvar';
  saveButton.setAttribute('onclick', 'saveEdit(event)');
  saveButton.setAttribute('class', 'btn btn-success');
  card.appendChild(saveButton);
}

function saveEdit(event) {
  const card = event.path[1];
  const div = event.path[3];
  card.removeChild(saveButton);
  var newH5 = document.createElement('h5');
  newH5.setAttribute('class', card - title);
  newH5.innerHTML = newInput.value;
  card.childNodes[1].insertAdjacentElement('afterend', newH5);
  card.childNodes[1].remove();
  let newCard = div.outerHTML;
  console.log(card.childNodes[8]);
  let idx = Array.from(divCards.children).indexOf(div);
  cards[idx] = newCard;
  console.log(cards[idx]);
  saveLocalStorage();
  showCards();
}

function showCards() {
  divCards.innerHTML = '';
  for (const item of cards) {
    divCards.innerHTML += item;
  }
  // let idx = Array.from(divCards.children);
  // console.log(idx.length);
}

showCards();
