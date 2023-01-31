<template>
    <div class="contenedor_login">
        <div class="formulario_">
            <b-container fluid="">
                <form @submit.prevent="login">
                    <b-row>
                        <b-col sm="12" class="mt-5">
                            <label for="">Usuario</label>
                            <b-form-input type="text" v-model="usuario" size="sm" required></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label for="">Contraseña</label>
                            <b-form-input type="password" v-model="pass" size="sm" required></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-4">
                            <b-button type="submit" variant="info" block size="sm">Iniciar sesión</b-button>
                        </b-col>
                    </b-row>
                </form>
            </b-container>
        </div>
    </div>
</template>

<script>

import { ipcRenderer } from 'electron'
import { mapMutations } from 'vuex'

export default {
    name: 'Login',
    data() {
        return {
            usuario: '',
            pass: ''
        }
    },
    methods: {
        login(){
            let f = {
                usuario: this.usuario.toLowerCase().trim(),
                pass: this.pass.toLowerCase().trim()
            }

            ipcRenderer.send('login', f)
            ipcRenderer.on('login/res', (event, arg) =>{
                ipcRenderer.removeAllListeners('login/res')
                
                if(arg == true){
                    this.set_auth(true)
                    this.$router.replace('inicio')
                }else{
                    console.log(arg)
                }

            })
        },
        ...mapMutations(['set_auth'])
    },
}
</script>

<style>
    .contenedor_login{
        width: 100%;
        height: 100vh;
        background-color: #6CD4FF;
        display: flex;
        justify-content: center;
        align-items: center;
    }
        .formulario_{
            width: 300px;
            height: 350px;
            border-radius: 4px;
            background-color: white;
        }
</style>