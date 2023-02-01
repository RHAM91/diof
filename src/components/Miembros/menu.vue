<template>
    <div class="cuerpo_sub_menu">
        <div class="sub_menu">
            <div class="titulo__">
                Miembros
            </div>

            <div class="btn_sub_menu">
                <div class="icono_sub_menu">
                    <i class="fas fa-feather-alt"></i>
                </div>

                <div class="titulo_sub_menu">
                    Formulario
                </div>
            </div>
        </div>

        <div class="area">
            <Formulario />
        </div>
    </div>
</template>

<script>

import Formulario from './Formulario/Formulario.vue'

export default {
    name: 'MenuMiembros',
    components:{
        Formulario
    },
    data() {
        return {
            
        }
    },
    methods: {
        
    },
}
</script>

<style>

</style>