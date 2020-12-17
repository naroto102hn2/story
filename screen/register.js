//import {getDataFromDocs} from './utils.js'
import {redirect} from '../index.js'
const style = `
    .register-container {
        width: 100vw;
        height: 100vh;
        background: url('https://www.crushpixel.com/big-static13/preview4/blue-technology-circle-computer-abstract-1217830.jpg');
        background-repeat: no-repeat;
        background-size: cover; 
        display: flex;
        justify-content: flex-end;
    }
    #register-form{
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




class RegisterScreen extends HTMLElement{
    constructor(){
        super()
        this._shadowRoot = this.attachShadow({mode: 'open'})
    }
    connectedCallback(){
        this._shadowRoot.innerHTML=`
        <style>${style}</style>
        <div class="register-container">
            <form id="register-form">
                <h1>CI PROJECT</h1>
                <input-wrapper id="first-name" type="text" placeholder="First name"></input-wrapper>
                <input-wrapper id="last-name" type="text" placeholder="Last name"></input-wrapper>
                <input-wrapper id="email" type="text" placeholder="Email"></input-wrapper>
                <input-wrapper id="password" type="password" placeholder="Password"></input-wrapper>
                <input-wrapper id="confirm-password" type="password" placeholder="Confirm password"></input-wrapper>
                <button>Register</button>
                <a id="redirect" style="cursor:pointer;color: blue"> Already have an account ? Login</a>
            </form>
        </div>
        `
        const registerForm = this._shadowRoot.getElementById('register-form')
        registerForm.addEventListener('submit', async (e)=>{
            e.preventDefault()
            const firstName = this._shadowRoot.getElementById('first-name').value;
            const lastName = this._shadowRoot.getElementById('last-name').value;
            const email = this._shadowRoot.getElementById('email').value;
            const password = this._shadowRoot.getElementById('password').value;
            const confirmPassword = this._shadowRoot.getElementById('confirm-password').value;
            const firebaseData = firebase.firestore().collection('users');
            let k = 0;
            if(firstName.trim()===''){
                k=1
                this.setError('first-name', 'Please input first name');

            }
            if(lastName.trim()===''){
                k=1
                this.setError('last-name', 'Please input the last name');

            }
            if(email.trim()===''){
                k=1
                this.setError('email', 'Please input email');
            }
            if(password.trim()===''){
                k=1
                this.setError('password', 'Please input password');
            }
            if(confirmPassword.trim()===''){
                k=1
                this.setError('confirm-password', 'Please input confirm password');
            }
            if(password!=confirmPassword){
                k=1
                alert("Please check your password, it doesn't match with confirm password");
                return;
            }
            // if(firebaseData.includes(email)){
            //     alert("Email already exist");
            //     return;
            // }
            if(k==1){
                return;
            }
            else if(password.length<6){
                 k=1
                alert("Your password must > 6 characters or numbers");
                return;
            }
            else if(IsInvalidEmail(email)==0){
                k=1
                alert("Email Invalid");
                return;
            }
            
            // if(existEmail(email)==0){
            //     alert("Email exist");
            //     return;
            // }
            const newUser = {
                name: `${firstName} ${lastName}`,
                email: email,
                password: CryptoJS.MD5(password).toString(CryptoJS.enc.Hex),
              }
         const check = await this.existEmail(email)
         //neu email da ton tai tra ra true, k thi false
         if(check){
             alert("Email has already registered");
         }else{
             firebaseData.add(newUser);
             alert("Register Successful")
             redirect('login');
         }


             
              
        })

        this._shadowRoot.getElementById('redirect').addEventListener('click', ()=>{
            redirect('login')
        })
    }
    
    setError(id, message){
        this._shadowRoot.getElementById(id).setAttribute('error', message);

    }
    
    async existEmail(email) {
        // var usersRef = new Firebase(EMAIL_LOCATION);
        // usersRef.child(myEmail).once('value', function(snapshot) {
        //   var exists = (snapshot.val() !== null);
        //   if (exists) {
        //     return false;
        //   } else {
        //     return true;
        //   }
        // });
        const res = await firebase.firestore().collection('users').where('email', '==', email).get()
        return !res.empty
      }

}
window.customElements.define('register-screen', RegisterScreen)

