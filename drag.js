const div1 = document.getElementById('div1');
div1.addEventListener('drop', drop);

const para = document.getElementById('drag1');

para.addEventListener('dragstart', drag);
//dragover event specifies where the dragged data can be dropped.
div1.addEventListener('dragover', allowDrop);


//drag function fire when we drag element 
function drag(ev) {
    //ev.target.id is id of element that is dragged
    ev.dataTransfer.setData("kiya", ev.target.id);
}

//this fucntion run every time that you mouse over element inside div1 elemenet
function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    //Get the dragged data with the dataTransfer.getData() method. This method will return any data that was set to the same type in the setData() method
    let data = ev.dataTransfer.getData("kiya");
    //this line drop document.getElementById(data) to ev.target
    ev.target.appendChild(document.getElementById(data));
}
/*
//moshkel koja bud?
//vaghti function e drop run mishod va jaye 2 ta element avaz mishod dg event listener barash register nashode bud
const box1 = document.getElementById('box1');
const box2 = document.getElementById('box2');
const box3 = document.getElementById('box3');
const box4 = document.getElementById('box4');

box1.addEventListener('dragstart', drag);
box2.addEventListener('dragstart', drag);
box3.addEventListener('dragstart', drag);
box4.addEventListener('dragstart', drag);

box1.addEventListener('drop', drop);
box2.addEventListener('drop', drop);
box3.addEventListener('drop', drop);
box4.addEventListener('drop', drop);


box1.addEventListener('dragover', allowDrop);
box2.addEventListener('dragover', allowDrop);
box3.addEventListener('dragover', allowDrop);
box4.addEventListener('dragover', allowDrop);



let dragindex = 0;
let dropindex = 0;
let clone = "";

function drag(e) {
    e.dataTransfer.setData("text", e.target.id);
}

function drop(e) {
    e.preventDefault();
    // console.log(e.target)
    clone = e.target.cloneNode(true);
    let data = e.dataTransfer.getData("text");
    if (clone.id !== data) {
        let nodelist = document.getElementById("parent").childNodes;
        for (let i = 0; i < nodelist.length; i++) {
            if (nodelist[i].id == data) {
                dragindex = i;
            }

        }

        document.getElementById("parent").replaceChild(document.getElementById(data), e.target);

        document.getElementById("parent").insertBefore(clone, document.getElementById("parent").childNodes[dragindex]);
    }
    const box1 = document.getElementById('box1');
    const box2 = document.getElementById('box2');
    const box3 = document.getElementById('box3');
    const box4 = document.getElementById('box4');

    box1.addEventListener('dragstart', drag);
    box2.addEventListener('dragstart', drag);
    box3.addEventListener('dragstart', drag);
    box4.addEventListener('dragstart', drag);

    box1.addEventListener('drop', drop);
    box2.addEventListener('drop', drop);
    box3.addEventListener('drop', drop);
    box4.addEventListener('drop', drop);


    box1.addEventListener('dragover', allowDrop);
    box2.addEventListener('dragover', allowDrop);
    box3.addEventListener('dragover', allowDrop);
    box4.addEventListener('dragover', allowDrop);

}

function allowDrop(e) {
    e.preventDefault();
}*/