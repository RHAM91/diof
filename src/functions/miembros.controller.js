import { insertar__, leer__, ejecutar__ } from "./c"

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

let actualizar = async (data) =>{

    let { id } = data

    let q = await ejecutar__(`
                                update miembros 
                                set 
                                    nombre = ?, 
                                    fecha_de_nacimiento = ?,
                                    cargo = ?, 
                                    activo = ? 
                                where 
                                    dpi = ?`, [data.data.nombre, data.data.fecha_de_nacimiento, data.data.cargo, data.data.activo, id])
    
    if (q == 'SE HA EJECUTADO CONSULTA CORRECTAMENTE') {
        return {message: 'ACTUALIZADO :)'}
    }else{
        return {message: 'OCURRIÓ UN PROBLEMA'}
    }

}

let borrar = async(data) =>{

    let r = await ejecutar__(`delete from miembros where dpi = ?`, [data.dpi])

    return {message: 'BORRADO'}

}


export {
    registro,
    buscar,
    actualizar,
    borrar
}