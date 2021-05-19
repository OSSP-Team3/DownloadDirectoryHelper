const { contextBridge} = require('electron')
const testFolder = `C:\\Users\\82104\\Downloads`;

const fs = require('fs');
const filesize = require('filesize');

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
    },
    showInstallerFiles : () => {
      console.log("Show Setup/Installer Files");
      let InstallerFilesNode = document.getElementById("InstallerFiles");
      while(InstallerFilesNode.hasChildNodes())
        InstallerFilesNode.removeChild(InstallerFilesNode.firstChild);
      fs.readdir(testFolder, (err, files) => {
        files.forEach((file) => {
          var name = file.split('.');
          if(name.length == 1)
            return;
          var format = name[name.length - 1];
          if(["exe", "msi", "pkg", "msm"].includes(format)) {
            let tag = document.createElement("li");
            tag.classList.add("list-group-item", "fs-4");
            tag.appendChild(document.createTextNode(file));

            let deleteButton = document.createElement("button");
            deleteButton.classList.add("btn", "btn-danger", "deleteButton", "mx-1");
            deleteButton.style.float = "right";
            deleteButton.value = file;
            deleteButton.appendChild(document.createTextNode("Delete"));
            
            let seeStatsButton = document.createElement("button");
            seeStatsButton.classList.add("btn", "btn-success", "seeStatsButton");
            seeStatsButton.style.float = "right";
            seeStatsButton.value = file;
            seeStatsButton.appendChild(document.createTextNode("See Stats"));

            tag.appendChild(deleteButton);
            tag.appendChild(seeStatsButton);
            InstallerFilesNode.appendChild(tag);
            
          }
        });
      });
    },
    removeFileByFileName : (FileName) => {
      console.log("Remove "+ testFolder + "\\" + FileName);
      fs.unlink(testFolder + "\\" + FileName, (err) => {
        if(err){
          // File deletion failed
          console.error(err.message);
          return;
        }
        console.log("File deleted Successfully");
      });
    },
    seeStatsByFileName : (FileName) => {
      console.log("See stats of "+ testFolder + "\\" + FileName);
      statsObj = fs.statSync(testFolder + "\\" + FileName);
      
      console.log(statsObj);
      return statsObj;
    },
    getReadableFileSize: (size) => {
      return filesize(size);
    }
  }
)