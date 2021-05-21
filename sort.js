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