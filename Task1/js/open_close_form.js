const formContainer = document.querySelector(".note_form-container"),
  openFormButton = document.querySelector(".open_form_button"),
  closeFormButton = document.querySelector(".close_form_button"),
  addNoteButton = document.querySelector(".add_note_button");
      
openFormButton.addEventListener("click",openForm);
closeFormButton.addEventListener("click",closeForm);
  
function openForm(){
  formContainer.style.display = "block";
  addNoteButton.value = 'Add note';
  closeFormButton.style.display = "block";
  openFormButton.disabled = true;
}

export  function openEitForm(){
  formContainer.style.display = "block";
  addNoteButton.value = 'Edit';
  closeFormButton.style.display = "none";
  openFormButton.disabled = true;
}

export  function closeForm(...x){
  for (let i = 0; i < x.length; i++){
    x[i].value = '';
  }
  formContainer.style.display = "none";
  openFormButton.disabled = false;
}
  
 