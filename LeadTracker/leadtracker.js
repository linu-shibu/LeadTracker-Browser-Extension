let myLeads=[]

// myLeads=JSON.parse(myLeads)
// myLeads.push("www.youtube.com")
// console.log(myLeads[1])
// myLeads=JSON.stringify(myLeads)
// console.log(typeof myLeads)

// function saveInput()
// {
//     console.log("Button clicked from onclick")
// }

const inputEl=document.getElementById("input-el")
const saveinpEl=document.getElementById("save-btn")
const delEl=document.getElementById("delete-btn")
const ulEl=document.getElementById("ul-el")
const tabEl=document.getElementById("tab-btn")

let leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"))
// console.log(leadsFromLocalStorage)
if(leadsFromLocalStorage)
{
    myLeads=leadsFromLocalStorage
    render(myLeads)
}


saveinpEl.addEventListener("click", function(){
    // let input=document.getElementById("input-el").value
    // myLeads.push(input)
    myLeads.push(inputEl.value)
    // console.log("Button clicked from eventListener")
    // console.log(myLeads)
    inputEl.value=""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
    // console.log(localStorage.getItem("myLeads"))
})

// function cleardel()
// {
//     localStorage.clear()
//     ulEl.textContent=""
//     myLeads=[]
// }

tabEl.addEventListener("click",function(){
    // let a=tabs[0].url
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        // console.log(tabs[0].url)
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    })
    // console.log(a)
})


delEl.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads=[]
    render(myLeads)
})

// let listItems=" "

// for(i=0;i<myLeads.length;i++)
// {
//     // ulEl.innerHTML+="<li>"+ myLeads[i]+ "</li>"
//     listItems+="<li>"+ myLeads[i]+ "</li>"
//     // console.log(listItems)
//     // const li=document.createElement("li")
//     // li.textContent=myLeads[i]
//     // ulEl.append(li)
// }
// ulEl.innerHTML=listItems


function render(leads)
{
    let listItems=" "
    for(i=0;i<leads.length;i++)
    {
        // listItems+="<li><a href='"+myLeads[i]+"' target='_blank'>"+myLeads[i]+"</a></li>"
        listItems+=`
            <li>
                <a href='${leads[i]}' target='_blank'>${leads[i]}</a>
            </li>
        `
        // console.log(listItems)
    }
    ulEl.innerHTML=listItems
}
