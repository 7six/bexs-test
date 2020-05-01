/*BOX CARREGANDO*/
function boxCarregando() {
    $("#modal_carregando").removeClass("hide")
}
function closeBoxCarregando() {
    $("#modal_carregando").addClass("hide")
}

$(document).ready(function () {

    var dates = $("#cotacao-data-inicio, #cotacao-data-termino").datepicker({
        dateFormat: 'dd/mm/yy',
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
        dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        defaultDate: "+1d",
        minDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        onSelect: function (selectedDate) {
            if (this.id == "cotacao-data-inicio") {
                var partes = $(this).val().split("/");
                var instance = $(this).data("datepicker");
                var date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
                dates.not(this).datepicker("option", "minDate", date);
                dates.not(this).datepicker("option", "maxDate", partes[0] + "/" + partes[1] + "/" + (parseInt(partes[2]) + 1));
            }
        }
    });

    $("#cotacao-data-inicio, #cotacao-data-termino").on('focus', function (event) {
        $("#ui-datepicker-div").offset({top: $(this).offset().top + 46});
    });

    $("#form-cotacao").validate({
        errorPlacement: function (error, e) {
            $(e).parents('.campo-validacao').append(error);
        },
        rules: {
            destino_grupo_id: {required: true},
            data_inicio: {required: true},
            data_final: {required: true},
            // nome: {required: true},
            // telefone: {
            //     required: true,
            //     minlength: 13
            // },
            // email: {
            //     required: true,
            //     email: true
            // },
        },
        messages: {
            destino_grupo_id: {required: 'Selecione seu destino'},
            data_inicio: {required: 'Obrigatório'},
            data_final: {required: 'Obrigatório'},
            // nome: {required: 'Preencha seu nome'},
            // telefone: {required: 'Preencha seu telefone', minlength: "Telefone completo."},
            // email: {required: 'Preencha seu email', email: 'Email inválido!'},
        }
    });

    $("#form-cotacao").on('submit', function () {
        if ($("#form-cotacao").valid()) {
            boxCarregando();
        }
    });
});