let inp = document.getElementById('tdl');
window.addEventListener('load', () => inp.focus());

const time = document.getElementById('time');
const date = new Date();
const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();

let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

//getDay() retrun number of week
let dayOfWeek = days[date.getDay()];

time.innerHTML = `${day}/${month}/${year} ${dayOfWeek}`;

const section = document.getElementById('show');

const addBtn = document.getElementById('Add');
addBtn.addEventListener('click', add);

//for make empty object in first load in local storage
if (localStorage.getItem('tdl') === null) {
    let workObject = {};
    let indextdl = 0;
    localStorage.setItem('tdl', JSON.stringify(workObject))
    localStorage.setItem('indextdl', indextdl);
}

function add() {
    if (inp.value === '') {
        alert('First Enter a work!');
        inp.focus();
    }
    else {
        //add work in differenet key and value in local storage as a object
        indextdl = localStorage.getItem('indextdl')
        workObject = JSON.parse(localStorage.getItem('tdl'));

        workObject[`${indextdl}a`] = inp.value;

        const divElement = document.createElement('div');
        divElement.style.fontFamily = "'Roboto Mono', monospace";
        //add id to new element
        divElement.setAttribute('id', `${indextdl++}a`);

        //update value of indextdl :
        localStorage.setItem('indextdl', indextdl);
        //set value of work for localstorage
        localStorage.setItem('tdl', JSON.stringify(workObject));

        divElement.innerHTML = `<input type="checkbox">${inp.value}<button class="delete">delete</button><button class="edit">edit</button>`
        section.appendChild(divElement);

        inp.value = '';

        divElement.querySelector('input').addEventListener('change', completed);
        divElement.querySelector('.delete').addEventListener('click', trash);
        divElement.querySelector('.edit').addEventListener('click', editText);
    }
}

function completed(event) {
    let divElement = event.target.parentNode;

    if (localStorage.getItem('comtdl') === null) {
        let workObject2 = {};
        localStorage.setItem('comtdl', JSON.stringify(workObject2))
    }
    //add an item to comtdl localstorge
    let comIndexTdl = String(divElement.id);
    let workObject2 = JSON.parse(localStorage.getItem('comtdl'));

    //add compeleted item value to comtdl in locastroge 
    workObject2[comIndexTdl] = divElement.firstElementChild.nextSibling.nodeValue;

    //set id to new element 
    divElement.setAttribute('id', comIndexTdl);

    localStorage.setItem('comtdl', JSON.stringify(workObject2));

    //delete item from tdl local storage from its id :
    const workObject = JSON.parse(localStorage.getItem('tdl'));
    delete workObject[comIndexTdl];
    localStorage.setItem('tdl', JSON.stringify(workObject));

    divElement.remove();

    divElement.setAttribute("class", "overline");
    //set compeleted item in compteletd box in html page
    const complete = document.getElementById('completed');
    complete.appendChild(divElement);

    //for return after click on inpute check box
    divElement.firstElementChild.addEventListener('change', returns);
}

//make a new div element and add to tdl local storage and remove from completed list and comtdl local storge :
function returns(event) {
    let idItem = String(event.target.parentNode.id);
    let workObject = JSON.parse(localStorage.getItem('tdl'));

    workObject[idItem] = event.target.parentNode.firstElementChild.nextSibling.nodeValue;
    localStorage.setItem('tdl', JSON.stringify(workObject));

    const divElement = document.createElement('div');
    divElement.style.fontFamily = "'Roboto Mono', monospace";
    divElement.setAttribute('id', idItem);

    divElement.innerHTML = `<input type="checkbox">${event.target.nextSibling.nodeValue}<button class="delete">delete</button><button class="edit">edit</button>`;
    section.appendChild(divElement);

    //delete item from comtdl local storge
    const workObject2 = JSON.parse(localStorage.getItem('comtdl'));
    delete workObject2[idItem];
    localStorage.setItem('comtdl', JSON.stringify(workObject2));
    //remove elemetn from compeleted list :
    let element = event.target.parentNode;
    element.remove();

    divElement.querySelector('input').addEventListener('change', completed);
    divElement.querySelector('.delete').addEventListener('click', trash);
    divElement.querySelector('.edit').addEventListener('click', editText);
}

