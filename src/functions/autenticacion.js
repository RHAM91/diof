import sha1 from 'sha1'
import { leer__ } from './c'

let login = async function(obj){

    let arg_usuario = []
    arg_usuario.push(obj.usuario)

    let usuario = await leer__(`select usuario, pass, bloqueo from usuarios where usuario = ?`, arg_usuario)
    
    if (usuario.length == 0) {
        return {message: 'EL USUARIO NO EXISTE'}
    }else{
        
        if(usuario[0].bloqueo != 0){
            return {message: 'USUARIO BLOQUEADO'}
        }else{
            
            if(sha1(obj.pass) === usuario[0].pass){
                return true
            }else{
                return {message: 'CONTRASEÑA NO ES CORRECTA'}
            }

        }
    }

}


export {
    login
}