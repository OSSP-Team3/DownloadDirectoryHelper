const { contextBridge} = require('electron')
const testFolder = `C:\\Users\\shbin\\Downloads`;
var nlist = [];
var dlist = [];
var flist = [];

const fs = require('fs');
const filesize = require('filesize');
const path = require('path');

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
      while(document.getElementById("downloadDates").hasChildNodes())
        document.getElementById("downloadDates").removeChild(document.getElementById("downloadDates").firstChild);
      while(document.getElementById("fileFormats").hasChildNodes())
        document.getElementById("fileFormats").removeChild(document.getElementById("fileFormats").firstChild);
      fs.readdir(testFolder, (err, files) => {
        nlist = [];
        dlist = [];
        files.forEach((file) => {
          fs.stat(testFolder, (err, stat) => {
            var name = file.toString();
            var date = stat.atime.getFullYear().toString()+"."+(stat.atime.getMonth()+1).toString()+"."+stat.atime.getDate().toString();
            nlist.push(name);
            dlist.push(date);
          }); 
        });
      });
      var list = [];
        list = dlist.filter((element, index) => {
          return dlist.indexOf(element)===index;
        });
        for(var i=0; i<list.length; i++)
        {
          let datas = [];
          for(var j=0; j<dlist.length; j++)
          {
            if(list[i]===dlist[j])
            {
              datas.push(nlist[j]);
            }
          }
          let tag = document.createElement("ui");
          tag.classList.add("list-group", "my-2", "mx-3");

          let item =document.createElement("li");
          item.appendChild(document.createTextNode(list[i]));
          item.classList.add("list-group-item", "fs-5", "bg-info");
          tag.appendChild(item);

          datas.forEach(data => {
            let item = document.createElement("li");
            item.classList.add("list-group-item", "fs-5");
            item.appendChild(document.createTextNode(data))
            tag.appendChild(item);

            let deleteButton = document.createElement("button");
            deleteButton.classList.add("btn", "btn-danger", "deleteButton", "mx-1");
            deleteButton.style.float = "right";
            deleteButton.value = data;
            deleteButton.appendChild(document.createTextNode("Delete"));

            let seeStatsButton = document.createElement("button");
            seeStatsButton.classList.add("btn", "btn-success", "seeStatsButton");
            seeStatsButton.style.float = "right";
            seeStatsButton.value = data;
            seeStatsButton.appendChild(document.createTextNode("See Stats"));

            item.appendChild(deleteButton);
            item.appendChild(seeStatsButton);
          })
          
          document.getElementById("fileFormats").appendChild(tag);
        }
    },
    showFileFormats : () => {
      console.log("Show File Formats");
      while(document.getElementById("downloadDates").hasChildNodes())
        document.getElementById("downloadDates").removeChild(document.getElementById("downloadDates").firstChild);
      while(document.getElementById("fileFormats").hasChildNodes())
        document.getElementById("fileFormats").removeChild(document.getElementById("fileFormats").firstChild);
      fs.readdir(testFolder, (err, files) => {
        nlist = [];
        flist = [];
        files.forEach((file) => {
          var name = file.toString();
          var f = name.split('.');
          var format = f[f.length-1];
          nlist.push(name);
          flist.push(format);
        });
      });
      var list = [];
      list = flist.filter((element, index) => {
        return flist.indexOf(element)===index;
      });
      for(var i=0;i<list.length;i++)
      {
        let datas = [];
        for(var j=0; j<dlist.length; j++)
        {
          if(list[i]===flist[j])
          {
            datas.push(nlist[j]);
          }
        }
        let tag = document.createElement("ui");
        tag.classList.add("list-group", "my-2", "mx-3");

        let item =document.createElement("li");
        item.appendChild(document.createTextNode("." + list[i]));
        item.classList.add("list-group-item", "fs-5", "bg-info");
        tag.appendChild(item);

        datas.forEach(data => {
          let item = document.createElement("li");
          item.classList.add("list-group-item", "fs-5");
          item.appendChild(document.createTextNode(data))
          tag.appendChild(item);

          let deleteButton = document.createElement("button");
          deleteButton.classList.add("btn", "btn-danger", "deleteButton", "mx-1");
          deleteButton.style.float = "right";
          deleteButton.value = data;
          deleteButton.appendChild(document.createTextNode("Delete"));

          let seeStatsButton = document.createElement("button");
          seeStatsButton.classList.add("btn", "btn-success", "seeStatsButton");
          seeStatsButton.style.float = "right";
          seeStatsButton.value = data;
          seeStatsButton.appendChild(document.createTextNode("See Stats"));

          item.appendChild(deleteButton);
          item.appendChild(seeStatsButton);
        })
        
        document.getElementById("fileFormats").appendChild(tag);
      }
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
    },
    showDownloadFilesInfo : () => {
      console.log("Load Files List");
      let DownloadFilesNode = document.getElementById("downloadFiles");
      while(DownloadFilesNode.hasChildNodes())
        DownloadFilesNode.removeChild(DownloadFilesNode.firstChild);
      fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
          var tag = document.createElement("li");
          tag.classList.add("list-group-item", "fs-5");
          tag.appendChild(document.createTextNode(file));
          DownloadFilesNode.appendChild(tag);

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
        })
        files.sort();
        for(var i=0;i<files.length;i++)
        {
          localStorage.setItem(files[i].toString(), JSON.stringify(files[i]));
          console.log(localStorage.getItem(files[i]));
        }
      })
    },
    searchFiles : () => {
      var input, filter, ul, li, a, i, txtValue;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      ul = document.getElementById("downloadFiles");
      li = ul.getElementsByTagName("li");
      for (i = 0; i < li.length; i++) {
        a = li[i];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
        }
        else {
          li[i].style.display = "none";
        }
      }
    }
  }
)