const taskInformation = document.querySelector('#event')
const taskList = document.querySelector('#tasks-included');
const buttonAdd = document.querySelector('#add');

function liCreation() {
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
}

buttonAdd.addEventListener('click', liCreation);
taskInformation.addEventListener('keyup', (type) => {
  const pressKey = type.which || type.keyCode;
  if (pressKey === 13) {
    liCreation();
  } 
});

function btnExcludeAll() {
  const eraseAll = document.querySelectorAll('.li-options');
  for (let erase of eraseAll) {
    if (confirm('Tem certeza de que deseja excluir TODAS as atividades?')) {
    erase.remove();
    }
  } 
}

document.querySelector('#exclude-all').addEventListener('click', btnExcludeAll);

function lineThrough() {
  const inputsChecked = document.querySelectorAll('.input-information');
  console.log(inputsChecked);
  for (let chekedBox of inputsChecked) {
    const nextElement = chekedBox.nextElementSibling;
    if (!chekedBox.checked) {
      nextElement.classList.remove('selected');
    } else {
      nextElement.classList.add('selected');
    }
  }
}
taskList.addEventListener('click', lineThrough);

function btnExcludeSelected() {
  const eraseOnlySelected = document.querySelectorAll('.selected');
  for (let erase of eraseOnlySelected) {
    if (confirm('Tem certeza de que deseja excluir TODAS as atividades SELECIONADAS?')) {
      const nextParent = erase.parentNode;
      const theLastParent = nextParent.parentNode
      theLastParent.remove();
    }
  } 
}

document.querySelector('#exclude-all-selected').addEventListener('click', btnExcludeSelected)
