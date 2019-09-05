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
    })
})