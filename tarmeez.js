function addEventElemnt ( elemnt , evnt , callback ) {
    if ( elemnt.length > 1 ) {
        for ( let i=0 ; i < elemnt.length ; i++) {
            elemnt[i].addEventListener(evnt , callback)
        }
    }
    else
    {
        elemnt.addEventListener(evnt , callback) ;
    }
}

const userAccount = document.querySelector(".navButton") ; 
const navClicked = document.querySelector(".navClicked") ;
const afterClicked = document.querySelectorAll(".afterClicked") ;
const beforeClicked = document.querySelectorAll(".beforeClicked") ;
const specialForPosts = document.querySelector(".specialForPost") ;
const overlay = document.querySelector(".overlay") ;
const login = document.querySelector(".login") ;
const register = document.querySelector(".register")
const loginBtn = document.querySelector(".login-btn") ;
const cancelBtn = document.querySelectorAll(".cancel-btn") ;
const casSpe = document.querySelector(".casSpe")
const wrapperBtnsB = document.querySelector(".wrapper-btnsB") ;


addEventElemnt(userAccount , "click" , ()=>{
    navClicked.classList.toggle("active") ; 
} )


addEventElemnt(afterClicked , "click" , (e)=> {
    e.preventDefault() ;
    navClicked.classList.remove("active") ;
    overlay.classList.add("active") ;
})
addEventElemnt(afterClicked[0] , "click" , (e)=> {
    e.preventDefault() ;
    overlay.classList.add("active") ;
    login.classList.add("active") ;
})
addEventElemnt(beforeClicked[0] , "click" , (e)=> {
    e.preventDefault() ;
    overlay.classList.add("active") ;
    login.classList.add("active") ;
})

addEventElemnt(afterClicked[1] , "click" , (e)=> {
    e.preventDefault() ;
    overlay.classList.add("active") ;
    register.classList.add("active") ;
})
addEventElemnt(beforeClicked[1] , "click" , (e)=> {
    e.preventDefault() ;
    overlay.classList.add("active") ;
    register.classList.add("active") ;
})


addEventElemnt(cancelBtn[0] , "click" , ()=>{
    overlay.classList.remove("active") ;
    login.classList.remove("active") ;
})
addEventElemnt(cancelBtn[1] , "click" , ()=>{
    overlay.classList.remove("active") ;
    register.classList.remove("active") ;
})




console.log(beforeClicked) ;
const addPost =  document.querySelector(".addPost") ;
addPost.style.display = "none"

function setupUI() {
    const token = localStorage.getItem("token") ;

    if ( token === null) {
        logoutBtn.classList.remove("choosen") ;
        addPost.style.display = "none"
    } else 
    {
        loaderToggle(true) ;

        logoutBtn.classList.add("choosen") ;
        navClicked.classList.toggle("disable") ; 
        addEventElemnt(userAccount , "click" , ()=>{
            logoutBtn.classList.toggle("active")
        } )
        wrapperBtnsB.classList.add("connect") ;
        logoutBtn.classList.add("active") ;
        addPost.style.display = "block" ;
    }
}


//API


const userName = document.querySelector(".userName") ;

function tags (i , reponse , stringEmpty) {

    stringEmpty ="" ;
    if (reponse.data.data[i].tags.length >=1  ) {
for ( let j = 0 ; j < reponse.data.data[i].tags.length ; j++ ) {
    stringEmpty += `
    <span class="px-4 py-0.5 ml-1 text-white font-semibold bg-slate-700 rounded-full">${reponse.data.data[i].tags[j].name == null || undefined ? "" : reponse.data.data[i].tags[j].name  }</span>
   `
}
return stringEmpty ;
    } else {
        return "" ;
    }


}
const pageForTheFirst = 5 ; 



const succesLogin = document.querySelector(".succesLogin") ;
const succesLogout = document.querySelector(".succesLogout") ;
let emailUserLogin = document.querySelector(".emailUser-login").value;
let passUserLogin = document.querySelector(".passUser-login").value ;

addEventElemnt(loginBtn , "click" , ()=>{
    overlay.classList.remove("active") ;
    login.classList.remove("active") ;
    getPost()
    emailUserLogin = document.querySelector(".emailUser-login").value;
     passUserLogin = document.querySelector(".passUser-login").value ;
    console.log(emailUserLogin , passUserLogin )
    loaderToggle(true) ;
    axios.post("https://tarmeezacademy.com/api/v1/login" ,
    {    
            "username" : emailUserLogin,
            "password" : passUserLogin
        
    }
    )
    .then((reponse)=>{
        loaderToggle(false) ;
        localStorage.setItem("token" , reponse.data.token) ;
        localStorage.setItem("user" , JSON.stringify(reponse.data.user)) ;
        setupUI() ;
        nameAfterConnect.innerText = emailUserLogin ;
        succesLogin.style.display = "block" ;
        setTimeout(()=>{
            succesLogin.style.display = "none" 
        } , 2000 )
        logoutBtn.classList.remove("active") ; 

    })
  .catch((e)=>{
    loaderToggle(true) ;
    standardMsg(e)  })



})

