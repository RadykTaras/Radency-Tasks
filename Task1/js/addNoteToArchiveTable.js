import {countActiveNote} from './counting_notes.js';
import {deleteFromArchived} from './counting_notes.js';
import {UI} from './index.js';
import {ui} from './index.js';
import {data} from './index.js';
import {id} from './index.js';
import {addNewNote} from './AddNewNote.js';

export function addActiveTasks(newField,display){
  
  const typeOfNote = getCurrentType(newField, 'active');
  const currentRow = document.querySelector(`.${typeOfNote}`),
    newRow = document.createElement("tr");

  newRow.classList.add("table-row");
  newRow.classList.add(`${typeOfNote}`);
  newRow.classList.add("active");
  newRow.dataset.id = newField.id;
  newRow.style.display = display;
  newRow.innerHTML = `
  <td></td>
  <td>${newField.name}</td>
  <td>${newField.date}</td>
  <td>${newField.content}</td>
  `
  currentRow.after(newRow);
  refreshPageArchive(id);
}

export function addArchivedTasks(newField,display){
  
  const typeOfNote = getCurrentType(newField, 'archived');
  const currentRow = document.querySelector(`.${typeOfNote}`),
    newRow = document.createElement("tr");
    
  newRow.classList.add("table-row");
  newRow.classList.add(`${typeOfNote}`);
  newRow.classList.add("archived");
  newRow.dataset.id = newField.id;
  newRow.style.display = display;
  newRow.archived = "true";
  newRow.innerHTML = `
  <td><img class="icon unarchiv_field-button" alt="unarchiv" src="./static/unarchive.svg" data-id="${newField.id}"></td>
  <td>${newField.name}</td>
  <td>${newField.date}</td>
  <td>${newField.content}</td>
  `
  currentRow.after(newRow);
  refreshPageArchive(id);
  const unachiveButton = document.querySelector('.unarchiv_field-button');
  
  unachiveButton.addEventListener('click',function (event){

    let id = event.target.dataset.id;
    let tempData = data.filter(function(item){
      if(item.id == parseInt(id))
      { 
        item.archive = 'false';
        countActiveNote(item.type);
        removeFieldFromArchive(id);
      }
      return item.id;
    });
   
    ui.addToLocalStorage(tempData);
    deleteFromPageArchive(id);
  })
}

export function refreshPageArchive(id){
  const ui = new UI();
  
  let data = ui.retrieveLocalStorgage();
  data.forEach(function(newField){
    if(newField.archive == 'true' && newField.id == id){
      addArchivedTasks(newField,'none');
      
    }
  });
    ui.addToLocalStorage(data);
}

function deleteFromPageArchive(id){
  const ui = new UI();

  let data = ui.retrieveLocalStorgage();
  data.forEach(function(newField){
    if(newField.archive == 'false' && newField.id == id){
      addNewNote(newField);
      
      
      addActiveTasks(newField,'');
      deleteFromArchived(newField.type);
    }
  });
}

function getCurrentType(element, stan){
  return (`${stan}-${element.type.replace(/ /g, "")}`);
}

function removeFieldFromArchive(id){  
  let activess = document.querySelectorAll('.archived');
  for(let i = 0; i<activess.length; i++){
    if(activess[i].dataset.id == id){
      activess[i].remove();
    }
}}