function trash(event) {
    let conf = confirm('You want delete this item?');
    if (conf) {
        //delete an item from local storage from its id :
        const id = event.target.parentNode.id;
        const workObject = JSON.parse(localStorage.getItem('tdl'));
        const workObject2 = JSON.parse(localStorage.getItem('comtdl'));

        //check that remove item from tdl or comtdl localstorage :
        let flag = false;
        for (let index in workObject) {
            if (id === index) {
                flag = true;
            }
        }
        if (flag) {
            delete workObject[id];
            localStorage.setItem('tdl', JSON.stringify(workObject));
        }
        else {
            delete workObject2[id];
            localStorage.setItem('comtdl', JSON.stringify(workObject2));
        }

        //delete an item from html page
        let element = event.target.parentNode;
        element.remove();
    }
}

function editText(event) {
    const editBtn = document.getElementById('Edit');

    //for hide edit button in edit mode
    const editButton = event.target.parentNode.lastElementChild;
    editButton.classList.add("display");

    //replace Edit instead of Add 
    addBtn.setAttribute('class', 'display');
    editBtn.removeAttribute('class', 'display');

    //show text in input text box:
    inp.value = event.target.parentNode.firstElementChild.nextSibling.nodeValue;
    inp.focus();

    editBtn.addEventListener('click', () => {
        event.target.parentNode.firstElementChild.nextSibling.nodeValue = inp.value;
        //update edited item in local storge with last id 
        const id = event.target.parentNode.id;
        const workObject = JSON.parse(localStorage.getItem('tdl'));
        const workObject2 = JSON.parse(localStorage.getItem('comtdl'));

        //check that edit item from tdl or comtdl localstorage :
        let flag = false;
        for (let index in workObject) {
            if (id === index) {
                flag = true;
            }
        }
        if (flag) {
            workObject[id] = inp.value;
            localStorage.setItem('tdl', JSON.stringify(workObject));
        }
        else {
            workObject2[id] = inp.value;
            localStorage.setItem('comtdl', JSON.stringify(workObject2));
        }

        editBtn.setAttribute('class', 'display');
        addBtn.removeAttribute('class', 'display');
        inp.value = '';
        editButton.classList.remove("display");

    }, { once: true });
}
//make works of to do list from local storage after reload
const works = JSON.parse(localStorage.getItem('tdl'));

for (let work in works)
    afterReload(works[work], work);

function afterReload(work, index) {
    const divElement = document.createElement('div');
    divElement.style.fontFamily = "'Roboto Mono', monospace";
    //add id to div element from local stroge
    divElement.setAttribute('id', index);

    divElement.innerHTML = `<input type="checkbox">${work}<button class="delete">delete</button><button class="edit">edit</button>`
    section.appendChild(divElement);

    inp.value = '';

    divElement.querySelector('input').addEventListener('change', completed);
    divElement.querySelector('.delete').addEventListener('click', trash);
    divElement.querySelector('.edit').addEventListener('click', editText);
}

//make works of compteletd to do list from comtdl local storage after reload :
const comworks = JSON.parse(localStorage.getItem('comtdl'));

for (let work2 in comworks)
    afterReloadcom(comworks[work2], work2);

function afterReloadcom(work, index) {
    const divElement = document.createElement('div');

    divElement.style.fontFamily = "'Roboto Mono', monospace";
    divElement.setAttribute("class", "overline");
    divElement.setAttribute('id', index);
    divElement.setAttribute("class", "overline");

    divElement.innerHTML = `<input type="checkbox">${work}<button class="delete">delete</button><button class="edit">edit</button>`

    //set div element on the page :
    document.getElementById('completed').appendChild(divElement);

    divElement.querySelector('input').addEventListener('change', returns);
    divElement.querySelector('.delete').addEventListener('click', trash);
    divElement.querySelector('.edit').addEventListener('click', editText);

    divElement.querySelector('input').checked = true;
}

//add a dark mode to website get help from https://www.youtube.com/watch?v=lJmw3zoEt3g
const options = {
    bottom: '550px', // default: '32px'
    right: '32px', // default: '32px'
    // left: 'unset', // default: 'unset'
    time: '0.5s', // default: '0.3s'
    mixColor: '#fff', // default: '#fff'
    backgroundColor: '#fff',  // default: '#fff'
    buttonColorDark: '#100f2c',  // default: '#100f2c'
    buttonColorLight: '#fff', // default: '#fff'
    saveInCookies: true, // default: true,
    label: '🌓', // default: ''
    autoMatchOsTheme: true, // default: true,
    width: '4rem',
    height: '4rem'
}
const darkmode = new Darkmode(options);
darkmode.showWidget();