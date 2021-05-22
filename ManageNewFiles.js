var filename;
document.querySelector('body').addEventListener('click', event => {
  if(event.target.id==='getTagInfo')
  {
    event.preventDefault();
    console.log("getTagInfo");
    window.electron.showTagInfo();
  }
  if(event.target.className.includes('inputTag'))
  {
    window.open("Input.html","Input the Tag", "width=200, height=200, left=200, top=200");
    filename = event.target.value;
  }
  if(event.target.id==='enter')
  {
    var input = document.getElementById('tag');
    console.log(input);
    if(input) window.close();
    window.electron.inputTag(filename,input);
  }
}); 



