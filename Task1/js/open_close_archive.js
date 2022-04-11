export let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export function hideArchive(){
  let list = document.querySelectorAll('.active-Task, .archived-Task, .active-Idea, .archived-Idea, .active-Quote, .archived-Quote, .active-RandomThought, .archived-RandomThought');
  hideDisplayFun(list);
}

function showOrHideArchive(classes){
  let list = document.querySelectorAll(classes);
  displayFun(list);
}

function displayFun(list){
  for (let i = 0; i < list.length; ++i) {
    if(list[i].style.display == 'none'){
      list[i].style.display = '';
    }else{
      list[i].style.display = 'none';
    }
  }
}

function hideDisplayFun(list){
  for (let i = 0; i < list.length; ++i) {
    list[i].style.display = 'none';
 }
}

const tasksTable = document.querySelector('.tasks'),
  ideasTable = document.querySelector('.ideas'),
  quotesTable = document.querySelector('.quotes'),
  thoughtsTable = document.querySelector('.thoughts');

tasksTable.addEventListener('click',function(){ showOrHideArchive('.active-Task, .archived-Task'); });
ideasTable.addEventListener('click',function(){ showOrHideArchive('.active-Idea, .archived-Idea'); });
quotesTable.addEventListener('click',function(){ showOrHideArchive('.active-Quote, .archived-Quote'); });
thoughtsTable.addEventListener('click',function(){ showOrHideArchive('.active-RandomThought, .archived-RandomThought'); });



