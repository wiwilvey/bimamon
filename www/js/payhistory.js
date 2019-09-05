$(document).ready(function(){
    const kelas = localStorage.getItem('kelas');
    $.getJSON( server + `siswaKelas.php?kelas=${kelas}` , function(siswa){
        $("#dataSiswa option").remove();
        $.each(siswa , function( i,data ){
            $("#dataSiswa").append(`
            <option value='${data.NIS}'>${data.NAMA}</option>
            `)
        })
    })

    $("#dataSiswa").change( function(){
        let nis = $(this).val();
        $.getJSON(server + `riwayatBayar.php?nis=${nis}` , function(bayar){
            $("#riwayatBayar li").remove();
            $("#riwayatRsume li").remove();
            $.each( bayar.riwayat , function(i,data){
                $("#riwayatBayar").append(`
                <li class='list-group-item dabay'>
                <p>${data.TANGGAL} - ${data.NAMA_POSTING}<br>
                <span style='float:right; margin-right: 15px'>
                ${parseInt(data.JUMLAH).toLocaleString('id-ID')}</span>
                </p>
                </li>
                `)
            })

            $.each( bayar.resume , function(i,data){
                $("#riwayatRsume").append(`
                <li class='list-group-item dabay'>
                <p>${data.NAMA_POSTING}<br>
                <span style='float:right; margin-right: 15px'>${data.JUMLAH}</span>
                </p>                
                </;i>
                `)
            })
        })
    })
})

function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}