import {months} from './open_close_archive.js';
import {hideArchive} from './open_close_archive.js';
import {openEitForm} from './open_close_form.js';
import {closeForm} from './open_close_form.js';
import {countActiveNote} from './counting_notes.js';
import {countArchivedNote} from './counting_notes.js';
import {deleteFromArchived} from './counting_notes.js';
import {deleteFromActive} from './counting_notes.js';

function addTestFields(){
  const currentDate = getCurrentDate();
  for(let i = 1; i <= 6; i++){
    const newField =  new UpStorage(id, './static/Random Thought.svg', `Test${i}`, currentDate, 'Random Thought', 'txt', '');
  addToStorage(newField);
  countActiveNote(newField.type);
  }
}

function createErrorMassage(massage){
  const formTitle = document.querySelector(".form-title"),
    errorMassage = document.createElement("p");
  
  errorMassage.classList.add("error-massage");
  errorMassage.innerHTML = massage;
  formTitle.appendChild(errorMassage);
}

function addCorectIcons(noteType){
  return (`./static/${noteType.value}.svg`)          
}

function getCurrentType(element, stan){
  return (`${stan}-${element.type.replace(/ /g, "")}`);
}

function getCurrentDate(){
  const today = new Date();
  let currentMonthNumber = today.getMonth();
  let currentDate = (months[currentMonthNumber]+' '+today.getDate()+', '+today.getFullYear());
  return currentDate;
}

function checkEmptyFields(){
  hideArchive();
  const  massage = document.querySelector(".error-massage");

  if (massage) massage.remove();
    
  if(currentNoteName.value == '' || currentNoteContent.value == '' || currentNoteType.value == ''){
    createErrorMassage(`Fill all fields with '*'`)
  }else {
    datesValidation(currentNoteContent);
  }
}

function datesValidation(currentNoteContent){
  let content = currentNoteContent.value;
  let splitedContent = content.split(/,| /);
  let regexExp = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  let validArr = splitedContent.map(x => x.match(regexExp));
  let currentNoteDates = '';
  let splitSymbol = '';
  
  for (let i = 0; i < validArr.length; i++){
    if(validArr[i] != null){
      currentNoteDates += splitSymbol + validArr[i].input; 
      splitSymbol = ', ';
    }
  }
  getValues(currentNoteName, currentNoteContent, currentNoteType, currentNoteDates);
}

function getValues(currentNoteName, currentNoteContent, currentNoteType, currentNoteDates){
  const currentDate = getCurrentDate(),
    formIcon = addCorectIcons(currentNoteType);
  
  let name = currentNoteName.value,
    content = currentNoteContent.value,
    type = currentNoteType.value,
    dates = currentNoteDates;
    countActiveNote(type);
    const newField =  new UpStorage(id, formIcon, name, currentDate, type, content, dates);
  addToStorage(newField);
}

function addToStorage(newField){
  data.push(newField);
  ui.addToLocalStorage(data);
  id++;
  addNewNote(newField);
  addActiveTasks(newField,'none');

}

function addActiveTasks(newField,display){
  
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

function addArchivedTasks(newField,display){
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

function refreshPageArchive(id){
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

function addNewNote(newField){
  const currentRow = document.querySelector(".main-table"),
    newRow = document.createElement("tr");
    
  newRow.classList.add("table-row");
  newRow.innerHTML = `
  <td> 
    <div class="icon-container">
      <img class="icon" alt="icon" src="${newField.icon}">
    </div> 
  </td>
  <td>${newField.name}</td>
  <td>${newField.date}</td>
  <td>${newField.type}</td>
  <td>${newField.content}</td>
  <td>${newField.dates}</td>
  <td class="thiny-column icons-column">
    <img class="icon edit_field-button" alt="bin" src="./static/pen.svg" data-id="${newField.id}">
    <img class="icon archiv_field-button" alt="bin" src="./static/archive.svg" data-id="${newField.id}">
    <img class="icon delete_form_button" alt="bin" src="./static/bin.svg" data-id="${newField.id}">
  </td>`
  currentRow.appendChild(newRow);
  closeForm(currentNoteName, currentNoteContent, currentNoteType);
}


const addNoteButton = document.querySelector(".add_note_button"),
  mainTable = document.querySelector("#main-table");
    
addNoteButton.addEventListener("click",checkEmptyFields);

const currentNoteName = document.querySelector(".current-name"),
  currentNoteContent = document.querySelector(".current-content"),
  currentNoteType = document.querySelector(".current-type");

let id;

const ui = new UI();

let data = ui.retrieveLocalStorgage();
if (data.length > 0){
  id = (data[(data.length-1)].id)+1;
} else {
  id = 1;
}
try{
  data.forEach(function(newField){

    if(newField.archive == 'true'){
      addArchivedTasks(newField,'');
      countArchivedNote(newField.type);
      
    }
    else{
      addNewNote(newField);
      addActiveTasks(newField,'');
      countActiveNote(newField.type);
    }
  });
}catch(error){
  console.log('Table is empty!')
}
  
hideArchive();

if(id == 1){
  addTestFields();
}

mainTable.addEventListener('click', function(event){
  hideArchive();
  event.preventDefault();
  if(event.target.classList.contains('delete_form_button')){
    let id = event.target.dataset.id;
    
    mainTable.removeChild(event.target.parentElement.parentElement);

    let tempData = data.filter(function(item){
      if(item.id == parseInt(id))
      {
        deleteFromActive(item.type);
      }
      return item.id !== parseInt(id);
    });

    data = tempData;
    ui.addToLocalStorage(data);
    

  } else if (event.target.classList.contains('archiv_field-button')){
    
    let id = event.target.dataset.id;
    event.target.parentElement.parentElement.style.display='none';
    
    let tempData = data.filter(function(item){
      if(item.id == parseInt(id))
      { 
        item.archive = 'true';
        countArchivedNote(item.type);
        deleteFromActive(item.type);
        
      }
      return item.id;
    });
    data = tempData;
    ui.addToLocalStorage(data);
    refreshPageArchive(id);
  
  } else if (event.target.classList.contains('edit_field-button')){
    
    let id = event.target.dataset.id;
    mainTable.removeChild(event.target.parentElement.parentElement);

    openEitForm();
    
    const tempForm = data.filter(function(item){
      if(item.id == parseInt(id))
      {
        deleteFromActive(item.type);
      }
      return item.id === parseInt(id);
    });
    
    let tempData = data.filter(function(item){
      return item.id !== parseInt(id);
    });
    data = tempData;
    
    currentNoteName.value = tempForm[0].name;
    currentNoteContent.value = tempForm[0].content;
    currentNoteType.value = tempForm[0].type;
  }  
});

function UI(){
  UI.prototype.addToLocalStorage = function(data){
    
    localStorage.clear();
    const dataJSON = JSON.stringify(data);
    localStorage.setItem('flash-fields', dataJSON)
    ui.retrieveLocalStorgage();
  }

  UI.prototype.retrieveLocalStorgage = function(){

    let savedNotes = localStorage.getItem('flash-fields');
    if (savedNotes){
      const savedNotesParsed = JSON.parse(savedNotes);
      return savedNotesParsed;
    } else {
      return savedNotes = [];
    }
  }
}

function UpStorage(id, formIcon, currentName, currentDate, currentType, currentContent, currentDates){
  this.id = id;
  this.icon = formIcon;
  this.name = currentName;
  this.date = currentDate;
  this.type = currentType;
  this.content = currentContent;
  this.dates = currentDates;
}


