import { app } from 'electron'
const sql = require('sqlite3').verbose()
const path = require('path')


let ruta_db = path.join(app.getPath('documents'), '/dbs/diof.db') // home -> .dbs

const test = (valor) =>{
    return valor
}

let dbs = new sql.Database(ruta_db, sql.OPEN_READWRITE, (err) =>{
    if (err && err.code == 'SQLITE_CANTOPEN') {
      console.log('NO SE PUEDE ABRIR DB')
      return
    }else if(err){
      console.log("GETTING ERROR " + err)
      exit(1)
    }
  })


function insertar__(obj){
    let objkeys = Object.keys(obj.datos)
    let objstring = objkeys.toString()

    let numele = objkeys.length
    let cadena__ = "?, "
    let interrogaciones = cadena__.repeat(numele).slice(0, -2)
    let valores__ = Object.values(obj.datos)

    dbs.run(`insert into ${obj.tabla}(${objstring}) values(${interrogaciones})`, valores__)

    return {message: 'REGISTRO CORRECTO!'}

    //dbs.close()
}


let leer__ = (consulta, args) =>{
    return new Promise((resolve, reject) =>{
      if(consulta == '' || consulta == null || consulta == undefined){
        reject('Debes escribir una consulta')
      }else{
        dbs.all(consulta, args , (err, rows) =>{
          if(err) return reject(err)
          resolve(rows)
          //dbs.close()
        })
      }
    })
  }


  let ejecutar__ = (sql) =>{
    return new Promise((resolve, reject) =>{
      if(sql == '' || sql == null || sql == undefined){
        reject('Debes escribir una sql')
      }else{
        dbs.run(sql)
        
        resolve('SE HA EJECUTADO CONSULTA CORRECTAMENTE')
        
        //dbs.close()
      }
    })
  }
  

export {
    test,
    dbs,
    insertar__,
    leer__,
    ejecutar__
}