var arr = [];
var addInput = document.getElementById("new-todo");
var list = document.getElementById("todoList");
if(localStorage.getItem("item")){
  arr = JSON.parse(localStorage.getItem("item"));
  addToDOm();
}

function addToLocal(){
  let obj = {};
  obj.name = addInput.value;
  obj.status = "pending";
  arr.push(obj);
  localStorage.setItem("item", JSON.stringify(arr));
  addToDOm();
}

function addToDOm(){
  list.innerHTML = "";
  arr.forEach(function(item, index){
    list.innerHTML += `
    <div id = "listContainer">
        <p id = "para${index}" class="para">${item.name}</p>
        <input id = "checkbox" type = "checkbox" onclick = "updateStatus(${index})"/>
        <button id ="edit" onclick = "editItem(${index})">Edit</button>
        <button id = "delItem" onclick = "delList(${index})">${"&cross;"}</button>      
    </div
    `;
  })
}

addInput.addEventListener("keydown",function(event){
  if(event.key == "Enter"){
    addToLocal();
    addInput.value = "";
  }
})

function delList(index){
  arr.splice(index, 1);
  addToDOm();
  localStorage.setItem("item", JSON.stringify(arr));
}

function updateStatus(index){
  if(arr[index].status == "pending"){
  arr[index].status = "complete";
  document.getElementById(`para${index}`).style.textDecoration = "line-through";
  }
  else{
    arr[index].status = "pending";
    document.getElementById(`para${index}`).style.textDecoration = "none";
  }
  localStorage.setItem("item", JSON.stringify(arr));
}

function editItem(index){
  let newInput = document.getElementById(`para${index}`);
  newInput.innerHTML = `
  <input id = "input${index}" type = "text" />
  `
  let inputEdit = document.getElementById(`input${index}`);
  inputEdit.addEventListener("keydown",function(event){
  if(event.key == "Enter"){
    arr[index].name = event.target.value;
    addToDOm()
    localStorage.setItem("item", JSON.stringify(arr));
   }
  })

}