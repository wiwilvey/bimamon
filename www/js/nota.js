$(document).ready(function(){
    var kodeNota = localStorage.getItem('kode');
    var posBiaya = localStorage.getItem('biaya');

    if( posBiaya == 'bayar' ){
        getDataPengeluaran(kodeNota);
    }else{
        getSppDU(kodeNota,posBiaya);
    }
})

function getDataPengeluaran(kode_bayar){
    $.getJSON( server + `datanota.php?pos=bayar&kode=${kode_bayar}` , function(nota){
        console.log(nota);
        tgl = nota[0].TANGGAL.split('-');
        $("#tgNota").html(tgl[2]+'-'+tgl[1]+'-'+tgl[0]);
        $("#pembayar").html(nota[0].KASIR);
        $("#jumlah").html(parseInt(nota[0].JUMLAH).toLocaleString('id-ID'));
        $("#utkBayar").html('');
        $("#berita").html(nota[0].BERITA);
        $("#penerima").html(nota[0].PENERIMA);
    })
}

function getSppDU(kode_bayar,pos){
    $.getJSON( server + `datanota.php?pos=${pos}&kode=${kode_bayar}` , function(nota){
        // console.log(nota);
        // console.log('TANGGAL:',nota[0].TANGGAL);
        
        let tgl = nota[0].TANGGAL.split('-');
        $("#tgNota").html(tgl[2]+'-'+tgl[1]+'-'+tgl[0]);
        $("#pembayar").html(nota[0].NAMA);
        $("#jumlah").html(parseInt(nota[0].JUMLAH).toLocaleString('id-ID'));
        $("#utkBayar").html('');
        $("#berita").html(nota[0].BERITA);
        $("#penerima").html(nota[0].KASIR);
        
    })
}

