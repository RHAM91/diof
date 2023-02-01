<template>
    <b-container fluid="">
        <b-row>
            <b-col sm="10">
                <label for="">Buscar</label>
                <b-form-input type="text" size="sm" v-model="campo_buscar"></b-form-input>
            </b-col>
            <b-col sm="2">
                <b-button type="button" variant="info" style="margin-top: 32px;" block size="sm" @click="buscar">Buscar</b-button>
            </b-col>

            <b-col sm="12" class="mt-2">
                <table class="table table-sm table-striped table-bordered" style="font-size: 10px;">
                    <thead>
                        <tr>
                            <th style="width: 15%;">
                                DPI
                            </th>
                            <th style="width: 60%;">
                                Nombre
                            </th>
                            <th style="width: 15%;">
                                Cargo
                            </th>
                            <th style="width: 10%;text-align: center;">
                                ...
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>

                            </td>
                            <td>

                            </td>
                            <td>

                            </td>
                            <td style="text-align: center;">

                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'ListaMiembros',
    data() {
        return {
            campo_buscar: '',
            resultados: []
        }
    },
    methods: {
        async buscar(){
            let f = {
                api: 'miembros',
                accion: 'listar',
                data: {
                    buscar: this.campo_buscar.trim()
                }
            }

            let r = await this.obtenerData(f)
            console.log(r)
        },
        ...mapActions(['obtenerData'])
    },
}
</script>

<style>

</style>