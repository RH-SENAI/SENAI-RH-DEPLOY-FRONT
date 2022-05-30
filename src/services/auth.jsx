export const usuarioAutenticado = () => localStorage.getItem('usuario-login') !== null;

export const parseJwt = () => {
    let base64 = localStorage.getItem('usuario-login').split('.')[1];

    console.log('nada'+base64)
    return JSON.parse(window.atob(base64));
}

export function logOut() {
    localStorage.removeItem('usuario-login')
}