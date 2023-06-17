const sheetiduser = '12mEgjJJRwnt7F37Q6oTd5clzb-FAflModBVjDgOupuE';
const base1 = `https://docs.google.com/spreadsheets/d/${sheetiduser}/gviz/tq?`;
const sheetNameUser = 'Employee';
let queryUser = encodeURIComponent('Select *');
let urlUser = `${base1}&sheet=${sheetNameUser}&tq=${queryUser}`;
let DataUsers = [];
let dataIn =[];  
document.addEventListener('DOMContentLoaded', init)
function init() {
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
    for (let index = 0; index < DataUsers.length; index++) {
      if(User_PassWord.value==DataUsers[index].Employee_PassWord){dataIn.push(index);return true}
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
    localStorage.setItem("User_Id", DataUsers[dataIn[0]].Employee_ID );
    localStorage.setItem("User_Name", DataUsers[dataIn[0]].Emplyee_Name);
    localStorage.setItem("Branch_name",data[dataIn[1]].Branch_name);
    localStorage.setItem("Main_Id",data[dataIn[1]].Branch_MainNo);
    }
    document.getElementById("loginPage").style.display="none"
    document.getElementById("MainPage").style.display="flex"
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

