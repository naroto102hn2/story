import {getDataFromDocs, saveToLocalStorage} from '../utils.js'
import {redirect} from '../index.js'
const style = `
    .login-container {
        width: 100vw;
        height: 100vh;
        background: url('https://www.crushpixel.com/big-static13/preview4/blue-technology-circle-computer-abstract-1217830.jpg');
        background-repeat: no-repeat;
        background-size: cover; 
        display: flex;
        justify-content: flex-end;
    }
    #login-form{
        width: 30%;
        background: #fff;
        height: 100vh;
        padding: 0px 20px;
    }
    h1{
        color: #333;
    }

    form{
        text-align: center;
    }
    button{
        border-radius: 5px;
        background: #406acc;
        color: white;
        padding: 10px 15px;
    }

`

function IsInvalidEmail(the_email) {
    let at = the_email.indexOf("@");
    let dot = the_email.lastIndexOf(".");
    let space = the_email.indexOf(" ");
    
   if ((at != -1) && //có ký tự @
    (at != 0) && //ký tự @ không nằm ở vị trí đầu
    (dot != -1) && //có ký tự .
    (dot > at + 1) && (dot < the_email.length - 1) //phải có ký tự nằm giữa @ và . cuối cùng
    &&
    (space == -1)) //không có khoẳng trắng 
    return true;
     else return false;
    }

// var EMAIL_LOCATION = 'https://console.firebase.google.com/u/0/project/ci-54-85502/firestore/data~2Fusers';




class loginScreen extends HTMLElement{
    constructor(){
        super()
        this._shadowRoot = this.attachShadow({mode: 'open'})
    }
    connectedCallback(){
        this._shadowRoot.innerHTML=`
        <style>${style}</style>
        <div class="login-container">
            <form id="login-form">
                <h1>CI PROJECT</h1>
                
                <input-wrapper id="email" type="text" placeholder="Email"></input-wrapper>
                <input-wrapper id="password" type="password" placeholder="Password"></input-wrapper>
                <button>Login</button>
                <a id="redirect" style="cursor:pointer;color: blue"> Don't have an account ? login</a>
            </form>
        </div>
        `
        const loginForm = this._shadowRoot.getElementById('login-form')
        loginForm.addEventListener('submit', async (e)=>{
            e.preventDefault()
            
            const email = this._shadowRoot.getElementById('email').value;
            const password = this._shadowRoot.getElementById('password').value;
            const firebaseData = firebase.firestore().collection('users');
            let k = 0;
            if(email.trim()===''){
                k=1
                this.setError('email', 'Please input email');
            }
            if(password.trim()===''){
                k=1
                this.setError('password', 'Please input password');
            }
            // if(firebaseData.includes(email)){
            //     alert("Email already exist");
            //     return;
            // }
            
            if(k==1){
                return;
            }
            else if(IsInvalidEmail(email)==0){
                k=1
                alert("Email Invalid");
                return;
            }
            //const user = await firebase.firestore().collection

            
         const check = await this.existEmail(email,password)
         //neu email da ton tai tra ra true, k thi false
         if(!check.empty){
             alert("Login successful");
             saveToLocalStorage('currentUser', getDataFromDocs(check)[0])
             redirect('story');
            
         }else{
             alert("The account wasn't registered");
         }


             
              
        })

        this._shadowRoot.getElementById('redirect').addEventListener('click', ()=>{
            redirect('register')
        })
    }
    
    setError(id, message){
        this._shadowRoot.getElementById(id).setAttribute('error', message);

    }
    
    async existEmail(email,password) {
        const res = await firebase.firestore().collection('users').where('email', '==', email).where('password', '==', CryptoJS.MD5(password).toString(CryptoJS.enc.Hex)).get()
        console.log(res.empty);
        return res;

      }

}
window.customElements.define('login-screen', loginScreen)

