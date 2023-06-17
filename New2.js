const sheetId = '12mEgjJJRwnt7F37Q6oTd5clzb-FAflModBVjDgOupuE';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName1 = 'Branches';
const sheetName2 = 'Supplier';
const sheetName3="Branches_Main";
let query = encodeURIComponent('Select *');
let url = `${base}&sheet=${sheetName1}&tq=${query}`;
let url2 = `${base}&sheet=${sheetName2}&tq=${query}`;
let url3 = `${base}&sheet=${sheetName3}&tq=${query}`;
let data = [];
let data2 = [];
let data3 = [];
document.addEventListener('DOMContentLoaded', init)
function init() {
  if (typeof(Storage) !== "undefined") {
  let Employee_ID= document.getElementById("Employee_ID")
  Employee_ID.value=localStorage.getItem("User_Id");
  let Employee_Name=document.getElementById("Employee_Name")
  Employee_Name.value=localStorage.getItem("User_Name");
  }
if(Employee_ID.value=="null" || Employee_Name.value=="null"){return;}
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
            Loadinput();
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
            Loadinput2();
        })
        fetch(url3)
        .then(res => res.text())
        .then(rep => {
            const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
            const colz3 = [];
            jsonData.table.cols.forEach((heading) => {
                if (heading.label) {
                    let column3 = heading.label;
                    colz3.push(column3);
                }
            })
            jsonData.table.rows.forEach((rowData) => {
                const row3 = {};
                colz3.forEach((ele, ind) => {
                    row3[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
                })
                data3.push(row3);
            })
            Loadinput3();
        })
        

    }

function Loadinput(){
let myDropdown= document.getElementById("BranchName");
let A_myDropdown;
  for (let index = 0; index < data.length; index++) {
    A_myDropdown=document.createElement("option");
    A_myDropdown.id="my_" + index;
    A_myDropdown.innerHTML=data[index].Branch_name;
    A_myDropdown.value= data[index].Branch_name;
    myDropdown.appendChild(A_myDropdown);
  }
  let BranchName= document.getElementById("BranchName")
  BranchName.value=localStorage.getItem("Branch_name");
}

function ReloadBranchName(){
  document.getElementById("refresh").className="fa fa-refresh fa-spin"
  let myDropdown= document.getElementById("BranchName"); 
  let myDropdown_L= myDropdown.children.length; 
  for (let index = 0; index < myDropdown_L; index++) {
    myDropdown.children.item(0).remove();
  }
  Loadinput()
  document.getElementById("refresh").className="fa fa-refresh"
}

function Loadinput3(){
  let myDropdown= document.getElementById("BranchMain");
  let A_myDropdown;
    for (let index = 0; index < data3.length; index++) {
      A_myDropdown=document.createElement("option");
      A_myDropdown.id="my1_" + index;
      A_myDropdown.innerHTML=data3[index].Main_Name;
      A_myDropdown.value= data3[index].Main_Name;
      myDropdown.appendChild(A_myDropdown);
    }
     LoadDataSignIn()
  }

  function ReloadBranchMain(){
    document.getElementById("refresh1").className="fa fa-refresh fa-spin"
    let myDropdown= document.getElementById("BranchMain"); 
    let myDropdown_L= myDropdown.children.length; 
    for (let index = 0; index < myDropdown_L; index++) {
      myDropdown.children.item(0).remove();
    }
    Loadinput3()
    document.getElementById("refresh1").className="fa fa-refresh"
  }
function Loadinput2(){
let myDropdown3= document.getElementById("myDropdown3");
let A_myDropdown3
for (let index = 0; index < data2.length; index++) {
  A_myDropdown3=document.createElement("a");
  A_myDropdown3.id="my2_" + index;
  A_myDropdown3.textContent=data2[index].Supplier_Name;
  A_myDropdown3.href='#'+ data2[index].Supplier_Name;
  A_myDropdown3.style.textAlign="center";
  A_myDropdown3.onclick=function(){MoveName3(this)} ;
  myDropdown3.appendChild(A_myDropdown3);
}
}
function ReloadmyDropdown3(){
  FoucusOutInput3();
  document.getElementById("refresh2").className="fa fa-refresh fa-spin"
  let myDropdown= document.getElementById("myDropdown3"); 
  let myDropdown_L= myDropdown.children.length; 
  for (let index = 0; index < myDropdown_L; index++) {
    myDropdown.children.item(0).remove();
  }
  Loadinput2()
  document.getElementById("refresh2").className="fa fa-refresh"
}
function MoveName3(XXX){
  let myInput3=document.getElementById("myInput3");
  myInput3.value=XXX.textContent;
    let zz=[];
     zz=String(XXX.id).split('_');
    document.getElementById("IndmyInput3").textContent=  Number(zz[1]) ;
    FoucusOutInput3();
}
function FoucusInput3() {
  document.getElementById("myDropdown3").className="dropdown-content"; 
}

function FoucusOutInput3() {
    document.getElementById("myDropdown3").className="Unshow";
}
function filterFunction3() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput3");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown3");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

function FoucusOutInput02() {
    document.getElementById("myDropdown3").className="Unshow";
}
function LoadDataSignIn(){
  let BranchMain= document.getElementById("BranchMain")
  let ZZ=localStorage.getItem("Main_Id");
  for (let index = 0; index < data2.length; index++) {
    if(ZZ==data3[index].Main_no){BranchMain.value=data3[index].Main_Name;return}
  }
}
function OpenNewBranch(){
var theTop=((screen.height-500)/2);
var theLeft=((screen.width-700)/2);
var features = `height=500,width=700,top=${theTop},left=${theLeft},toolbar=1,Location=0,Directories=0,Status=0,menubar=1,Scrollbars=1,Resizable=1`;
window.open("/NewBranch.html","_blank",features)
}
function OpenNewBranchMain(){
var theTop=((screen.height-400)/2);
var theLeft=((screen.width-600)/2);
var features = `height=400,width=600,top=${theTop},left=${theLeft},toolbar=1,Location=0,Directories=0,Status=0,menubar=1,Scrollbars=1,Resizable=1`;
window.open("/NewBranchMain.html","_blank",features)
}
function OpenNewSupplier(){
var theTop=((screen.height-400)/2);
var theLeft=((screen.width-600)/2);
var features = `height=400,width=600,top=${theTop},left=${theLeft},toolbar=1,Location=0,Directories=0,Status=0,menubar=1,Scrollbars=1,Resizable=1`;
window.open("/NewSupplier.html","_blank",features);
}
function OpenUsers(){
  localStorage.clear();
  window.open("/User.html","_self");
}
function updateImageDisplay() {
  let AmFile=document.getElementById("AmFile")
  if(AmFile.value==undefined){return} ; 
  if(AmFile.files.item(0)==null){return} ;
  let curFiles = AmFile.files.item(0).name;
  document.getElementById("AmFileTxt").value = curFiles ;
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
