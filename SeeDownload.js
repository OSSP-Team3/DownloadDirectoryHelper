document.getElementById('getFilelist').addEventListener('click', (evt)=> {
    evt.preventDefault();
    console.log("Load Files List");
    window.electron.showDownloadFilesInfo();
    // fs.readdir(testFolder, (err, files) => {
    //     console.log("asdf");
    //     files.forEach(file => {
    //         var tag = document.createElement("p").appendChild(document.createTextNode(file));
    //         document.getElementById("downloadFiles").appendChild(tag);
    //     });
    // });
  });

  document.getElementById('myInput').addEventListener('keyup', (evt)=> {
    evt.preventDefault();
    window.electron.searchFiles();
  });