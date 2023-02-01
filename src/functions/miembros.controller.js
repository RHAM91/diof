import { insertar__ } from "./c"

let registro = (data)=>{
    let f = {
        tabla: 'miembros',
        datos: data
    }
    f.datos.sistema = 'diof' // SE AGREGA EL REGISTRO DE SISTEMA DESDE EL "BACK"

    let x = insertar__(f)
    return x
}


export {
    registro
}