window.addEventListener("load" , ()=> {
    setupUI() ;
    const storageUser = localStorage.getItem("user") ;
    const user = JSON.parse(storageUser) ;
    nameAfterConnect.innerText = user.username  ;
})


const logoutBtn = document.querySelector(".logout-btn") ; 
const logoutBbtnBtn = document.querySelector(".logout-btn-btn")
const nameAfterConnect = document.querySelector(".nameAfterConnect") ;

addEventElemnt(logoutBbtnBtn , "click" , ()=>{
   
    localStorage.removeItem("token") ;
    localStorage.removeItem("user") ;
    succesLogout.style.display = "block" ;
        setTimeout(()=>{
            succesLogout.style.display = "none" 
        } , 2000 );
        logoutBtn.classList.remove("active") ;
        wrapperBtnsB.classList.remove("connect") ;
        logoutBtn.classList.remove("choosen") ;
        navClicked.classList.toggle("disable") ; 
        addEventElemnt(userAccount , "click" , ()=>{
            logoutBtn.classList.toggle("active")
        } )
        setupUI() ;
        globalTrue = true ; 
        getPost(pageForTheFirst , 1) ;
        


})


const newAccount = document.querySelector(".newAccount") ; 
const succesRegister =  document.querySelector(".succesRegister") ;
const profileImage = document.querySelector(".profileImage") ; 
addEventElemnt(newAccount , "click" , ()=> {
    overlay.classList.remove("active") ;
    register.classList.remove("active") ;
    const nameUserRegister = document.querySelector(".nameUser-register").value ;
const passUserRegister = document.querySelector(".passUser-register").value ;
const userRegister= document.querySelector(".User-register").value ;
const imageImportRegister = document.querySelector(".imageImportRegister").files[0] ;

let formData = new FormData()
    formData.append("username" , userRegister) ;
    formData.append("password" , passUserRegister) ;
    formData.append("image" , imageImportRegister ) ;
    formData.append("name" , nameUserRegister) ;




    loaderToggle(false) ;
    axios.post("https://tarmeezacademy.com/api/v1/register" , formData )
    .then((reponse)=>{
        loaderToggle(true) ;
        console.log(reponse)
        localStorage.setItem("token" , reponse.data.token) ;
        localStorage.setItem("user" , JSON.stringify(reponse.data.user)) ;
        setupUI() ;
        succesRegister.style.display = "block" ;
        setTimeout(()=>{
            succesRegister.style.display = "none" 
        } , 2000 )
        profileImage.src = imageImportRegister.name ;

    })
    .catch((e)=>{
        loaderToggle(true) ;
        standardMsg(e)
        })
    nameAfterConnect.innerText = userRegister ;

})
const postSide = document.querySelector(".postSide") ;

addEventElemnt( addPost , "click" , ()=> {
    overlay.classList.add("active") ;
    postSide.classList.remove("hidden") ;
    editWarpe() ;
})
const cancelPost = document.querySelector(".cancel-btn-Post") ; 
addEventElemnt(cancelPost , "click" , ()=> {
    overlay.classList.remove("active") ;
    postSide.classList.add("hidden") ;
})



const createPost = document.querySelector(".createPost") ;
const succesUpload = document.querySelector(".succesUpload") ;
createPost.addEventListener("click" , ()=> {
    overlay.classList.remove("active") ;
    postSide.classList.add("hidden") ;
})

