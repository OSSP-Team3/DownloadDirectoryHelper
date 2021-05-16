// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge} = require('electron')
const testFolder = `C:\\Users\\shbin\\Downloads`;

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
      console.log("Load Files List");
      fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
          var tag = document.createElement("li");
          tag.appendChild(document.createTextNode(file));
          document.getElementById("downloadFiles").appendChild(tag);
        });
      });
    },
    showDownloadDates : () => {
      console.log("Show Download Dates");
      fs.readdir(testFolder, (err, files) => {
        files.forEach((file) => {
          fs.stat(testFolder, (err, stat) => {
            var name = file.toString();
            var date = stat.atime.toString();
            var data = "Name: "+name+", Date: "+date;
            var tag = document.createElement("li");
            tag.appendChild(document.createTextNode(data));
            document.getElementById("downloadDates").appendChild(tag);
          }); 
        });
      });
    },
    showFileFormats : () => {
      console.log("Show File Formats");
      fs.readdir(testFolder, (err, files) => {
        files.forEach((file) => {
          var name = file.toString();
          var format = name.split('.');
          var data = "Name: "+name+", Format: "+format[format.length-1];
          var tag = document.createElement("li");
          tag.appendChild(document.createTextNode(data));
          document.getElementById("fileFormats").appendChild(tag);
        });
      });
    }
  }
)