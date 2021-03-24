var axios = require('axios')
const { get } = require('https')


async function registrarse() {
    let nombre = document.getElementById('nombre').value;
    let apellido1 = document.getElementById('apellido1').value;
    let apellido2 = document.getElementById('apellido2').value;
    let email = document.getElementById('email').value;
    let username = document.getElementById('username').value;
    let passwd = document.getElementById('passwd').value;
    let rol = 5;

    console.log('REGISTRO');

    const config = {
        method: 'post',
        url: validarUsuariosUrl,
        data: {
            'username': username
        }
    }
    await axios(config).then(value => {
        console.log('REGISTRO00000000000000000000000');
        console.log(value.data);
        if (value.data.cantusers > 0) {

            alert('Usuario existente.');

        } else {
            alert('Nuevo usuario!');
        }
    }).catch(err => { console.log(err) })
}