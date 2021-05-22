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
    if(AddedInputPath.querySelector("INPUT")){
      AddedInputPath.removeChild(AddedInputPath.querySelector("INPUT"));
      AddedInputPath.removeChild(document.getElementById('enter'));
    }
    else {
      let input = document.createElement("INPUT");
      input.id="tag";
      input.setAttribute("type", "text");
      AddedInputPath.appendChild(input);

      let enterButton = document.createElement("button");
      enterButton.id="enter";
      enterButton.classList.add("btn", "btn-primary");
      enterButton.appendChild(document.createTextNode("Enter"));
      AddedInputPath.appendChild(enterButton);
    }
  }
  if(event.target.className.includes('fixTag'))
  {
    AddedInputPath = event.target.parentNode;
    filename=event.target.value;
    if(AddedInputPath.querySelector("INPUT")){
      AddedInputPath.removeChild(AddedInputPath.querySelector("INPUT"));
      AddedInputPath.removeChild(document.getElementById('enter'));
    }
    else {
      let input = document.createElement("INPUT");
      input.id="tag";
      input.setAttribute("type", "text");
      AddedInputPath.appendChild(input);

      let enterButton = document.createElement("button");
      enterButton.id="enter";
      enterButton.classList.add("btn", "btn-primary");
      enterButton.appendChild(document.createTextNode("Enter"));
      AddedInputPath.appendChild(enterButton);
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



