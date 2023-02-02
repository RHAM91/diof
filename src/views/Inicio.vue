<template>
    <div class="contenedor_inicio">
        <div class="top_verde">
            
        </div>
        <div class="body_">
            <div class="menu_">
                <div class="btn_menu" @click="set_modulo('miembros')">
                    <i class="fas fa-users"></i>
                </div>

                 <div class="btn_menu logout" @click="cerrar_sesion">
                    <i class="fas fa-sign-out-alt"></i>
                </div>
            </div>

            <Miembros v-if="modulo == 'miembros'" />

        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

import Miembros from '../components/Miembros/menu.vue'

export default {
    name: 'Inicio',
    components:{
        Miembros
    },
    data() {
        return {
            modulo: 'miembros'
        }
    },
    methods: {
        set_modulo(modulo){
            this.modulo = modulo
        },
        cerrar_sesion(){
            this.set_auth(false)
            this.$router.replace('Login')
        },
        ...mapMutations(['set_auth'])
    },
}
</script>

<style>
    .contenedor_inicio{
        width: 100%;
        height: 100vh;
        border: 1px solid black;
    }
        .top_verde{
            background-color: #49C466;
            width: 100%;
            height: 35px;
            border-bottom: 1px solid #2ab74a;
        }
        .body_{
            width: 100%;
            height: calc(100% - 35px);
            display: flex;
        }
            .menu_{
                width: 45px;
                height: 100%;
                background-color: #23232c;
                /* display: flex;
                justify-content: center; */
                padding-top: 8px;
            }
                .btn_menu{
                    width: 35px;
                    height: 35px;
                    
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: white;
                    border-radius: 4px;
                    transition: .4s ease;
                    cursor: pointer;
                    margin: auto;
                }
                    .btn_menu:hover{
                        background-color: white;
                        color: black;
                    }

                .logout{
                    background-color: orangered;
                    position: absolute;
                    bottom: 7px;
                    left: 6px;
                }

                .sub_menu{
                    width: 150px;
                    height: 100%;
                    border: 1px solid #e9e9e9;
                }
        .titulo__{
            width: 100%;
            height: 30px;
            border-bottom: 1px solid #e9e9e9;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 10px;
        }
        
        .btn_sub_menu{
            user-select: none;
            height: 30px;
            border-radius: 4px;
            display: flex;
            transition: .4s ease;
            cursor: pointer;
        }

            .btn_sub_menu:hover{
                background-color: #e9e9e9;
            }

            .icono_sub_menu{
                width: 30px;
                height: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 5px;
            }

            .titulo_sub_menu{
                width: calc(100% - 35px);
                font-size: 13px;
                display: flex;
                align-items: center;
            }

            .cuerpo_sub_menu{
                width: calc(100% - 45px);
                height: 100%;
                display: flex;
            }

                .area{
                    width: calc(100% - 150px);
                    height: 100%;
                }
</style>