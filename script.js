// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBFAzmoAPFyC6F8KX7i3GVOQTyt3FUx020",
    authDomain: "test-8cee9.firebaseapp.com",
    databaseURL: "https://test-8cee9-default-rtdb.firebaseio.com",
    projectId: "test-8cee9",
    storageBucket: "test-8cee9.appspot.com",
    messagingSenderId: "948419772366",
    appId: "1:948419772366:web:1f2d00b6a6947a8654759f",
    measurementId: "G-HH00QTEQP9"
};
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const collection = db.collection('Users');
const accSubmitBtn = document.querySelector('#submit-btn');
let signed_in = false
const pinSubmitBtn = document.querySelector('#pin-btn')
const accContainer = document.querySelector('#acc-container');
const pinContainer = document.querySelector('#pin-container');
const depositBtn = document.querySelector('#deposit-am-btn')
let userdoc = ""
async function getAccNumber(accNumber) {
    let isvalidaccc = false
    await collection.where("acccountnumber", "==", accNumber).get().then(
        data => {
            data.forEach(
                doc => {
                    if (doc) {
                        console.log(data)
                        isvalidaccc = true;
                    }
                }
            )
        }
    )
    return (isvalidaccc)
}
async function getPinNumber(accNumber, PIN) {
    let isvalidaccc = false
    await collection
        .where("acccountnumber", "==", accNumber)
        .where("pin", "==", PIN).get()
        .then(data => {
            console.log(data);
            data.forEach(doc => {
                console.log('hello');
                if (doc) {
                    isvalidaccc = true;
                    userdoc = doc.id
                }
            }   
            )
        })
    return isvalidaccc;
}
accSubmitBtn.addEventListener('click', () => {
    const accNumber = document.querySelector('#acc-num').value;
    if (getAccNumber(accNumber)) {
        accContainer.style.display = "none";
        pinContainer.style.display = "block";
        console.log('Correct Account');
        pinSubmitBtn.addEventListener('click', () => {
            const pinNumber = document.querySelector('#user-pass').value;
            if (getPinNumber(accNumber, pinNumber)) {
                signed_in = true;
                console.log('Welcome');
            }
            else {
                alert('PLEAZE CHECK YOUR CARD NUMBER')
            }
        })

    }
});
function deposit(amount) {
    if (signed_in) {
        collection.doc(userdoc).set().then(docs => {
                docs.forEach(doc => {

                })
            })
    }
}

depositBtn.addEventListener('click' , () => {
    const depoAmount = document.querySelector('#dep-am').value;
    deposit(depoAmount);
})