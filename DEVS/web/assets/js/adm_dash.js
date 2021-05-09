/**************************** CHIFFRE D'AFFAIRE ****************************/
var ca=null;
for (i=0; i<admOrder_commandes.length; i++)	{
    ca += admOrder_commandes[i]["tarif"] ;
}
document.getElementById("ca").innerHTML=ca;


/**************************** NOMBRE DE CLIENTS ****************************/

var nombreclients=aOfPersonnes.length;
document.getElementById("nombreclients").innerHTML=nombreclients;


/**************************** HISTOGRAMME NOUVEAUX CLIENTS ****************************/

function une(){
    var i=moment().format('MM');
    var aNewClients=[];
    for( i=moment().format('MM'); i > (moment().format('MM')-moment().format('MM'));i--)
    {
        aNewClients[i]=0; 
        for(var j = 0; j < aOfPersonnes.length; j++)
        {
            if(moment(aOfPersonnes[j]["Date"],'DD/MM/YYYY').format('MM')==i)
            {
                aNewClients[i]++;
            }
        }
        console.log(moment(i, 'MM').format('MMM') + " " + aNewClients[i]);
    }
}

var a= moment([2017, 0, 29]);
var b= moment([2019, 10, 29]);
var duration = b.diff(a, 'months');
console.log(duration);


var ctz = document.getElementById('myclientChart');
var myclientChart = new Chart(ctz, {
    type: 'line',
    data: {
        datasets: [{
            label: 'Nombre de clients',
            data: [{x:"2019-08",y:3},{x:"2019-09",y:12},{x:"2019-10",y:8},{x:"2019-11",y:14}],
            borderWidth: 1,
            borderColor : [
                'rgba(255, 99, 132)',
            ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.4)',
            ],
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type:'time',
            }],
            yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
            }]
        }
    }
});


/**************************** EVOLUTION PANIER MOYEN ****************************/
var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
        datasets: [{
            label: 'Panier moyen en €',
            data: [12, 23, 13, 15, 13.5, 12],
            backgroundColor: [
            'rgba(255, 99, 132, 0.4)',
            ],
            borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',

            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});


/**************************** CAMEMBERT REPARTITION DES VENTES ****************************/
var cty = document.getElementById('mypieChart');
var myPieChart = new Chart(cty, {
    type: 'pie',
    data: {
        labels: ['3 Kg', '6 Kg', '9 Kg'],
        datasets: [{
            data: [12, 19, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.45)',
                'rgba(54, 162, 235, 0.45)',
                'rgba(255, 206, 86, 0.45)',

            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 0.5
        }]
    },
});