function createNewPost() {
    let idUser = document.querySelector(".post-id-input").value ;
    let isCreate = idUser == null || idUser == "" ;

    let bodyTitle = document.querySelector(".bodyTitle").value ;
    let bodyPost = document.querySelector(".bodyPost").value ;
    let imageImport = document.querySelector(".imageImport").files[0] ;
    let formData = new FormData()
    formData.append("body" , bodyPost) ;
    formData.append("title" , bodyTitle) ;
    formData.append("image" , imageImport ) ;
    const token = localStorage.getItem("token") ;
    const headers = {
        "Content-Type" : "multipart/from-data" ,
        "authorization" : `Bearer ${token}`
    }
    const urlBase = "https://tarmeezacademy.com/api/v1"
    let url ;

    if(isCreate) {
    url = `${urlBase}/posts` ; 
    loaderToggle(false) ;
    axios.post(url ,
        formData , {
            headers : headers
        }
        ).then((reponse)=>{
            loaderToggle(true) ;
            succesUpload.style.display = "block" ;
            setTimeout(()=>{
                succesUpload.style.display = "none" 
            } , 2000 )
            console.log("wsl ka create")
            globalTrue = true ;
            getPost(pageForTheFirst , 1) ;
            
        })
        .catch((error)=>{
            loaderToggle(true) ;
            let sp = document.querySelector(".s-p") ; 
            sp.innerText = error ; 
            succesUpload.style.display = "block" ;
            succesUpload.style.backgroundColor = "rgb(239 68 68)"
            setTimeout(()=>{
                succesUpload.style.display = "none" 
            } , 2000 )
        })
    
    } else 
    {
    url = `${urlBase}/posts/${idUser}`
    formData.append("_method" , "put")
    loaderToggle(false) ;
    axios.post(url ,
        formData , {
            headers : headers
        }
        ).then((reponse)=>{
            loaderToggle(true) ;
            succesUpload.style.display = "block" ;
            setTimeout(()=>{
                succesUpload.style.display = "none" 
            } , 2000 )
            globalTrue = true ; 
            getPost(pageForTheFirst , 1) ;

            
        })
        .catch((error)=>{
            loaderToggle(true) ;
            let sp = document.querySelector(".s-p") ; 
            sp.innerText = error ; 
            succesUpload.style.display = "block" ;
            succesUpload.style.backgroundColor = "rgb(239 68 68)"
            setTimeout(()=>{
                succesUpload.style.display = "none" 
            } , 2000 )
        })
    
    }
   

    
}
const standard = document.querySelector(".standard")
function standardMsg(msg) {
    standard.innerText = msg ;
    standard.style.backgroundColor = "rgb(239 68 68)"
    standard.style.display = "block" ;
    setTimeout(()=>{
        standard.style.display = "none" 
    } , 2000 )
}

// infinty scrooling 
let lastPage ;
let globalTrue = true  ;

function getPost(pageForTheFirst=1 , currentPage=1  ) {
    if ( globalTrue ) {
    specialForPosts.innerHTML = '' ;
    }
    let url = `https://tarmeezacademy.com/api/v1/posts?limit=${pageForTheFirst}&page=${currentPage}` ;
    loaderToggle(false) ;
    axios.get(url)
    .then((reponse)=>{
        loaderToggle(true) ;
        lastPage = reponse.data.meta.last_page ;



        for ( let i=0 ; i < reponse.data.data.length ; i++ ) {

            let stringEmpty ='' ;
            let user = getCurrentUser() ; 
            let isMyPost = user != null && reponse.data.data[i].author.id == user.id ;
            let buttonContent = "" ;
            if ( isMyPost ) {
                buttonContent = 
                `<div class="editButton absolute">
                     <button class="editSpe font-semibold mr-4 mt-2 px-3 py-1 bg-slate-500 rounded-full text-white" onclick="editWarp('${encodeURIComponent(JSON.stringify(reponse.data.data[i]))}')">ediit</button>
                </div>
                <div class="deleteButton" absolute" style="right : 40%">
                <button class="deleteSpe font-semibold mr-4 mt-2 px-3 py-1 bg-red-700 rounded-full text-white" style="background-color : rgb(185 28 28)" onclick="deleteWarp('${encodeURIComponent(JSON.stringify(reponse.data.data[i]))}')">delete</button>
           </div>
                `
            } 
        
            specialForPosts.innerHTML += 
        `<div class="post w-full mb-5 bg-white" >
        <div class="conatiner userInfoSide cursor-pointer flex justify-between gap-2 p-4 border-b-2 border-gray-600 bg-slate-100 relative ">
        <div class="whoEdit cursor-pointer" onclick="profileClicked(${reponse.data.data[i].id})"  >
        <img src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg&ga=GA1.1.150478350.1680020742&semt=sph" class="rounded-full inline cursor-pointer" style="width: 40px; height: 40px;">
        <span class="userName cursor-pointer p-1 font-semibold">@${reponse.data.data[i].author.name}</span>
    </div>
    ${buttonContent}
    </div>
        <div class="contentUserSide p-4 border-b-2 border-gray-500">
            <img src=${reponse.data.data[i].image === null  ? "No Title" : reponse.data.data[i].image} class="imgResp cursor-pointer " onclick="postClicked(${reponse.data.data[i].id})" alt="">
            <div class="write py-4">
            <span class="timeSharing text-gray-500">${reponse.data.data[i].created_at === null  ? "No Title" : reponse.data.data[i].created_at}</span>
            <h1 class="titlePost font-bold text-2xl">${reponse.data.data[i].title === null ? "No Title" : reponse.data.data[i].title }</h1>
            <p class="contentPost mt-2">${reponse.data.data[i].body === null  ? "No Title" : reponse.data.data[i].body }</p>
            </div>  
        </div>
        <div class="commentsSide flex gap-2 align-middle p-3 py-4 bg-white" onclick="postClicked(${reponse.data.data[i].id})">
        <i class="fa-solid fa-pen"></i>
        <p><span class="numberComments">(${reponse.data.data[i].comments_count === null ? "No Title": reponse.data.data[i].comments_count }) </span>comments</p>
        ${tags(i , reponse , stringEmpty)}
        </div>
        </div>
        `
        }
        
    })
        .catch((error)=> {
        loaderToggle(true) ;
        standardMsg(e)    })
}
console.log(lastPage)
const post = document.querySelectorAll(".post") ; 
let currentPage = 2 ;
getPost(pageForTheFirst , 1) ;


