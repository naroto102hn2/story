import {redirect} from '../index.js'

const style =`
*{
    padding: 0;
    margin: 0;
}

.container{
    background-color: aqua;
    display: flex;
    height: 64px;
    align-items: center;
    justify-content: space-between;
    padding: 0 10%;
}

.logo, .user-info{
    display: flex;
    align-items: center;
}

.brand{
    font-size: 1.8rem;
    color:rebeccapurple;
    margin-left: 20px;
    font-family: 'Andika New Basic', sans-serif;
}

.user-info{
    font-size: 1.5rem;
    
}

.user-info i{
    color: rebeccapurple;
}

.btn{
background-color: transparent;
border: none;
margin-left: 20px;
cursor: pointer;
outline: none;
}
`

class StoryHeader extends HTMLElement{
    constructor(){
        super();
        this._shadowDom = this.attachShadow({mode: 'open'})
    }

    connectedCallback(){
        this._shadowDom.innerHTML = `
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Andika+New+Basic:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">


        <style>${style}</style>
        <div class="container">
        <div class="logo">
            <img src="images/script.png" height="40px"/>
            <div class="brand">Share Story</div>
        </div>
        <div class="user-info">
            <div class="avatar">
            <i class="fa fa-eercast" aria-hidden="true"></i>
            </div>
            <button class="btn" id="sign-out">
            <i class="fa fa-sign-out" aria-hidden="true"></i>
            </button>
        </div>
        </div>
        `
        this._shadowDom.getElementById('sign-out').addEventListener('click',()=>{
                localStorage.removeItem('currentUser')
                redirect('login')
            })
    }
}

window.customElements.define('story-header', StoryHeader)