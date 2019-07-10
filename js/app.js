// Date UI ele
const timeEle = document.querySelector('.card__time');
// Date function to return the users time info as string
const getDateString = () => {
   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
   const now = new Date();

   const year = now.getFullYear();
   const month = now.getMonth();
   const date = now.getDate();

   return `${months[month]} ${date}, ${year}`;
}

timeEle.textContent = getDateString();

// Anything todo related
const todoList = document.querySelector('.todos__list');
const emptyListEle = document.querySelector('.todos__empty');
const todoForm = document.querySelector('.todo-form');
// Local Storage
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(itemsArray))
const data = JSON.parse(localStorage.getItem('items'))

const checkList = () => {
   if (todoList.children.length > 1) {
      emptyListEle.classList.add('todos__empty--hide');
   } else {
      emptyListEle.classList.remove('todos__empty--hide');
   }
}

const setLocalStorage = () => {
   localStorage.setItem('items', JSON.stringify(itemsArray))
}

// Check the urg argument and return appropriate string for later use
const checkUrgency = (urg) => {
   if (urg === 'low') {
      return 'low';
   } else if (urg === 'med') {
      return 'med';
   } else if (urg === 'high') {
      return 'high';
   }
}

const createATodo = (txt, clr) => {
   // Elements
   const todoContainer = document.createElement('li');
   const todoText = document.createElement('p');
   const todoBtnsContainer = document.createElement('div');
   const todoBtnDelete = document.createElement('button');

   // Misc
   todoText.textContent = txt;
   todoContainer.classList.add(`todos__item--urgency-${checkUrgency(clr)}`);

   // Classes
   todoContainer.classList.add('todos__item');
   todoBtnsContainer.classList.add('todos__item-inner');
   todoBtnDelete.classList.add('todos__option');
   todoBtnDelete.classList.add('todos__option--delete');
   // Appending
   todoBtnsContainer.appendChild(todoBtnDelete);
   todoContainer.appendChild(todoText);
   todoContainer.appendChild(todoBtnsContainer);
   todoList.appendChild(todoContainer);
}

todoForm.addEventListener('submit', (e) => {
   const todoText = document.querySelector('.todo-form__input-text').value;
   const todoUrgency = document.querySelector('.todo-form__input-urgency').value;

   // Local storage functionality
   itemsArray.push({
      txt: todoText,
      urg: todoUrgency
   });

   setLocalStorage();
   createATodo(todoText, todoUrgency);
   checkList();
   todoList.lastElementChild.scrollIntoView(true);

   todoForm.reset();
   e.preventDefault();
})

todoList.addEventListener('click', (e) => {
   if (e.target.classList.contains('todos__option--delete')) {
      const userVefiry = confirm('Are you sure?');
      if (userVefiry) {
         e.target.parentElement.parentElement.remove();
         itemsArray.splice(itemsArray.findIndex((item) => item.txt === e.target.parentElement.previousElementSibling.textContent), 1)
         setLocalStorage();
         checkList();
      }
   }
});

data.forEach(item => {
   createATodo(item.txt, item.urg, item.ticked);
})

checkList();