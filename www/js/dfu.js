$(document).ready(function(){
    
    getSPP();
    $.getJSON( server + `dataKelas.php` , function(datakelas){
        $('#dftKelas option').remove();
        $.each( datakelas , function (i,kls){
            $('#dftKelas').append(`
            <option>${kls.NAMA_KELAS}</option>
            `)
        })
    })
    
    

    $("#dftKelas").change( function(){
        let kls = $(this).val().replace(/ /g,'-');
        getSPP(kls);
    })
})

function getSPP(kelas='X PKM'){
    $.getJSON( server + `rekapBulanan.php?pos=du&kelas=${kelas}` , function(rekap){
        $("#rekapBulan tr").remove();
        $("#rekapKelas tr").remove();
        
        let rdatas = [];
        let glabel = [];
        $.each(rekap.perbulan , function( i, spp){
            $('#rekapBulan').append(`
            <tr>
            <td>${spp.BULAN}</td>
            <td align='right'>${parseInt(spp.JUMLAH).toLocaleString('id-ID')}</td>
            </tr>
            `)
            glabel.push(spp.BULAN);
            rdatas.push(parseInt(spp.JUMLAH));  
        })
        let data= {
            labels: glabel,
            datasets: [{
                label: 'PEMASUKAN DAFTAR ULANG',
                fill: false,
                backgroundColor: "yellow",
                borderColor: "orange",
                data: rdatas,
                }]
            }

        setChart(data);

        $.each( rekap.perkelas , function(i,kls){
            $('#rekapKelas').append(`
            <tr>
            <td>${kls.BULAN}</td>
            <td>${kls.KELAS}</td>
            <td align='right'>${parseInt(kls.JUMLAH).toLocaleString('id-ID')}</td>
            </tr>
            `)
        })
    })
}

function setChart(data){
    let ctx = $('#sppGRekap');
    var rekapkeu = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
        }
    });
}