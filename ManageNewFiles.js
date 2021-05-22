var filename;
let AddedInputPath;
document.querySelector('body').addEventListener('click', event => {
  if(event.target.id==='getTagInfo')
  {
    event.preventDefault();
    console.log("getTagInfo");
    window.electron.showTagInfo();
  }
  if(event.target.className.includes('inputTag'))
  {
    AddedInputPath = event.target.parentNode;
    filename=event.target.value;
    if(AddedInputPath.querySelector("div")){
      AddedInputPath.removeChild(AddedInputPath.querySelector("div"));
    }
    else {
      let box = document.createElement("div");
      box.classList.add("d-flex");
      
      let input = document.createElement("INPUT");
      input.id="tag";
      input.setAttribute("type", "text");
      
      let enterButton = document.createElement("button");
      enterButton.id="enter";
      enterButton.classList.add("btn", "btn-primary");
      enterButton.appendChild(document.createTextNode("Enter"));

      box.appendChild(input);
      box.appendChild(enterButton);

      AddedInputPath.appendChild(box);      
    }
  }
  if(event.target.className.includes('fixTag'))
  {
    AddedInputPath = event.target.parentNode;
    filename=event.target.value;
    if(AddedInputPath.querySelector("div")){
      AddedInputPath.removeChild(AddedInputPath.querySelector("div"));
    }
    else {
      let box = document.createElement("div");
      box.classList.add("d-flex");

      let input = document.createElement("INPUT");
      input.id="tag";
      input.setAttribute("type", "text");

      let enterButton = document.createElement("button");
      enterButton.id="enter";
      enterButton.classList.add("btn", "btn-primary");
      enterButton.appendChild(document.createTextNode("Enter"));

      box.appendChild(input);
      box.appendChild(enterButton);

      AddedInputPath.appendChild(box);
    }
  }
  if(event.target.className.includes('deleteTag'))
  {
    filename=event.target.value;
    window.electron.deleteTag(filename);
    window.electron.showTagInfo();
  }
  if(event.target.id==='enter')
  {
    var tag=document.getElementById('tag').value;
    window.electron.inputTag(filename,tag);
    window.electron.showTagInfo();
  }
  
}); 

window.electron.showTagInfo();



