import {getDataFromDocs, getDataFromDoc} from '../utils.js'
class ListPost extends HTMLElement{
    constructor(){
        super();
        this._shadowDom = this.attachShadow({mode: 'open'})
    }
    async connectedCallback(){
        const res = await firebase.firestore().collection('stories').where('isShown','==',true).get()
        this.listenCollectionChange()
        const listPost = getDataFromDocs(res)
        let html=''
        listPost.forEach(element =>{
            html+=`
            <post-item time="${element.createdAt}" author="${element.createdName}" content="${element.content}"></post-item>
            `
        })
        //console.log(listPost);
        this._shadowDom.innerHTML=`

        <div class="list-posts">
            ${html}
        </div>
        `
    }
    listenCollectionChange(){
        let firstRun = true;
        firebase.firestore().collection('stories').where('isShown','==',true).onSnapshot((snapShot) =>{
            if(firstRun){
                firstRun = false
                return
            }
            const docChange = snapShot.docChanges()
            for (const oneChange of docChange) {
                if(oneChange.type ==='added'){
                    this.appendPostItem(getDataFromDoc(oneChange.doc))
                }
            }
        })

    }
    appendPostItem(data){
        const postItem = document.createElement('post-item')
        postItem.setAttribute('time',data.createdAt)
        postItem.setAttribute('author',data.createdName)
        postItem.setAttribute('content',data.content)
        //this._shadowDom.querySelector('.list-posts').appendChild(postIem)
        const parent = this._shadowDom.querySelector('.list-posts')
        parent.insertBefore(postItem, parent.firstChild)

    }
}


window.customElements.define('list-post', ListPost)