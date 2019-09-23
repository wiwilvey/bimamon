$(document).ready( function(){
    var authcode = localStorage.getItem('nig');
    if( authcode == null || authcode == ""){
        window.location="login.html";
    }
    $("#menuSPP").click( function(){
        window.location='dataSpp.html';
    })

    $("#menuDU").click( function(){
        window.location='dataDu.html';
    })

    $("#menuSpend").click( function(){
        window.location='dataPengeluaran.html';
    })

    $.getJSON ( server + `rekapBiaya.php` , function (rekap){
        $(".saldo").html('');
        $("#saldoSPP").html( parseInt(rekap.spp).toLocaleString('id-ID') );
        $("#saldoDU").html( parseInt(rekap.du).toLocaleString('id-ID') );
        $("#saldoKeluar").html( parseInt(rekap.keluar).toLocaleString('id-ID') );
        $("#saldoAkhir").html( parseInt(rekap.sisa).toLocaleString('id-ID') );
        let data={
            datasets: [{
                data: [
                    parseInt(rekap.spp),
                    parseInt(rekap.du),
                    parseInt(rekap.keluar),
                ],
                backgroundColor: [
                    "blue","green","red",
                ],
                label: 'Rekap Keuangan'
            }],
            labels: [
                'SPP',
                'Daftar Ulang',
                'Pengeluaran'
            ]
        }

        setChart(data);
    })
})

function setChart(data){
    let ctx = $('#grapRekap');
    var rekapkeu = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            animateRotate:true,
            outerRadius: 500,
            cutoutPercentage: 0
        }
    });
}