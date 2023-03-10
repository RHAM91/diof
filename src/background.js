'use strict'

import { app, protocol, BrowserWindow, ipcMain, dialog } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { autoUpdater } from 'electron-updater'
import fs from 'fs'
import { dbs } from './functions/c'
import { login } from './functions/autenticacion'
const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require('path')
const sha1 = require('sha1')
const miembros = require('./functions/miembros.controller')


let win
let actualizacion
let ruta_carpeta_dbs = path.join(app.getPath('documents'), '/dbs') // home -> .dbs
let ruta_db = path.join(app.getPath('documents'), '/dbs/diof.db') // home -> .dbs


// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])


function CREAR_ARCHIVO_DB(){

  fs.open(ruta_db, 'wx', (err, fd) =>{
    if(err){
      console.log('HUBO UN ERROR AL CREAR LA DB')
    }else{
      fs.close(fd,(err) =>{
        if(err){
          console.error(err)
        }
      })
    }
  })

    const dialogOpts = {
      type: 'info',
      buttons: ['Ok'],
      title: 'Notificación',
      message: `Reinicio de app necesario`,
      detail: 'Es necesario reiniciar la app para completar la configuración'
    }

    dialog.showMessageBox(dialogOpts).then(({ response }) => {
      if (response === 0) {
        app.relaunch()
        app.quit()
      }
    })

}



//-> VERIFICANDO SI EXISTE BASE DE DATOS, CASO CONTRARIO SE CREARÁ

fs.stat(ruta_carpeta_dbs, (err, folderStat)=>{
  if(err){
    if(err.code === 'ENOENT'){

      console.log('[*] CARPETA NO EXISTE, CREANDOLA...')

      fs.mkdir(ruta_carpeta_dbs, {recursive: true}, (err)=>{
        if(err){
          if(err.code === 'EEXIST'){
            console.log('[x] LA CARPETA YA EXISTE')
          }else{
            console.error(err)
          }
        }else{
          console.log('[+] CARPETA CREADA CON ÉXITO!')

          CREAR_ARCHIVO_DB()

        }
      })

    }else{
      console.error(err)
    }
  }else{
    if(folderStat.isDirectory()){
      console.log('[*] LA CARPETA SI EXISTE')

      fs.stat(ruta_db, (err, fileStat) =>{
        if(err){
          if(err.code === 'ENOENT'){
            console.log('[x] EL ARCHIVO db NO EXISTE')

            CREAR_ARCHIVO_DB()

          }else{
            console.error(err)
          }
        }else{
          if(fileStat.isFile()){
            console.log('[*] EL ARCHIVO db SI EXISTE')
            
              // --> TABLA PARA USUARIOS

              dbs.run(`
                    CREATE TABLE IF NOT EXISTS usuarios (
                      id        INTEGER       PRIMARY KEY AUTOINCREMENT,
                      nombre    VARCHAR (100),
                      apellidos VARCHAR (100),
                      usuario   VARCHAR (50),
                      pass      TEXT,
                      genero    VARCHAR (1),
                      tipo      VARCHAR (50),
                      foto      TEXT,
                      bloqueo   INTEGER (1)   DEFAULT (0),
                      sistema   VARCHAR (50) 
                  )
              `);
              
              // --> TABLA PARA SESIONES
            
              dbs.run(`
                  CREATE TABLE IF NOT EXISTS sesiones (
                    id         INTEGER      PRIMARY KEY AUTOINCREMENT,
                    token      TEXT,
                    id_usuario VARCHAR (50),
                    nombre     VARCHAR (60),
                    exp        DATE
                )
              `)

              dbs.run(`
                  CREATE TABLE IF NOT EXISTS miembros (
                    id                  INTEGER       PRIMARY KEY AUTOINCREMENT,
                    nombre              TEXT,
                    dpi                 VARCHAR (100),
                    fecha_de_nacimiento DATE,
                    cargo               INTEGER,
                    sistema             VARCHAR (50) 
                )
              `)
          

          }else{
            console.log('El archivo db no es un archivo')
          }
        }
      })
    }else{
      console.log('el archivo db no es una carpeta')
    }
  }
})



function buscarActualizacion(){
  //console.log('buscando....')
  autoUpdater.checkForUpdates()
  autoUpdater.on('update-downloaded', () => {

    setTimeout(()=>{ // ESPERA 10 SEGUNDOS PARA ENVIAR EL MENSAJE DE QUE DEBE SER ACTUALIZADA LA APP
      win.webContents.send('actualizacion_disponible', true)
      //window.api.send('actualizacion_disponible', true)
    }, 10000)

    clearInterval(actualizacion) // al momento de descargar la actualizacion detiene el ciclo de busqueda

  })
}

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1500, //825
    height: 800,
    center: true,
    autoHideMenuBar: true,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  //actualizacion = setInterval(buscarActualizacion, 10 * 60 * 1000) // para cambiar el tiempo del intervalo en minutos, modificar solo el primer 60
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// --> EVENTO PARA BUSCAR Y MOSTRAR ACTUALIZACION

ipcMain.on('get/version', (event, args) =>{
  event.sender.send('version_app', {version: app.getVersion()})
  buscarActualizacion()
})


// --> EVENTOS 

ipcMain.on('login', async (event, args) =>{
  let r = await login(args)

  event.sender.send('login/res', r)
  
})


ipcMain.handle('miembros', async(event, args)=>{

  switch (args.accion) {
    case 'registro':
      let r = miembros.registro(args.data)
      return r
    case 'listar':
      let l = await miembros.buscar(args.data)
      return l
    case 'actualizar':
      let a = await miembros.actualizar(args)
      return a
    case 'borrar':
      let b = await miembros.borrar(args.data)
      return b
    default:
      break;
  }

})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
