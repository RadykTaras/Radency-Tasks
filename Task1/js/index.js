import {hideArchive} from './open_close_archive.js';
import {openEitForm} from './open_close_form.js';
import {countActiveNote} from './counting_notes.js';
import {countArchivedNote} from './counting_notes.js';
import {deleteFromActive} from './counting_notes.js';
import {getCurrentDate} from './getCurrentDate.js';
import {addNewNote} from './AddNewNote.js';
import {addActiveTasks} from './addNoteToArchiveTable.js';
import {addArchivedTasks} from './addNoteToArchiveTable.js';
import {refreshPageArchive} from './addNoteToArchiveTable.js';


function removeFieldFromActive(id){  
  let activess = document.querySelectorAll('.active');
  for(let i = 0; i<activess.length; i++){
    if(activess[i].dataset.id == id){
      activess[i].remove();
    }
}}

function addTestFields(){
  const currentDate = getCurrentDate();
  for(let i = 1; i <= 6; i++){
    const newField =  new UpStorage(id, './static/Random Thought.svg', `Test${i}`, currentDate, 'Random Thought', 'txt', '');
  addToStorage(newField);
  countActiveNote(newField.type);
  }
}

export function UI(){
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

export function UpStorage(id, formIcon, currentName, currentDate, currentType, currentContent, currentDates){
  this.id = id;
  this.icon = formIcon;
  this.name = currentName;
  this.date = currentDate;
  this.type = currentType;
  this.content = currentContent;
  this.dates = currentDates;
}

export function addToStorage(newField){
  data.push(newField);
  ui.addToLocalStorage(data);
  id++;
  addNewNote(newField);
  addActiveTasks(newField,'none');
}

const mainTable = document.querySelector("#main-table");

const currentNoteName = document.querySelector(".current-name"),
  currentNoteContent = document.querySelector(".current-content"),
  currentNoteType = document.querySelector(".current-type");

export let id;

export const ui = new UI();

export let data = ui.retrieveLocalStorgage();
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
    
    deleteNote(id);

  } else if (event.target.classList.contains('archiv_field-button')){
    
    let id = event.target.dataset.id;
    event.target.parentElement.parentElement.style.display='none';
     addToArctiveNote(id);
  
  } else if (event.target.classList.contains('edit_field-button')){
    
    let id = event.target.dataset.id;
    mainTable.removeChild(event.target.parentElement.parentElement);
    openEitForm();
    
    const tempForm = data.filter(function(item){
      if(item.id == parseInt(id))
      {
        deleteFromActive(item.type);
        removeFieldFromActive(id);
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


function deleteNote(id){
  let tempData = data.filter(function(item){
    if(item.id == parseInt(id))
    {
      deleteFromActive(item.type);
    }
    return item.id !== parseInt(id);
  });
  removeFieldFromActive(id);
  data = tempData;
  ui.addToLocalStorage(data);
}

function addToArctiveNote(id){
  
  let tempData = data.filter(function(item){
    if(item.id == parseInt(id))
    { 
      item.archive = 'true';
      countArchivedNote(item.type);
      deleteFromActive(item.type);
    }
    return item.id;
  });
  removeFieldFromActive(id);
  data = tempData;
  ui.addToLocalStorage(data);
  refreshPageArchive(id);
}