const divCards = document.getElementById('divCards');
const buttonCard = document.getElementById('buttonCard');
const cards = JSON.parse(localStorage.getItem('cards')) || [];

function createCard(title, data) {
  const newCard = `
  <div class="col">
    <div class="card w-50">      
        <div class="card-body d-flex flex-column">
        <h5 class="card-title">${title}</h5>
            <p class="card-text">${data}</p>
            <a href="#" class="btn btn-primary mb-2" onclick="editCard(event)">Editar</a>
            <a href="#" class="btn btn-danger mb-2" onclick="deleteCard(event)">Excluir</a>
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

let newTitle = document.createElement('input');
newTitle.setAttribute('class', 'mb-3');
let newContent = document.createElement('input');
newContent.setAttribute('class', 'mb-3');
let saveButton = document.createElement('button');

function editCard(event) {
  const card = event.path[1];
  console.log(card.childNodes);
  newTitle.value = card.childNodes[1].textContent;
  card.childNodes[1].insertAdjacentElement('afterend', newTitle);
  card.childNodes[1].remove();
  newContent.value = card.childNodes[3].textContent;
  card.childNodes[3].insertAdjacentElement('afterend', newContent);
  card.childNodes[3].remove();
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
  newH5.setAttribute('class', 'card-title');
  newH5.innerHTML = newTitle.value;
  card.childNodes[1].insertAdjacentElement('afterend', newH5);
  card.childNodes[1].remove();

  var newP = document.createElement('p');
  newP.setAttribute('class', 'card-text');
  newP.innerHTML = newContent.value;
  card.childNodes[3].insertAdjacentElement('afterend', newP);
  card.childNodes[3].remove();

  let newCard = div.outerHTML;
  let idx = Array.from(divCards.children).indexOf(div);
  cards[idx] = newCard;
  saveLocalStorage();
  showCards();
}

function showCards() {
  divCards.innerHTML = '';
  for (const item of cards) {
    divCards.innerHTML += item;
  }
}

showCards();
