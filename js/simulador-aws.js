/*

Simulador AWS Custo TI Tradicional VS Amazon AWS

Solid IT - Todos direitos reservados.

*/    
$(document).ready(function() {
    var dia = true;
    var contador = 0;
    var demanda = 0;
    var custo_ti = 0;
    var custo_aws = 0;
    

    // Controles Externos
    var base_random = 10;
    var investimento_ti = 125;
    var gordura_aws = 15;
    var tempo = 1000;

    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    var perShapeGradient = {
        x1: 0,
        y1: 0,
        x2: 1,
        y2: 0
    };

    // Insere github ribbons
    $('body').append("<div class='github'><a href='https://github.com/GlobalWebCorp/simulador-aws'><img src='img/forkme_left_orange_ff7600.png' alt='Fork me on GitHub'></a></div>");
    // Insere Cabecalho
    $('body').append("<div class='cabecalho'><div class='logo-global'></div><div class='titulo'>TI tradicional vs Amazon AWS</div><div class='logo-aws'></div></div>");
    // Insere avisos
    $('body').append("<div class='aviso1'></div><div class='aviso2'></div>");
    // Insere dia e noite
    $('body').append("<div class='dia'></div><div class='noite'></div>");
    $('body').append("<div class='simulador'>Simulador | TI: <button id='ti_aumenta'>+</button> <button id='ti_diminui'>-</button> <button id='reset_ti'>reset</button> - AWS <button id='aws_aumenta'>+</button> <button id='aws_diminui'>-</button> <button id='reset_aws'>reset</button> | <button id='longo_prazo'>Longo prazo</button></div>");
    $('body').append("<div id='container'></div>");
        
    var chart;
    $('#container').highcharts({
        chart: {
            type: 'areaspline',
            backgroundColor: '',
            animation: Highcharts.svg, 
            marginRight: 10,
            marginBottom: 90,
            events: {
                load: function() {
                    
                    var series1 = this.series[0];
                    var series2 = this.series[1];
                    var series3 = this.series[2];
                    
                    setInterval(function() {
                        if (contador > 4){
                            contador = 0;
                            if (dia == true){
                                dia = false
                            }else{
                                dia = true
                            }
                        } else { 
                            contador++
                        };
                        
                        if (dia == true){
                            base_random = 100
                            $(".dia").fadeIn("fade");
                            $(".noite").fadeOut("fade");
                        } else {
                            base_random = 10
                            $(".noite").fadeIn("fade");
                            $(".dia").fadeOut("fade");
                        };
                        var x = (new Date()).getTime(), // current time
                        y = Math.floor((Math.random()*base_random)+base_random);
                        

                        series1.addPoint([x, investimento_ti], false, true);
                        series2.addPoint([x, y+gordura_aws], false, true);
                        series3.addPoint([x, y], true, true);
                        


                        custo_ti = custo_ti + investimento_ti;
                        custo_aws = custo_aws + (y + gordura_aws);
                        
                        demanda = y;
                        if (demanda < investimento_ti) {
                            $(".aviso1").html("TI tradicional - Desperdiçando recursos.</br>Amazon AWS - Os recursos foram liberados").show("slow");
                            $(".aviso2").hide("slow");
                        } else {
                            $(".aviso1").hide("slow");
                            $(".aviso2").html("TI tradicional - Demandas não estão sendo atendidas.</br>Amazon AWS - Recursos alocados para atender a demanda.").show("slow");
                        };
                    
                    }, 2000);
                }
            }
        },
        title: {
            text: '',
            style: {
                color: '#FFF',
                font: '24px Arial narrow'
            }
        },
        xAxis: {
            labels:{
                style:{
                    fontSize: "11px",
                    color: '#FFF'
                },
                formatter: function(){
                    return 'TI: $'+custo_ti.toFixed(2)+'<br>'+
                           'AWS: $'+custo_aws.toFixed(2)+'<br>'+
                           'Ganho: $'+(custo_ti-custo_aws).toFixed(2)
                }
            },
            tickPixelInterval: 150
        },
        credits : {
            enabled : false
        },
        yAxis: {
            title: {
                text: 'Poder Computacional',
                style: {
                    color: '#FFF',
                    font: '20px Arial narrow'
                }
            },
            gridLineColor: '#2d2829',
            gridLineWidth: 10
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.series.name +'</b><br/>'+ Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>Capacidade:'+ Highcharts.numberFormat(this.y, 2) + ' Pontos';
            }
        },
        legend: {
            enabled: true,
            align: 'right',
            x: 0,
            y: 10,
            itemMarginTop: 5,
            itemMarginBottom: 0,
            itemStyle: {
                color: '#FFF',
                font: '17px Arial narrow'
            }
        },
        exporting: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5,
                animation : {
                    duration : 10
                }
            },
            series: {
                shadow : true,
                marker: {
                    enabled:false
                }
            }

        },

        colors : ['#7fc7ff','#FF9900','#FF0000'],
        series: [{
            name: 'TI Tradicional',
            data: (function() {
                var data = [],
                    time = (new Date()).getTime(),
                    i;
                for (i = -19; i <= 0; i++) {
                    data.push({
                        x: time + i * 1000,
                        y: 0
                    });
                }
                return data;
            })()
        },{
            name: 'AMAZON WEB SERVICES',
            data: (function() {
                var data = [],
                    time = (new Date()).getTime(),
                    i;
                for (i = -19; i <= 0; i++) {
                    data.push({
                        x: time + i * 1000,
                        y: 0
                    });
                }
                return data;
            })()
        },{
            name: 'Demanda',
            data: (function() {
                var data = [],
                    time = (new Date()).getTime(),
                    i;
                for (i = -19; i <= 0; i++) {
                    data.push({
                        x: time + i * 1000,
                        y: 0
                    });
                }    
                return data;
            })()
        }]
    });
    
    $('#ti_aumenta').click(function() {
        investimento_ti = investimento_ti + 10;
    });
    $('#ti_diminui').click(function() {
        investimento_ti = investimento_ti - 10;
     });


     $('#aws_aumenta').click(function() {
        gordura_aws = gordura_aws + 2;
     });
     $('#aws_diminui').click(function() {
        gordura_aws = gordura_aws - 2;
     });

     $('#reset_ti').click(function() {
        investimento_ti = 125;
     });
     $('#reset_aws').click(function() {
        gordura_aws = 15;
     });
     
     var prazo = true;
     $('#longo_prazo').click(function() {
        if (prazo ==true) { 
        longo_prazo = "<div id='longo_prazo'><iframe src='simulador-longo-prazo.htm'></iframe></div>";
        $('body').append(longo_prazo);
            prazo = false;
        } else {
            $('div#longo_prazo').remove();
            prazo = true
        }
     });
});