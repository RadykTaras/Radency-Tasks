
export  function countActiveNote(noteType){
    let activeNumber = document.querySelector(`.number-of-${noteType.replace(/ /g, "")}`);
      activeNumber.innerHTML = Number(activeNumber.innerHTML) +1;
  }

export  function countArchivedNote(noteType){
    let archivedNumber = document.querySelector(`.number-of-archived-${noteType.replace(/ /g, "")}`);
    archivedNumber.innerHTML = Number(archivedNumber.innerHTML) +1;
  }

export  function deleteFromActive(noteType){
    let activeNumber = document.querySelector(`.number-of-${noteType.replace(/ /g, "")}`);
    activeNumber.innerHTML = Number(activeNumber.innerHTML) -1;
  }

export  function deleteFromArchived(noteType){
    let archivedNumber = document.querySelector(`.number-of-archived-${noteType.replace(/ /g, "")}`);
    archivedNumber.innerHTML = Number(archivedNumber.innerHTML) -1;
  }