function checkDownloadPath() {
  if(localStorage.getItem("testFolder") == null || localStorage.getItem("testFolder") == ""){
    document.getElementById("notice").innerHTML= "Important Task : Set your download folder path";
    document.getElementById("notice").classList.add("fw-bold");
    document.getElementById("howToSetDownloadPathGuide").innerHTML = "1. Open File Explorer<br/>2. Right-click your download directory<br/>3. Choose properties<br/>4. Choose 'Location' menu<br/>5. Copy Download directory location<br/>Example in Windows10 : C:\\Users\\{YOUR_USER_ID}\\Downloads "
  } else {
    document.getElementById("howToSetDownloadPathGuide").innerHTML = "";
    document.getElementById("notice").innerHTML= "Change download folder path";
    document.getElementById("notice").classList.remove("fw-bold");
    if(!localStorage.getItem("testFolder").includes("Download") && !localStorage.getItem("testFolder").includes("download")){
      let p = document.createElement('p');
      p.appendChild(document.createTextNode("It seems your download directory path is wrong!"))
      p.classList.add("text-danger", "fw-bold");
      document.getElementById("howToSetDownloadPathGuide").appendChild(p);
    }
    document.getElementById("howToSetDownloadPathGuide").innerHTML += "<h5>Current location: " + localStorage.getItem("testFolder").replaceAll("\\\\","\\") + " </h5>1. Open File Explorer<br/>2. Right-click your download directory<br/>3. Choose properties<br/>4. Choose 'Location' menu<br/>5. Copy Download directory location<br/>Example in Windows10 : C:\\Users\\{YOUR_USER_ID}\\Downloads "
    
  }
}
checkDownloadPath();
document.getElementById('setDownloadPathBtn').addEventListener('click', (evt)=> {
  evt.preventDefault();
  console.log("set Download Path Btn pressed");
  let input = document.getElementById("DownloadPathInput").value;
  console.log(input);
  window.electron.setDownloadPath(input);
  checkDownloadPath();
});
