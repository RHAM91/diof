<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal">
            <div class="top_modal">
                <b-button type="button" variant="outline-danger" size="sm" @click="salir">Cerrar</b-button>
            </div>
            <b-container fluid>
                <form @submit.prevent="actualizar">
                    <b-row>
                        <b-col sm="12" class="mt-3">
                            <h1>
                                Editar
                            </h1>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label for="">Nombre</label>
                            <b-form-input type="text" size="sm" v-model="nombre" required></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label for="">Fecha de nacimiento</label>
                            <b-form-input type="date" size="sm" v-model="fecha_de_nacimiento" required></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label for="">Cargo</label>
                            <select class="form-control form-control-sm" v-model="cargo" required>
                                <option value="">Seleccionar</option>
                                <option value="sin_privilegio">Sin Privilegio</option>
                            </select>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label for="">Estado</label>
                            <select class="form-control form-control-sm" v-model="estado" required>
                                <option value="">Seleccionar</option>
                                <option value="1">Activo</option>
                                <option value="0">Inactivo</option>
                            </select>
                        </b-col>
                        <b-col sm="12" class="mt-3 d-flex flex-row-reverse">
                            <b-button type="submit" variant="primary" size="sm">Actualizar</b-button>
                        </b-col>
                    </b-row>
                </form>
            </b-container>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'ActualizarMiembro',
    props:['obj'],
    data() {
        return {
            nombre: '',
            fecha_de_nacimiento: '',
            cargo: '',
            estado: ''
        }
    },
    methods: {
        salir(){
            this.$emit('cerrar')
        },
        actualizar(){
            let f = {
                api: 'miembros',
                accion: 'actualizar',
                id: this.obj.dpi,
                data: {
                    nombre: this.nombre.toUpperCase().trim(),
                    fecha_de_nacimiento: this.fecha_de_nacimiento,
                    cargo: this.cargo,
                    activo: this.estado
                }
            }

            this.actualizarDatos(f)
            this.salir()
        },
        ...mapActions(['actualizarDatos'])
    },
    mounted() {
        this.nombre = this.obj.nombre
        this.fecha_de_nacimiento = this.obj.fecha_de_nacimiento
        this.cargo = this.obj.cargo
        this.estado = this.obj.activo
    },
}
</script>

<style>
    .contenedor_modal{
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
    }
        .cuerpo_modal{
            width: 500px;
            height: 550px;
            background-color: white;
            border-radius: 4px;
        }

            .top_modal{
                width: 100%;
                height: 35px;
                border-bottom: 1px solid #e9e9e9;
                display: flex;
                flex-direction: row-reverse;
                align-items: center;
                padding-right: 5px;
            }
</style>