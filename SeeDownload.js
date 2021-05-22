document.getElementById('getFilelist').addEventListener('click', (evt)=> {
  evt.preventDefault();
  console.log("Load Files List");
  window.electron.showDownloadFilesInfo();
});

document.getElementById('myInput').addEventListener('keyup', (evt)=> {
  evt.preventDefault();
  window.electron.searchFiles();
});

document.querySelector('body').addEventListener('click', event => {
  if (event.target.className.includes('deleteButton')) {
    console.log(event.target.value);
    window.electron.removeFileByFileName(event.target.value);
    
    let deleted = document.createElement("span");
    deleted.style="float:right; padding-right:50px";
    deleted.appendChild(document.createTextNode("Deleted"));
    event.target.parentNode.appendChild(deleted);
    event.target.parentNode.querySelector('.seeStatsButton').remove();
    if(event.target.className.includes('seeStatsButton'))  event.target.parentNode.querySelector('table').remove();
    event.target.remove();
  }
  if(event.target.className.includes('seeStatsButton')) {
    console.log(event.target.value);
    let stats = window.electron.seeStatsByFileName(event.target.value);
    let AddedTablePath = event.target.parentNode;
    if(AddedTablePath.querySelector('table')){
        AddedTablePath.removeChild(AddedTablePath.querySelector('table'));
    }
    else {
    let table = document.createElement("table");
    table.classList.add("table","my-4", "fs-6");
    table.style.width="45%";
    table.style.marginLeft = "8%";
    let tr1 = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    td1.appendChild(document.createTextNode("Added Date: " ));
    td2.appendChild(document.createTextNode(stats.atime.toString().split("GMT")[0]));
    tr1.appendChild(td1);
    tr1.appendChild(td2);
    table.appendChild(tr1);

    let tr2 = document.createElement("tr");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    td3.appendChild(document.createTextNode("File Size: " ));
    td4.appendChild(document.createTextNode(window.electron.getReadableFileSize(stats.size)));
    tr2.appendChild(td3);
    tr2.appendChild(td4);
    table.appendChild(tr2);

    let tr3 = document.createElement("tr");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    td5.appendChild(document.createTextNode("Modified Date: " ));
    td6.appendChild(document.createTextNode(stats.mtime.toString().split("GMT")[0]));
    tr3.appendChild(td5);
    tr3.appendChild(td6);
    table.appendChild(tr3);

    AddedTablePath.appendChild(table);
    }
}
});
document.getElementById("getFilelist").style = "float:right";
window.electron.showDownloadFilesInfo();
