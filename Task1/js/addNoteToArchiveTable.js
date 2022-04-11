import {countActiveNote} from './counting_notes.js';
import {deleteFromArchived} from './counting_notes.js';
import {UI} from './index.js';

export function addActiveTasks(newField,display){
  
  const typeOfNote = getCurrentType(newField, 'active');
  const currentRow = document.querySelector(`.${typeOfNote}`),
    newRow = document.createElement("tr");

  newRow.classList.add("table-row");
  newRow.classList.add(`${typeOfNote}`);
  newRow.classList.add("active");
  newRow.style.display = display;
  newRow.innerHTML = `
  <td></td>
  <td>${newField.name}</td>
  <td>${newField.date}</td>
  <td>${newField.content}</td>
  `
  currentRow.after(newRow);
  
}

export function addArchivedTasks(newField,display){
  const typeOfNote = getCurrentType(newField, 'archived');
  const currentRow = document.querySelector(`.${typeOfNote}`),
    newRow = document.createElement("tr");
    
  newRow.classList.add("table-row");
  newRow.classList.add(`${typeOfNote}`);
  newRow.classList.add("archived");
  newRow.style.display = display;
  newRow.innerHTML = `
  <td><img class="icon unarchiv_field-button" alt="unarchiv" src="./static/unarchive.svg" data-id="${newField.id}"></td>
  <td>${newField.name}</td>
  <td>${newField.date}</td>
  <td>${newField.content}</td>
  `
  currentRow.after(newRow);
  const unachiveButton = document.querySelector('.unarchiv_field-button');
  unachiveButton.addEventListener('click',function (event){
    
    let id = event.target.dataset.id;
    let tempData = data.filter(function(item){
      if(item.id == parseInt(id))
      { 
        item.archive = 'false';
        countActiveNote(item.type);
        deleteFromArchived(item.type);
      }
      return item.id;
    });
    data = tempData;
    ui.addToLocalStorage(data);
    deleteFromPageArchive(id);
  })
}

export function refreshPageArchive(id){
  const ui = new UI();
  
  let data = ui.retrieveLocalStorgage();
  data.forEach(function(newField){
    if(newField.archive == 'true' && newField.id == id){
      
      newField.archive = 'false';
      addArchivedTasks(newField,'none');
    }
  });
}

function deleteFromPageArchive(id){
  const ui = new UI();
  let data = ui.retrieveLocalStorgage();
  data.forEach(function(newField){
    if(newField.archive == 'false' && newField.id == id){
      addNewNote(newField);
      
      newField.archive = 'true';
      addActiveTasks(newField,'');
    }
  });
}

function getCurrentType(element, stan){
  return (`${stan}-${element.type.replace(/ /g, "")}`);
}
