function CerrarSesion() {
    sessionStorage.removeItem('email');
    window.location = '/Frontend/index.html';
}