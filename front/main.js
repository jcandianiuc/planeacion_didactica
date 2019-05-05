"use strict";
var main = function() {
    let self = this;
    var objTemplates = {};
    var tk = '';
    var consulta = [];
    var tabla = [];

    this.iniciaTemplate = function() {
        su.rest.cargaTemplate ({
            link: 'template/planeacion.hbs',
            callback: function(template, err) {
                if (err) {
                    console.error('Template no se cargo');
                    return;
                }
                objTemplates = template;
                $('#boxTablaDatos').html(objTemplates.contenedorTablas);
            }
        });
    };

    this.init = function(obj) {
        tk = obj.token;
        self.iniciaTemplate();
        self.obtenerConfiguracion().then(data => {
            consulta = data;
            self.procesaConsulta(consulta);
            self.construyeTabla(tabla);
        })
    };

    this.procesaConsulta = function(consulta) {
        consulta.forEach(function(fila) {
            var datos = {};
            Object.keys(fila).forEach(function(elemento) {
                var key = self.eliminarDiacriticos(elemento);
                if (elemento != 'token') datos[key] = fila[elemento];
            })
            tabla.push(datos);
        })
    };

    this.eliminarDiacriticos = function(texto) {
        texto = texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
        var g = /#/g;
        var e = / /g;
        texto = texto.replace(g,'');
        texto = texto.replace(e,'');
        return texto;
    };

    this.construyeTabla = function(datos) {
        su.ui.construyeTabla({
            destino: '#tabla',
            id:'tbTabla',
            tHead: objTemplates.head,
            tBody: objTemplates.body,
            datos: datos,
        });

        $(document).ready( function () {
            $('#tbTabla').DataTable(
                {
                    "language": {
                        "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
                    }
                });
        } );
    };

    this.obtenerConfiguracion = function() {
        return Promise.resolve($.ajax({
            url: "http://localhost:3000/planeacion?token=" + tk, 
            type: "GET",
        }));
    };

    this.obtenerParametro = function(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    Handlebars.registerHelper('hlpIndex', function(index) {
        index ++;
        return new Handlebars.SafeString(index);
    });

}