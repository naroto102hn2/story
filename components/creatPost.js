import {getItemToLocalStorage} from '../utils.js'


const style = `
    #create-post{
        width: 60%;
        margin: auto;
        margin-top: 20px;
        text-align: right;
    }
    #create-post textarea{
        width: 100%;
        border: 1px solid #dbdbdb;
        font-size: larger;
        border-radius: 10px;
        outline: none;
    }
    
    #post{
        background-color: aqua;
        padding: 10px 15px;
        border-radius: 5px;
    }

`
class CreatePost extends HTMLElement{
    constructor(){
        super();
        this._shadowDom = this.attachShadow({mode: 'open'})
    }
    connectedCallback(){
        this._shadowDom.innerHTML = `
        <style>${style}</style>
        <form id = "create-post">
            <textarea name="content" type="textarea" rows="10" id="content"></textarea>
            <button id="post">Post</button>
        </form>
        `
        const postButton = this._shadowDom.getElementById("post")
        const postContent = this._shadowDom.getElementById("content")
        postButton.addEventListener("click", (e) => {
          e.preventDefault()
          const userData = getItemToLocalStorage("currentUser")
          if(postContent.value.trim()===''){
              alert("Enter again");
              return;
          }
          const postData = {
            createdAt: new Date().toISOString(),
            createdBy: userData.id,
            createdName: userData.name,
            content: postContent.value,
            comments: [],
            isShown: true,
          }
          firebase.firestore().collection("stories").add(postData)
          alert("Post added!")
          postContent.value = ''
        })
    }
}

window.customElements.define('create-post', CreatePost)