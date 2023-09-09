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





const addPost =  document.querySelector(".addPost") ;
addPost.style.display = "none"

function setupUI() {
    const token = localStorage.getItem("token") ;

    if ( token === null) {
        logoutBtn.classList.remove("choosen") ;
        addPost.style.display = "none"
    } else 
    {
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

const succesLogin = document.querySelector(".succesLogin") ;
const succesLogout = document.querySelector(".succesLogout") ;

addEventElemnt(loginBtn , "click" , ()=>{
    overlay.classList.remove("active") ;
    login.classList.remove("active") ;
let emailUserLogin = document.querySelector(".emailUser-login").value;
let passUserLogin = document.querySelector(".passUser-login").value ;
    console.log(emailUserLogin , passUserLogin )
    axios.post("https://tarmeezacademy.com/api/v1/login" ,
    {    
            "username" : emailUserLogin,
            "password" : passUserLogin
        
    }
    )
    .then((reponse)=>{
        localStorage.setItem("token" , reponse.data.token) ;
        localStorage.setItem("user" , JSON.stringify(reponse.data.user)) ;
        setupUI() ;
        nameAfterConnect.innerText = emailUserLogin ;
        succesLogin.style.display = "block" ;
        setTimeout(()=>{
            succesLogin.style.display = "none" 
        } , 2000 )
        
    })
  



})

const logoutBtn = document.querySelector(".logout-btn") ; 
const logoutBbtnBtn = document.querySelector(".logout-btn-btn")
const nameAfterConnect = document.querySelector(".nameAfterConnect") ;

addEventElemnt(logoutBbtnBtn , "click" , ()=>{
    overlay.classList.remove("active") ;
    register.classList.remove("active") ;
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

})


const newAccount = document.querySelector(".newAccount") ; 
const succesRegister =  document.querySelector(".succesRegister") ;
const profileImage = document.querySelector(".profileImage") ; 
addEventElemnt(newAccount , "click" , ()=> {
    const nameUserRegister = document.querySelector(".nameUser-register").value ;
const passUserRegister = document.querySelector(".passUser-register").value ;
const userRegister= document.querySelector(".User-register").value ;
const imageImportRegister = document.querySelector(".imageImportRegister").files[0] ;

let formData = new FormData()
    formData.append("username" , userRegister) ;
    formData.append("password" , passUserRegister) ;
    formData.append("image" , imageImportRegister ) ;
    formData.append("name" , nameUserRegister) ;




  
    axios.post("https://tarmeezacademy.com/api/v1/register" , formData )
    .then((reponse)=>{
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
    nameAfterConnect.innerText = userRegister ;

})
const postSide = document.querySelector(".postSide") ;
addEventElemnt( addPost , "click" , ()=> {
    overlay.classList.add("active") ;
    postSide.classList.remove("hidden") ;
})
const cancelPost = document.querySelector(".cancel-btn-Post") ; 
addEventElemnt(cancelPost , "click" , ()=> {
    overlay.classList.remove("active") ;
    postSide.classList.add("hidden") ;
})

const createPost = document.querySelector(".createPost") ;
const succesUpload = document.querySelector(".succesUpload") ;
addEventElemnt(createPost , "click" , ()=>{
    overlay.classList.remove("active") ;
    postSide.classList.add("hidden") ;
    let bodyTitle = document.querySelector(".bodyTitle").value ;
    let bodyPost = document.querySelector(".bodyPost").value ;
    let imageImport = document.querySelector(".imageImport").files[0] ;
    let formData = new FormData()
    formData.append("body" , bodyTitle) ;
    formData.append("title" , bodyTitle) ;
    formData.append("image" , imageImport ) ;

    const token = localStorage.getItem("token") ;
    const headers = {
        "Content-Type" : "multipart/from-data" ,
        "authorization" : `Bearer ${token}`
    }

    axios.post("https://tarmeezacademy.com/api/v1/posts" ,
    formData , {
        headers : headers
    }
    ).then((reponse)=>{
        succesUpload.style.display = "block" ;
        setTimeout(()=>{
            succesUpload.style.display = "none" 
        } , 2000 )
        
    })
    .catch((error)=>{
        let sp = document.querySelector(".s-p") ; 
        sp.innerText = error ; 
        succesUpload.style.display = "block" ;
        succesUpload.style.backgroundColor = "rgb(239 68 68)"
        setTimeout(()=>{
            succesUpload.style.display = "none" 
        } , 2000 )
    })
})



const urlParams = new URLSearchParams(window.location.search) ;
const idPage = urlParams.get('postId') ; 
console.log(idPage) ; 
const specialForComments = document.querySelector(".specialForComments") ;



function tagsOnce ( reponse , tagsOnceUses) {

    tagsOnceUses ="" ;
for ( let j = 0 ; j < reponse.data.data.tags.length ; j++ ) {
    tagsOnceUses += `
    <span class="px-4 py-0.5 ml-1 text-white font-semibold bg-slate-700 rounded-full">${reponse.data.data.tags[j].name}</span>
   `
}
return tagsOnceUses ;


}
function commentsOnce ( reponse , commentsOnceUses) {
    commentsOnceUses='' ; 
    console.log(reponse.data.data.comments.length)
    for ( let i = 0 ; i < reponse.data.data.comments.length ; i++ ) {
        commentsOnceUses +=
        `<div class="comments w-full px-5">
        <div class="commetnsInfo flex gap-4 align-middle">
        <img src="${reponse.data.data.comments[i].author.profile_image}" class="rounded-full inline" style="width: 40px; height: 40px;">
        <span class="nameCommentaire font-bold pt-2   ">${reponse.data.data.comments[i].author.username}</span>
        </div>
        <p class="bodyComment mt-5 mb-5">${reponse.data.data.comments[i].body}</p>
    </div>`
    }
    return commentsOnceUses ;
}


function adding() {
    console.log("ayyyyyyyy")
    let token = localStorage.getItem("token") ;
    let comment = document.querySelector(".addComments").value ;
    axios.post(`https://tarmeezacademy.com/api/v1/posts/${idPage}/comments` , 
    {
        "body" : comment
    } , {
    headers: {
        "authorization" : `Bearer ${token}`
    }
    })
    .then(()=> {
        getPoste(idPage) 
    })
    .catch((error)=>{
        alert(error) ;
    })

}






function getPoste (idPage) {
    axios.get(`https://tarmeezacademy.com/api/v1/posts/${idPage}`)
    .then((reponse)=>{
        let rep = reponse.data.data ;
        let tagsOnceUses = "" ;
        let commentsOnceUses = "" ;
        console.log(rep.author.profile_image) ;
        console.log(rep.author.username) ;
        console.log(rep.image) ;
        console.log(rep.created_at) ;
        console.log(rep.title == null ? 'null' : rep.title) ;
        console.log(rep.body) ;
        console.log(rep.comments_count) ;

        
        let stringEmpty ='' ;
        let user = getCurrentUser() ; 
        let isMyPost = user != null && rep.author.id == user.id ;
        let buttonContent = "" ;
        if ( isMyPost ) {
            buttonContent = 
            `<div class="editButton absolute">
                 <button class="editSpe font-semibold mr-4 mt-2 px-3 py-1 bg-slate-500 rounded-full text-white" onclick="editWarp('${encodeURIComponent(JSON.stringify(rep))}')">ediit</button>
            </div>
            <div class="deleteButton" absolute" style="right : 40%">
            <button class="deleteSpe font-semibold mr-4 mt-2 px-3 py-1 bg-red-700 rounded-full text-white" style="background-color : rgb(185 28 28)" onclick="deleteWarp('${encodeURIComponent(JSON.stringify(rep))}')">delete</button>
       </div>
            `
        } 

            specialForComments.innerHTML = 
        `  
        <h1 class="userWannaSeeComments font-bold" style="font-size: 44px;">${rep.author.username}' Posts</h1>
        <div class="post w-full mb-5 bg-white" style="position: relative;">
            <div class="conatiner userInfoSide flex justify-between gap-2 p-4 border-b-2 border-gray-600 bg-slate-100 ">
                 <div class="whoEdit">
                         <img src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg&ga=GA1.1.150478350.1680020742&semt=sph" class="rounded-full inline" style="width: 40px; height: 40px;">
                         <span class="userName p-1 font-semibold">@${rep.author.name}</span>
                 </div>
               ${buttonContent}
            </div>
            <div class="contentUserSide p-4 border-b-2 border-gray-500">
                <img src=${rep.image} class="imgResp cursor-pointer" alt="">
                <div class="write py-4">
                <span class="timeSharing text-gray-500">${rep.created_at}</span>
                <h1 class="titlePost font-bold text-2xl">${rep.title == null ?   'null' : rep.title }</h1>
                <p class="contentPost mt-2">${rep.body}</p>
                </div>  
            </div>
            <div class="commentsSide flex gap-2 align-middle p-3 py-4 bg-white">
            <i class="fa-solid fa-pen"></i>
            <p><span class="numberComments">(${rep.comments_count})</span>comments</p>
            ${tagsOnce( reponse , tagsOnceUses)}
            </div>
            </div>
            ${commentsOnce(reponse , commentsOnceUses)}
               <div class="addingComment w-full " style="width: 100%; position: absolute;">
                        <input type="text" class="addComments absolute w-full p-4 font-semibold" style="height: 40px; font-size: 15px;" placeholder="add comments here .." }>
                        <div class="sentComment  absolute cursor-pointer " style="right: 10px; font-size: 22px; top: 0%; padding: 5px;  " onclick="adding()">
                        <i class="fa fa-regular fa-paper-plane" style="font-size: 22px;"></i>
    
                    </div>
                    </div>
        </div>
        `
    
    })
        .then((error)=> {
        console.log(error)
    })
}
getPoste(idPage) 


const sentComment = document.querySelector(".sentComment") ;








const editBtn = document.querySelector(".edit")
const  editPost = document.querySelector(".editPost") ; 
const cancelBtnEditPost = document.querySelector(".cancel-btn-editPost") ;

function editWarp() {
    console.log("ayyyyyy")
    overlay.classList.add("active") ;
    editPost.classList.remove("hidden") ;

}

function getCurrentUser() {
    let user = null ; 
    const storageUser = localStorage.getItem("user") ;
    if ( storageUser != null ) {
        user = JSON.parse(storageUser)
    }
    return user ;
}

window.addEventListener("load" , ()=> {
    setupUI() ;
    const storageUser = localStorage.getItem("user") ;
    const user = JSON.parse(storageUser) ;
    nameAfterConnect.innerText = user.username  ;
})
