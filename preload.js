// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge} = require('electron')
const testFolder = `C:\\Users\\82104\\Downloads`;
const fs = require('fs');
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
  }
})

contextBridge.exposeInMainWorld(
  'electron',
  {
    showDownloadFiles : () => {
      console.log("asdf");
      fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
          var tag = document.createElement("li");
          tag.appendChild(document.createTextNode(file));
          document.getElementById("downloadFiles").appendChild(tag);
        });
      });
    }
  }
)