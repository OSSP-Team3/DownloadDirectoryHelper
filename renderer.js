// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

document.getElementById('getFilelist').addEventListener('click', (evt)=> {
  evt.preventDefault();
  console.log("Load Files List");
  window.electron.showDownloadFiles();
});

document.getElementById('sortByDate').addEventListener('click', (evt)=> {
  evt.preventDefault();
  console.log("sortByDate");
  window.electron.showDownloadDates();
});
  
document.getElementById('sortByFormat').addEventListener('click', (evt)=> {
  evt.preventDefault();
  console.log("sortByForm");
  window.electron.showFileFormats();
});

document.getElementById('recommend').addEventListener('click', (evt)=> {
  evt.preventDefault();
  console.log("sortByForm");
  window.electron.showInstallerFiles();
});





