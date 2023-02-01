<template>
    <b-container fluid="">
        <b-row>
            <b-col sm="12" class="mt-2">
                <h2>
                    Formulario
                </h2>
            </b-col>

            <b-col sm="12" class="mt-1">
                <b-tabs content-class="mt-3" style="font-size: 14px;">
                    <b-tab title="Lista" active @click="setear_tab('lista')"></b-tab>
                    <b-tab title="Registro" @click="setear_tab('registro')"></b-tab>
                    <!-- <b-tab title="Second"><p>I'm the second tab</p></b-tab> -->
                </b-tabs>
            </b-col>
            <b-col sm="12" class="mt-1">
                <Registro v-if="set_tab == 'registro'" />
                <Lista v-if="set_tab == 'lista'" />
            </b-col>
            
        </b-row>
    </b-container>
</template>

<script>

import Registro from './Registro.vue'
import Lista from './Lista.vue'

export default {
    name: 'Formulario',
    components:{
        Registro,
        Lista
    },
    data() {
        return {
            set_tab: 'registro'    
        }
    },
    methods: {
        setear_tab(tab){
            this.set_tab = tab
        }
    },
}
</script>

<style>

</style>