window.addEventListener("scroll" , ()=> {
    console.log(post[0].innerHeight)
    let endPage = window.innerHeight + window.pageYOffset >= document.body.scrollHeight; 

    if (endPage && currentPage < lastPage ) {
            globalTrue = false ;
            currentPage += 1 ;
            getPost(pageForTheFirst , currentPage) ;
    }
})

function postClicked(id) {
    window.location = `posts.html?postId=${id}` ; 
}
function profileClicked(id) {
    window.location = `tarmeezProfile.html?postId=${id}` ; 
}


let editPostUs = document.querySelector(".editPost-Us") ;
const  editPost = document.querySelector(".editPost") ; 
const cancelBtnEditPost = document.querySelector(".cancel-btn-editPost") ;
 const dynamicJob = document.querySelector(".dynamicJob") ;
function editWarp(idUser) {
    let user = JSON.parse(decodeURIComponent(idUser)) ; 
    document.querySelector(".post-id-input").value = user.id ;

    console.log(user) ;
    postSide.classList.remove("hidden") ;
    overlay.classList.add("active") ;
    createPost.innerText = "Edit" ; 
    dynamicJob.innerText = "Edit Post"


}
const deleteSure = document.querySelector(".deleteSure") ;
const deleteLogin = document.querySelector(".deleteLogin") ; 

function deleteWarp(idUser) {
    let user = JSON.parse(decodeURIComponent(idUser)) ; 
    document.querySelector(".deleteInput").value = user.id ;
    deleteSure.classList.remove("hidden") ;
    overlay.classList.add("active") ;

}
function sureDelete() {
    deleteSure.classList.add("hidden") ;
    overlay.classList.remove("active") ;
    let idUser = document.querySelector(".deleteInput").value ;
    const token = localStorage.getItem("token") ;
    const headers = {
        "authorization" : `Bearer ${token}`
    }
    loaderToggle(false) ;
    axios.delete(`https://tarmeezacademy.com/api/v1/posts/${idUser}` ,  {
        headers : headers
    })
    .then((reponse)=>{
        loaderToggle(true) ;
        globalTrue = true ; 
        getPost(pageForTheFirst , 1) ;

    deleteLogin.style.display = "block" ;
    setTimeout(()=>{
    deleteLogin.style.display = "none" 
    } , 2000 )

    })
    .catch((e)=>{

        loaderToggle(true) ;
        standardMsg(e)
    })
    

}





function editWarpe() {
    

    console.log(user) ;
    postSide.classList.remove("hidden") ;
    overlay.classList.add("active") ;



}

const prbl = document.querySelector(".cancel-btn-Post") ; 
addEventElemnt(prbl , "click" , ()=>{
    postSide.classList.remove("hidden") ;
    overlay.classList.remove("active") ;
    editPost.classList.add("hidden") ;
})

function getCurrentUser() {
    let user = null ; 
    const storageUser = localStorage.getItem("user") ;
    if ( storageUser != null ) {
        user = JSON.parse(storageUser)
    }
    return user ;
}

function cancelDelete() {
    deleteSure.classList.add("hidden") ;
    overlay.classList.remove("active") ;
}

const profileLink = document.querySelector(".profileLink") ; 
profileLink.addEventListener("click" , (e)=> {
    e.preventDefault() ;
    profileClicked(getCurrentUser().id) ;
})
function loaderToggle (show) {
 if(show === false) {
    document.querySelector(".loader").style.visibility = "visible"
 }
 else
 {
    document.querySelector(".loader").style.visibility = "hidden"
 }
}
