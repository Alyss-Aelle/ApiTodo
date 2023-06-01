//on peut definir une variable par une const qui n'est pas mutable
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function AddTask() {
    if(inputBox.value === '') {
        alert("You must write something");
        console.log('aucune donnée entré');
    }
    else{
        console.log('ajout tache');
        addItemToLi(inputBox.value);
        addToAPI(inputBox.value);
    }
    inputBox.value = "";
    saveData();
    
}


listContainer.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        console.log('tache effectué')
    }
    

    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        console.log('suppression donnée');
     }
     
     saveData();
}, false);

function saveData() {
    localStorage.setItem("data",listContainer.innerHTML)
    
}
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
//showTask();
readAllElements();

//  fonction ajout d'élément a la liste
function addItemToLi(item,id = 0) {
        let li = document.createElement("li");
        li.setAttribute("ref",id);
        li.innerHTML = item;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        
}

// lire/lister les elements de l'API
    /*function readAllElements() {
    console.log('interrogation API');
    fetch("http://127.0.0.1:8000/api/todos").then(response =>{
        console.log(response.json());
        return response;
    });
}
*/
//ASYNC = fonction asynchro
async function readAllElements() {
    console.log('interrogation API');
    //await = mot clé attendre execution du code
    //interrogation API
    //fetch envoie donnée ou lie des données a partir d'une url
    const response = await fetch("http://127.0.0.1:8000/api/todos");
    console.log(response);

    //conversion reponse en tableau
    const tasks = await response.json();
    console.log(tasks);
    tasks.forEach(item => {
        //console.log(item.tache);
        
        //injecte les informations a partir de l'API dans la DOM
        addItemToLi(item.tache,item.id);
    });
}

async function addToAPI(task) {
    console.log('envoie donnée API');
    let myForm = new FormData();
    myForm.append("tache",task);
    console.log(myForm);
    //envoie des données a l'API
    const response = await fetch("http://127.0.0.1:8000/api/todos",{method:"POST",body:myForm}) ;
    console.log(response);

    //declancher l'evenement
    //formater donnée a envoyer en post

}
addToAPI();