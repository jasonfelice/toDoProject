import './style.css';
import deleteTask from './deleteTask.js';
import addTasktoDom from './addTasktoDom.js';
import loadTaskList from './loadTaskList.js';
import editTask from './editTask.js';
import { toggleCompleted, clearAllComplete } from './toggleCompleted.js';

loadTaskList();

const addToDo = document.querySelector('.addToDo');
const form = document.querySelector('form');

form.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    if (addToDo.value === '') {
      addToDo.setCustomValidity('Please add task description.');
    } else {
      e.preventDefault();
      addTasktoDom({ description: addToDo.value });
      addToDo.value = '';
    }
  }
});

document.addEventListener('click', (e) => {
  if (e.target.matches('.fa-trash-can')) {
    let index = e.target.parentElement.classList[0];
    index = parseInt(index, 10);
    deleteTask(index);
    e.target.parentElement.remove();
  } else if (e.target.matches('.taskList input[type="text"]')) {
    const element = e.target.parentElement.querySelector('i');
    element.classList.toggle('fa-trash-can');
    element.classList.toggle('fa-ellipsis-vertical');
    e.target.parentElement.classList.toggle('active');
    e.target.classList.toggle('active');
    e.target.addEventListener('input', (event) => {
      editTask(event);
    });
  } else if (e.target.matches('.taskList input[type="checkbox"]')) {
    e.target.addEventListener('change', (event) => {
      toggleCompleted(event);
      if (!e.target.checked) {
        e.target.parentElement.classList.remove('checked');
      } else {
        e.target.parentElement.classList.add('checked');
      }
    });
  }
});

document.querySelector('.clearButton').addEventListener('click', () => {
  clearAllComplete();
});
