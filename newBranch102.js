const sheetId = '17UbXKCrZekgs4GF8_zoEq-qb7qfcfOwfgCHYQzZGjk8';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName3="Branches_Main";
let query = encodeURIComponent('Select *');
let url3 = `${base}&sheet=${sheetName3}&tq=${query}`;
let data3 = [];
document.addEventListener('DOMContentLoaded', init)
function init() {

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

function Loadinput3(){
  let myDropdown= document.getElementById("BranchMain");
  let A_myDropdown;
    for (let index = 0; index < data3.length; index++) {
      A_myDropdown=document.createElement("option");
      A_myDropdown.id="my1_" + index;
      A_myDropdown.innerHTML=data3[index].Main_Name;
      A_myDropdown.value= data3[index].Main_no;
      myDropdown.appendChild(A_myDropdown);
    }
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
