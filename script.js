//Trying to be more organized in the code bringing in the beggining some const that will be used throughout the code. 
const taskInformation = document.querySelector('#event')
const taskList = document.querySelector('#tasks-included');
const buttonAdd = document.querySelector('#add');

function archiveSet() {
  const taskListChildren = document.querySelectorAll('.li-div-information');
  const allTasks = [];

  for (let tasks of taskListChildren) {
    let completeInformation = {};
    completeInformation.text = tasks.querySelector('span').innerHTML;
    completeInformation.checkBox = tasks.querySelector('input').checked;
    allTasks.push(completeInformation);
  }
  localStorage.setItem('allList', JSON.stringify(allTasks));
}
  
  //creation of the li structure, using div to better aply the flexbox model and styles. Also, used the opportunity in the same function to creat and event listener for a exclude button of the line.
  
  function liCreation() {
    if (taskInformation.value === '') {
      return alert('Atividade não descrita. Favor verificar.');
    }

    const liConstitution = document.createElement('li');
    liConstitution.classList = 'li-options';
    taskList.appendChild(liConstitution);
    
    const divCreation = document.createElement('div');
    divCreation.classList = 'li-div-information';
    liConstitution.appendChild(divCreation);
    
    const inputCreation = document.createElement('input'); 
    inputCreation.type = 'checkbox';
    inputCreation.classList = 'input-information';
    divCreation.appendChild(inputCreation);
    
    const spanCreation = document.createElement('span');
    spanCreation.classList = 'li-span';
    spanCreation.innerHTML = taskInformation.value;
    taskInformation.value = '';
    divCreation.appendChild(spanCreation);
    
    const divCreationSecond = document.createElement('div');
    divCreationSecond.classList = 'li-div-button';
    liConstitution.appendChild(divCreationSecond);
    
    
    const buttonExclude = document.createElement('button');
    buttonExclude.innerHTML = 'X';
    buttonExclude.classList = 'exclude-button';
    buttonExclude.addEventListener('click', function(e) {
      if(confirm('Tem certeza que deseja excluir a atividade selecionada?'))
      liConstitution.remove();
    })
    divCreationSecond.appendChild(buttonExclude);

    archiveSet()
  }
  
  // Now I created two events listeners, one for click and another one for the keyboard. I was tired doing the test and clicking. It was easier with the keyboard.
  
  buttonAdd.addEventListener('click', liCreation);
  
  taskInformation.addEventListener('keyup', (type) => {
    const pressKey = type.which || type.keyCode;
    if (pressKey === 13) {
      liCreation();
    } 
  });
  
  //Created another button to exclude everything at once.
  function btnExcludeAll() {
    const eraseAll = document.querySelectorAll('.li-options');
    for (let erase of eraseAll) {
      if (confirm('Tem certeza de que deseja excluir TODAS as atividades?')) {
        erase.remove();
      }
    } 
    archiveSet();
  }
  
  document.querySelector('#exclude-all').addEventListener('click', btnExcludeAll);
  
  //Here is the line through on the checked button. Really good code, I think.
  function lineThrough() {
    const inputsChecked = document.querySelectorAll('.input-information');
    for (let chekedBox of inputsChecked) {
      const nextElement = chekedBox.nextElementSibling;
      if (!chekedBox.checked) {
        nextElement.classList.remove('selected');
      } else {
        nextElement.classList.add('selected');
      }
    }
  }
  // Here anothe event listener for the ckeckedbox.
  taskList.addEventListener('click', lineThrough);
  
  //In the end i thought that it was interesting to add some other options of excluding.
  function btnExcludeSelected() {
    const eraseOnlySelected = document.querySelectorAll('.selected');
    for (let erase of eraseOnlySelected) {
      if (confirm('Tem certeza de que deseja excluir TODAS as atividades SELECIONADAS?')) {
        const nextParent = erase.parentNode;
        const theLastParent = nextParent.parentNode
        theLastParent.remove();
      }
    }
    archiveSet();
  }
  document.querySelector('#exclude-all-selected').addEventListener('click', btnExcludeSelected)
  
  //Now the worst part, not to archive the information, but to use json. I had to analyse some codes to achive a conclusion.
  
  document.querySelector('#save').addEventListener('click', archiveSet);
  
  function load() {
    const retrieveList = JSON.parse(localStorage.getItem("allList"));

    for (const item of retrieveList){
      
          const liConstitution = document.createElement('li');
          liConstitution.classList = 'li-options';
          taskList.appendChild(liConstitution);
          
          const divCreation = document.createElement('div');
          divCreation.classList = 'li-div-information';
          liConstitution.appendChild(divCreation);
          
          const inputCreation = document.createElement('input'); 
          inputCreation.type = 'checkbox';
          inputCreation.checked = item.checkBox;
          inputCreation.classList = 'input-information';
          divCreation.appendChild(inputCreation);
          
          const spanCreation = document.createElement('span');
          spanCreation.classList = 'li-span';
          spanCreation.innerHTML = item.text;
          divCreation.appendChild(spanCreation);

          if (inputCreation.checked) {
            inputCreation.nextElementSibling.classList.add('selected');
          }
          
          const divCreationSecond = document.createElement('div');
          divCreationSecond.classList = 'li-div-button';
          liConstitution.appendChild(divCreationSecond);
          
          
          const buttonExclude = document.createElement('button');
          buttonExclude.innerHTML = 'X';
          buttonExclude.classList = 'exclude-button';
          buttonExclude.addEventListener('click', function(e) {
            if(confirm('Tem certeza que deseja excluir a atividade selecionada?'))
            liConstitution.remove();
          })
          divCreationSecond.appendChild(buttonExclude);
    }
  }
  load();