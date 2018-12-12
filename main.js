'use string';

function flexListPs (idFlexList) {  // конструктор для вложених списков
  this.idFlexList = idFlexList; // индификатор списка
  this.tree = document.querySelectorAll(idFlexList + ' ul')[0]; // первый елемент после ul
  this.allLi = document.querySelectorAll(idFlexList + ' li'); // все елементы списка
  this.classHideObj = 'ulHIdeFlexList'; // класс, скрить вложения
  this.classShowObj = 'ulShowFlexList'; // класс, октрыть вложения
  this.classFile = 'fileFlexList'; // класс, нет вложений
  this.classFolder = 'folderFlexList'; // класс, есть вложения
  
  const classHide = this.classHideObj;
  const classShow = this.classShowObj;

    /* добавляем классы */
  this.addClassAll = function(fileFlexList = this.classFile) {

    /* функция клика по кнопке меню */

    this.allLi.forEach(function(item){ // всем кто не имеет вложений 
      let spanEl = item.querySelector('span');
      let elementLi = item.getElementsByTagName('ul')[0];
      if (!elementLi) {
        item.setAttribute('class', fileFlexList);
      }
    }); 

    let allElementFile = document.querySelectorAll('.' + fileFlexList); // елементы без вложений
    allElementFile.forEach(function(item){ // всем кто имеет вложения

        textThisEl = item.innerText;
        /** назначить картики пунктам списка */
        if(~textThisEl.indexOf('.png') || ~textThisEl.indexOf('.jpg')) {
            item.querySelector('span').setAttribute('class', 'exImage');
        }
        else if(~textThisEl.indexOf('.txt')) {
          item.querySelector('span').setAttribute('class', 'file_txt');
        }
        else {
          item.querySelector('span').setAttribute('class', 'unknown_file');
        }

    });
    
    for(let i = 0; i < this.allLi.length; i++){ // всем кто имеет вложения
      let attrClass = this.allLi[i].getAttribute('class');
      if(!attrClass || attrClass !== this.classFile) this.allLi[i].setAttribute('class', this.classFolder)
    }

    let arrSpanUl = document.querySelectorAll(this.idFlexList + ' .' + this.classFolder + ' ul'); // выбрать папки
    arrSpanUl.forEach(function(item){ // скрить содержимое папок
      item.setAttribute('class', classHide)
    });

  }
  
  /* функция клика по элементу клика */

  this.tree.onclick = function(event) {
    let target = event.target;
    if (target.tagName != 'SPAN') {
      
      clickButMenu(target);
      return; // клик был не на заголовке
    }
  
    let li = target.parentNode; // получить родительский LI
  
    // получить UL с потомками -- это первый UL внутри LI
    let childrenContainer = li.getElementsByTagName('ul')[0];
  
    if (!childrenContainer) return; // потомков нет -- ничего не надо делать
    else {
      let test = childrenContainer.getAttribute('class');
      if(test === null || test === classHide) {
        childrenContainer.setAttribute('class', 'classShow');
      }
      else {
        childrenContainer.setAttribute('class', classHide);
      }
  
    }
  
  }

}

let flexList1 = new flexListPs("#flexList");
flexList1.addClassAll();







