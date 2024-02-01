const firebaseConfig = {
    apiKey: "AIzaSyDRel7htSDU9LLs_PZAg_HicKWZEHzlgP0",
    authDomain: "proyecto-datos-formularios.firebaseapp.com",
    projectId: "proyecto-datos-formularios",
    storageBucket: "proyecto-datos-formularios.appspot.com",
    messagingSenderId: "589236940976",
    appId: "1:589236940976:web:c080316233afee8ea14b75",
    measurementId: "G-V1354562KR"
};


firebase.initializeApp(firebaseConfig);



const db = firebase.firestore();




document.getElementById('formulario').addEventListener('submit', (event) =>{
    event.preventDefault()


    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if(entradaNombre.value.trim() === ''){
        errorNombre.textContent = 'Por favor, introduce tu nombre'
        errorNombre.classList.add('error-message')
    }else{
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }


    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if(!emailPattern.test(emailEntrada.value)){
        emailError.textContent = 'Por favor, introduce un mail valido'
        emailError.classList.add('error-message')
    }else{
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }

    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById('passwordError')
    if(contrasenaEntrada.value.length < 8){
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres'
        contrasenaError.classList.add('error-message')
    }else{
        contrasenaError.textContent = ''
        contrasenaError.classList.remove('error-message')
    }

    if(!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent){


        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            alert('El formulario se ha enviado con éxito', docRef.id)
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert(error)
        });

       
        alert('El formulario se ha enviado con exito')
        document.getElementById('formulario').reset();
    }
})