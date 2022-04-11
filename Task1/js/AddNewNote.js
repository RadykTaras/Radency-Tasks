import {hideArchive} from './open_close_archive.js';
import {countActiveNote} from './counting_notes.js';
import {addToStorage} from './index.js';
import {UpStorage} from './index.js';
import {id} from './index.js';
import {closeForm} from './open_close_form.js';
import {getCurrentDate} from './getCurrentDate.js';

const addNoteButton = document.querySelector(".add_note_button");
    
const currentNoteName = document.querySelector(".current-name"),
  currentNoteContent = document.querySelector(".current-content"),
  currentNoteType = document.querySelector(".current-type");
  
addNoteButton.addEventListener("click",checkEmptyFields);

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

function createErrorMassage(massage){
  const formTitle = document.querySelector(".form-title"),
    errorMassage = document.createElement("p");
  
  errorMassage.classList.add("error-massage");
  errorMassage.innerHTML = massage;
  formTitle.appendChild(errorMassage);
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

function addCorectIcons(noteType){
  return (`./static/${noteType.value}.svg`)          
}

export function addNewNote(newField){
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