// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

document.getElementById('getFilelist').addEventListener('click', (evt)=> {
    evt.preventDefault();
    console.log("abcd");
    window.electron.showDownloadFiles();
    // fs.readdir(testFolder, (err, files) => {
    //     console.log("asdf");
    //     files.forEach(file => {
    //         var tag = document.createElement("p").appendChild(document.createTextNode(file));
    //         document.getElementById("downloadFiles").appendChild(tag);
    //     });
    // });
  });