import { insertar__, leer__ } from "./c"

let registro = (data)=>{
    let f = {
        tabla: 'miembros',
        datos: data
    }
    f.datos.activo = 1
    f.datos.sistema = 'diof' // SE AGREGA EL REGISTRO DE SISTEMA DESDE EL "BACK"

    let x = insertar__(f)
    return x
}

let buscar = async (data) =>{
    let arg = [ `%${data.buscar}%`, 1]
    
    let r = await leer__(`select * from miembros where nombre like ? and activo = ?`, arg)
    return r
}

export {
    registro,
    buscar
}