


const sheetId = '12mEgjJJRwnt7F37Q6oTd5clzb-FAflModBVjDgOupuE';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName1 = 'Branches';
const sheetName2 = 'Employee';
let query = encodeURIComponent('Select *');
let url = `${base}&sheet=${sheetName1}&tq=${query}`;
let url2 = `${base}&sheet=${sheetName2}&tq=${query}`;
let data = [];
let data2 = [];
let dataIn =[];  
document.addEventListener('DOMContentLoaded', init)
function init() {
    fetch(url)
        .then(res => res.text())
        .then(rep => {
            const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
            const colz = [];
            jsonData.table.cols.forEach((heading) => {
                if (heading.label) {
                    let column = heading.label;
                    colz.push(column);
                }
            })
            jsonData.table.rows.forEach((rowData) => {
                const row = {};
                colz.forEach((ele, ind) => {
                    row[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
                })
                data.push(row);
            })
        })
        fetch(url2)
        .then(res => res.text())
        .then(rep => {
            const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
            const colz2 = [];
            jsonData.table.cols.forEach((heading) => {
                if (heading.label) {
                    let column2 = heading.label;
                    colz2.push(column2);
                }
            })
            jsonData.table.rows.forEach((rowData) => {
                const row2 = {};
                colz2.forEach((ele, ind) => {
                    row2[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
                })
                data2.push(row2);
            })
        })
        console.log(data)
    }
function IsfoundBranch(){
  let Branch_ID= document.getElementById("Branch_ID");
  let error_Branch_ID= document.getElementById("error_Branch_ID");
  for (let index = 0; index < data.length; index++) {
    if(Branch_ID.value==data[index].Branch_no){dataIn.push(index);return true}
  }
  error_Branch_ID.className="fa fa-warning";
  return false ;
}

function IsfoundUser(){
  let User_PassWord= document.getElementById("User_PassWord");
  let error_User_ID= document.getElementById("error_User_ID");
    for (let index = 0; index < data2.length; index++) {
      if(User_PassWord.value==data2[index].Employee_PassWord){dataIn.push(index);return true}
    }
    error_User_ID.className="fa fa-warning";
    return false ;
  }


function Istrue(){
  let User_PassWord= document.getElementById("User_PassWord");
  let Branch_ID= document.getElementById("Branch_ID");
  let error_User_ID= document.getElementById("error_User_ID");
  let error_Branch_ID= document.getElementById("error_Branch_ID");
  if(User_PassWord.value===""){ error_User_ID.className="fa fa-warning"; return false}else{ error_User_ID.className="" }
  if(IsfoundUser()===false){return false}{error_User_ID.className=""}
  if(Branch_ID.value===""){ error_Branch_ID.className="fa fa-warning" ; return false }else{ error_Branch_ID.className=""}
  if(IsfoundBranch()===false){return false}{error_Branch_ID.className="" }
  return true
}

function Sign_In(){
  if (Istrue()===true){
    if (typeof(Storage) !== "undefined") {
    localStorage.setItem("User_Id", data2[dataIn[0]].Employee_ID );
    localStorage.setItem("User_Name", data2[dataIn[0]].Emplyee_Name);
    localStorage.setItem("Branch_name",data[dataIn[1]].Branch_name);
    localStorage.setItem("Main_Id",data[dataIn[1]].Branch_MainNo);
    }
    window.open("https://invoice-mainpage.blogspot.com","_self")
    }
}

function ShowPassword(){
  let User_PassWord= document.getElementById("User_PassWord")
  let Eye_Password= document.getElementById("Eye_Password")
  if (Eye_Password.className=="fa fa-eye"){
    User_PassWord.type="text"
    Eye_Password.className="fa fa-eye-slash"
  }else{
    User_PassWord.type="password"
    Eye_Password.className="fa fa-eye"
  }
}

function ConvertModeToSun(){
  document.getElementById("Moon").style.display="inline-block";
  document.getElementById("Sun").style.display="none";
  document.querySelector(':root').style.setProperty('--FColor', "wheat"); 
  document.querySelector(':root').style.setProperty('--EColor', "white");
  document.querySelector(':root').style.setProperty('--loginColor', "whitesmoke"); 
  document.querySelector(':root').style.setProperty('--FontColor', "#f2a20b"); 
  document.querySelector(':root').style.setProperty('--Font2Color', "#a53333"); 
  document.querySelector(':root').style.setProperty('--Font3Color', "#a53333"); 
} 
function ConvertModeToMoon(){
  document.getElementById("Sun").style.display="inline-block";
  document.getElementById("Moon").style.display="none";
  document.querySelector(':root').style.setProperty('--FColor', "#141e30"); 
  document.querySelector(':root').style.setProperty('--EColor', "#243b55");
  document.querySelector(':root').style.setProperty('--loginColor', "#00000080"); 
  document.querySelector(':root').style.setProperty('--FontColor', "white"); 
  document.querySelector(':root').style.setProperty('--Font2Color', "#d3f6f8"); 
  document.querySelector(':root').style.setProperty('--Font3Color', "black"); 
}  
