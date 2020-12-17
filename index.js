import './screen/register.js'
import './components/inputWrapper.js'
import './components/header.js'
import './components/creatPost.js'
import './screen/login.js'
import {getItemToLocalStorage} from './utils.js'
import './screen/story.js'
import './components/postItem.js'
import './components/listPost.js'

//redirect('register')

checkAuthen()
async function checkAuthen() {
    const user = getItemToLocalStorage('currentUser')
    if (user) {
        const res = await firebase.firestore()
        .collection('users')
        .where('email', '==', user.email)
        .where('password', '==', user.password)
        .get()
        if(res.empty){
            redirect('login')
        }else{
            redirect('story')
        }
    }else{
        redirect('login')
    }
}


export function redirect(screenName) {
    if(screenName === 'register'){
        document.getElementById('app').innerHTML = `
        <register-screen></register-screen>
        `
    }else if(screenName==='login'){
        document.getElementById('app').innerHTML=`
        <login-screen></login-screen>
        `
    }else if(screenName==='story'){
        document.getElementById('app').innerHTML=`
        <story-screen></story-screen>
        `
    }
}



// document.getElementById('app').innerHTML = `
//        <register-screen></register-screen>
//        `