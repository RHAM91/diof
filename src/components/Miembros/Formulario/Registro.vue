<template>
    <b-container fluid="">
        <form @submit.prevent="guardar_">
            <b-row>
                <b-col sm="12" >
                    <label for="">Nombre</label>
                    <b-form-input type="text" v-model="nombre" size="sm"></b-form-input>
                </b-col>
                
                <b-col sm="6" class="mt-2">
                    <label for="">DPI</label>
                    <b-form-input type="number" v-model="dpi" size="sm"></b-form-input>
                </b-col>

                <b-col sm="6" class="mt-2">
                    <label for="">Fecha nacimiento</label>
                    <b-form-input type="date" v-model="fecha_nacimiento" size="sm"></b-form-input>
                </b-col>

                <b-col sm="12" class="mt-2">
                    <label for="">Cargo</label>
                    <select class="form-control form-control-sm" v-model="cargo">
                        <option value="">Seleccionar</option>
                        <option value="sin_privilegio">Sin Privilegio</option>
                    </select>
                </b-col>
                
                <b-col sm="12" class="mt-2 d-flex flex-row-reverse">
                    <b-button type="submit" variant="success" size="sm">Guardar</b-button>
                </b-col>
            </b-row>
        </form>
    </b-container>
</template>

<script>

import { mapActions } from 'vuex'

export default {
    name: 'Registro',
    data() {
        return {
            nombre: 'Romario',
            dpi: '2060995330101',
            fecha_nacimiento: '1991-05-01',
            cargo: 'sin_privilegio'
        }
    },
    methods: {
        guardar_(){

            let f = {
                api: 'miembros',
                accion: 'registro',
                data:{
                    nombre: this.nombre,
                    dpi: this.dpi.trim(),
                    fecha_de_nacimiento: this.fecha_nacimiento,
                    cargo: this.cargo
                }
            }

            this.guardarData(f)
        },
        ...mapActions(['guardarData'])
    },
}
</script>

<style>

</style>