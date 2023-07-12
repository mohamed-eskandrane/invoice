

const sheetId = '1DQs3_zIuk4dMq0jb1IIrPtAL59nd5OY_xrWrnf7Tts4';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName1 = 'Branches';
const sheetName2 = 'Supplier';
const sheetName3="Branches_Main";
const sheetNameUser = 'Employee';
const sheetImage ="Invoice_Image";
let query = encodeURIComponent('Select *');
let url = `${base}&sheet=${sheetName1}&tq=${query}`;
let url2 = `${base}&sheet=${sheetName2}&tq=${query}`;
let url3 = `${base}&sheet=${sheetName3}&tq=${query}`;
let urlUser = `${base}&sheet=${sheetNameUser}&tq=${query}`;
let urlImage = `${base}&sheet=${sheetImage}&tq=${query}`;
let data = [];
let data2 = [];
let data3 = [];
let DataUsers = [];
let DataImage = [];
document.addEventListener('DOMContentLoaded', init)
function init() {
  LoadUser();
  if (typeof(Storage) !== "undefined") {
    if( localStorage.getItem("User_Id")!==null){
      document.getElementById("loginPage").style.display="none";
      document.getElementById("MainPage").style.display="flex";
      let Employee_ID=document.getElementById("Employee_ID")
      Employee_ID.value =localStorage.getItem("User_Id");
      document.getElementById("Employee_Name").value=localStorage.getItem("User_Name");
      document.getElementById("Bill_Number").value=localStorage.getItem("CountBill");
    }
  }
        loadBranches();
        loadSupplier();
        loadBranchMain();
        loadImagesUrls();
    }
