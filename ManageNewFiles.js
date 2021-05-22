document.getElementById('getTagInfo').addEventListener('click', (evt)=> {
  evt.preventDefault();
  console.log("getTagInfo");
  window.electron.showTagInfo();
});