function LoadUser(){
  DataUsers=[];
  fetch(urlUser)
  .then(res => res.text())
  .then(rep => {
      const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
      const colzUser = [];
      jsonData.table.cols.forEach((heading) => {
          if (heading.label) {
              let columnUser = heading.label;
              colzUser.push(columnUser);
          }
      })
      jsonData.table.rows.forEach((rowData) => {
          const rowUser = {};
          colzUser.forEach((ele, ind) => {
              rowUser[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
          })
          DataUsers.push(rowUser);
      })
  })
}
function loadBranches(){
  data = [];
  fetch(url)
  .then(res => res.text())
  .then(rep => {
      const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
      const colz = [];
      jsonData.table.cols.forEach((heading) => {
          if (heading.label) {
              let columnBranches = heading.label;
              colz.push(columnBranches);
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
}
function loadSupplier(){
  data2 = [];
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
}
function loadBranchMain(){
  data3 = [];
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
function loadImagesUrls(){
  DataImage = [];
  fetch(urlImage)
  .then(res => res.text())
  .then(rep => {
      const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
      const colImage = [];
      jsonData.table.cols.forEach((heading) => {
          if (heading.label) {
              let column = heading.label;
              colImage.push(column);
          }
      })
      jsonData.table.rows.forEach((rowData) => {
          const rowImage = {};
          colImage.forEach((ele, ind) => {
              rowImage[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
          })
          DataImage.push(rowImage);
      })
      LoadinputImage();
  })
}
function LoadinputImage(){
  let myDropdown= document.getElementById("AmFileSel");
  let A_myDropdown;
  var d = new Date();
  var dT= d.getTime()
  for (let index =  DataImage.length-1 ; index >= 0; index-=1){
      if((dT -DataImage[index].TimeData) <=100000){
        A_myDropdown=document.createElement("option");
        A_myDropdown.id="myImage_" + index;
        A_myDropdown.innerHTML=DataImage[index].File_Name;
        A_myDropdown.value= DataImage[index].File_URL;
        myDropdown.appendChild(A_myDropdown);
      }
  }
  
  onchangeinputImage();
}


function onchangeinputImage(){
  document.getElementById("AmFileTxt").textContent=document.getElementById("AmFileSel").value;
}
function ReloadImage(){
  document.getElementById("refreshIm").className="fa fa-refresh fa-spin"
  let myDropdown= document.getElementById("AmFileSel"); 
  let myDropdown_L= myDropdown.children.length; 
  for (let index = 0; index < myDropdown_L; index++) {
    myDropdown.children.item(0).remove();
  }
  loadImagesUrls()
  document.getElementById("refreshIm").className="fa fa-refresh"
}
function FindIdForBranch(BranchName){
  for (let index = 0; index < data.length; index++) {
    if( BranchName === data[index].Branch_name){
      return data[index].Branch_MainNo;
    } 
  }
}
function FindMainFormID(MainId){
  for (let index = 0; index < data3.length; index++) {
    if( MainId === data3[index].Main_no){
      return data3[index].Main_Name;
    } 
  }
}

function OnchangeBranch(){
  let ZZ=FindIdForBranch(document.getElementById("BranchName").value);
  let YY=FindMainFormID(ZZ);
  document.getElementById("BranchMain").value=YY;
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
  if( localStorage.getItem("User_Id")!==null){
    document.getElementById("BranchName").value=localStorage.getItem("Branch_name");
    OnchangeBranch();
  }
}

function ReloadBranchName(){
  document.getElementById("refresh").className="fa fa-refresh fa-spin"
  let myDropdown= document.getElementById("BranchName"); 
  let myDropdown_L= myDropdown.children.length; 
  for (let index = 0; index < myDropdown_L; index++) {
    myDropdown.children.item(0).remove();
  }
  loadBranches()
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
    if( localStorage.getItem("User_Id")!==null){ LoadDataSignIn();}
  }

  function ReloadBranchMain(){
    document.getElementById("refresh1").className="fa fa-refresh fa-spin"
    let myDropdown= document.getElementById("BranchMain"); 
    let myDropdown_L= myDropdown.children.length; 
    for (let index = 0; index < myDropdown_L; index++) {
      myDropdown.children.item(0).remove();
    }
    loadBranchMain();
    Loadinput3();
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
  loadSupplier()
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
  for (let index = 0; index < data3.length; index++) {
    if(localStorage.getItem("Main_Id")==data3[index].Main_no){document.getElementById("BranchMain").value=data3[index].Main_Name;return}
  }
}
function OpenNewBranch(){
var theTop=((screen.height-500)/2);
var theLeft=((screen.width-700)/2);
var features = `height=500,width=700,top=${theTop},left=${theLeft},toolbar=1,Location=0,Directories=0,Status=0,menubar=1,Scrollbars=1,Resizable=1`;
window.open("https://new-branch.blogspot.com/","_blank",features)
}
function OpenNewBranchMain(){
var theTop=((screen.height-400)/2);
var theLeft=((screen.width-600)/2);
var features = `height=400,width=600,top=${theTop},left=${theLeft},toolbar=1,Location=0,Directories=0,Status=0,menubar=1,Scrollbars=1,Resizable=1`;
window.open("https://new-branch-main.blogspot.com/","_blank",features)
}
function OpenNewSupplier(){
var theTop=((screen.height-400)/2);
var theLeft=((screen.width-600)/2);
var features = `height=400,width=600,top=${theTop},left=${theLeft},toolbar=1,Location=0,Directories=0,Status=0,menubar=1,Scrollbars=1,Resizable=1`;
window.open("https://new-supplier.blogspot.com/","_blank",features);
}
function OpenUsers(){
  localStorage.clear();
  location.reload();
  document.getElementById("loginPage").style.display="flex";
  document.getElementById("MainPage").style.display="none";
}

function OpenFormUpload(){
  var theTop=((screen.height-400)/2);
  var theLeft=((screen.width-600)/2);
  var features = `height=400,width=600,top=${theTop},left=${theLeft},toolbar=1,Location=0,Directories=0,Status=0,menubar=1,Scrollbars=1,Resizable=1`;
  
  window.open("https://script.google.com/macros/s/AKfycbzOgckyEbzmIITzs4XhS_JRjJWInysMQ5pRs-02Nrsi8Ri8Q6USRz_M4QD7kfQtCoGUtg/exec","_blank",features);
 }


function ConvertModeToSun(){
  document.getElementById("Moon").style.display="inline-block";
  document.getElementById("Sun").style.display="none";
  document.getElementById("Moon1").style.display="inline-block";
  document.getElementById("Sun1").style.display="none";
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
  document.getElementById("Sun1").style.display="inline-block";
  document.getElementById("Moon1").style.display="none";
  document.querySelector(':root').style.setProperty('--FColor', "#141e30"); 
  document.querySelector(':root').style.setProperty('--EColor', "#243b55");
  document.querySelector(':root').style.setProperty('--loginColor', "#00000080"); 
  document.querySelector(':root').style.setProperty('--FontColor', "white"); 
  document.querySelector(':root').style.setProperty('--Font2Color', "#d3f6f8"); 
  document.querySelector(':root').style.setProperty('--Font3Color', "black"); 
}  

function IsfoundBranch(){
  let Branch_ID= document.getElementById("Branch_ID");
  let error_Branch_ID= document.getElementById("error_Branch_ID");
  for (let index = 0; index < data.length; index++) {
    if(Branch_ID.value==data[index].Branch_no){
      localStorage.setItem("Branch_Index", index);
       return true;
      }
  }
  error_Branch_ID.className="fa fa-warning";
  return false ;
}

function IsfoundUser(){
  let User_PassWord= document.getElementById("User_PassWord");
  let error_User_ID= document.getElementById("error_User_ID");
    for (let index = 0; index < DataUsers.length; index++) {
      if(User_PassWord.value==DataUsers[index].Employee_PassWord){
        localStorage.setItem("Employee_Index", index);
        return true;
      }
    }
      error_User_ID.className="fa fa-warning";
      return false ;
  }


function Istrue(){
  let User_PassWord= document.getElementById("User_PassWord");
  let Branch_ID= document.getElementById("Branch_ID");
  let error_User_ID= document.getElementById("error_User_ID");
  let error_Branch_ID= document.getElementById("error_Branch_ID");
  if(User_PassWord.value===""){ error_User_ID.className="fa fa-warning"; return false;}else{ error_User_ID.className="" }
  if(IsfoundUser()===false){return false}else{error_User_ID.className=""}
  if(Branch_ID.value===""){ error_Branch_ID.className="fa fa-warning" ; return false; }else{ error_Branch_ID.className=""}
  if(IsfoundBranch()===false){return false}else{error_Branch_ID.className="" }
  return true;
}

function Sign_In(){
  if (Istrue()===true){
    let Employee_Index = localStorage.getItem("Employee_Index");
    let Branch_Index = localStorage.getItem("Branch_Index");
    localStorage.setItem("User_Id", DataUsers[Employee_Index].Employee_ID );
    localStorage.setItem("User_Name", DataUsers[Employee_Index].Emplyee_Name);
    localStorage.setItem("CountBill", DataUsers[Employee_Index].Count_Bill);
    localStorage.setItem("Branch_name",data[Branch_Index].Branch_name);
    localStorage.setItem("Main_Id",data[Branch_Index].Branch_MainNo);
    document.getElementById("loginPage").style.display="none";
    document.getElementById("MainPage").style.display="flex";
    location.reload();
  }
}
function IstrueDataInform(){
  let BranchName=document.getElementById("BranchName");
  let BranchMain=document.getElementById("BranchMain");
  let myInput3=document.getElementById("myInput3");
  let NumIn=document.getElementById("NumIn");
  let DatIn=document.getElementById("DatIn");
  let AmIn=document.getElementById("AmIn");
  if(BranchName.value==""){BranchName.style.border="2px solid #ff0000";return false}else{BranchName.style.border="none";}
  if(BranchMain.value==""){BranchMain.style.border="2px solid #ff0000";return false}else{BranchMain.style.border="none";}
  if(myInput3.value==""){myInput3.style.border="2px solid #ff0000";  return false}else{myInput3.style.border="none";}
  if(NumIn.value==""){NumIn.style.border="2px solid #ff0000";return false}else{NumIn.style.border="none";}
  if(DatIn.value==""){DatIn.style.border="2px solid #ff0000";return false}else{DatIn.style.border="none";}
  if(AmIn.value==""){AmIn.style.border="2px solid #ff0000";return false}else{AmIn.style.border="none";}
  return true
}
function onsubmitForm(){
  if(IstrueDataInform()===true){
  let MainForm=document.getElementById("MainForm");
  let Employee_Index=localStorage.getItem("Employee_Index");
  var w = window.open('', 'form_target', 'width=600, height=400');
  MainForm.target = 'form_target';
  MainForm.action='https://script.google.com/macros/s/AKfycbyJVVcqy7Xjk4f_kTA-sbaYbDH_X_j41XTBOlZbwGZ2rfP-6eCP205Fem8rYV2dIxQc/exec'
  MainForm.submit();
  if (MainForm.onsubmit()==true){
    const myTimeout = setTimeout(function(){ 
      LoadUser();
      const myTimeout1 = setTimeout(function(){ 
      if(DataUsers[Employee_Index].Count_Bill>document.getElementById("Bill_Number").value){
        localStorage.setItem("CountBill", DataUsers[Employee_Index].Count_Bill);
                w.close();
                clearTimeout(myTimeout)
                clearTimeout(myTimeout1)
                location.reload();
      } 
    }, 3000);}, 8000);
  }}
} 

function ShowPassword(){
  let User_PassWord= document.getElementById("User_PassWord");
  let Eye_Password= document.getElementById("Eye_Password");
  if (Eye_Password.className=="fa fa-eye"){
    User_PassWord.type="text";
    Eye_Password.className="fa fa-eye-slash";
  }else{
    User_PassWord.type="password";
    Eye_Password.className="fa fa-eye";
  }
}

function showpicture(){
  let SS =document.getElementById("AmFileTxt")
  let xx=SS.value
  let sp=xx.search("/d/")
  let ep=xx.search("/view")
  let Id=xx.substring(sp+3,ep)
  let urls=`https://drive.google.com/uc?export=view&id=${Id}`

  document.getElementById("imgX").src= urls
  var theTop=((screen.height-400)/2);
  var theLeft=((screen.width-600)/2);
  var features = `height=400,width=600,top=${theTop},left=${theLeft},toolbar=1,Location=0,Directories=0,Status=0,menubar=1,Scrollbars=1,Resizable=1`;
  window.open(urls,"_blank",features)
}
