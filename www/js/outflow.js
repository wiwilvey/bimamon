$(document).ready(function(){
    $.getJSON( server + `kodeKeluar.php` , function(kode){
        $('#kodepos option').remove();
        $("#kodepos").append(`
        <option>Pilih Pos Anggaran</option>
        <option value=''>Semua Pos</option>
        `);
        $.each(kode , function(i,data){
            $("#kodepos").append(`
            <option value='${data.KODE_POST}'>${data.KET_POST}</option>`
            );
        })
    })

    $("#kodepos").change( function(){
       // alert($(this).val());
        let kb = $(this).val();
         $.getJSON( server + `rekapBulanan.php?pos=keluar&kb=${kb}` , function(dana){
             $("#cashout tr").remove();
             $.each(dana , function(i,data){
                 $("#cashout").append(`
                     <tr>
                     <td><a href="javascript:void(0)" class="detilKeluar">${data.BULAN}</a></td>
                     <td>${data.KODE_BIAYA}</td>
                     <td>${data.NAMA_POSTING}</td>
                     <td align='right'>${parseInt(data.JUMLAH).toLocaleString('id-ID')}</td>
                     </tr>
                 `);
             })
         })
    })

    $("#cashout").on('click','.detilKeluar',function(){
        let kb = $(this).parent('td').parent('tr').children('td:nth-child(2)').text();
        //alert(kb);
        let bl = $(this).text();
        $.getJSON( server + `detilPengeluaran.php?kb=${kb}&bl=${bl}` , function(info){
            $("#infoCashOut li").remove();
            $.each(info , function(i,data){
                $("#infoCashOut").append(`
                <li class='list-group-item'>
                <p>Tgl: ${data.TANGGAL} 
                <span style='float:right'>${parseInt(data.JUMLAH).toLocaleString('id-ID')}</span><p>
                <p>${data.PENERIMA} - ${data.BERITA}</p>
                </li>
                `);
            })
        })
    })
})

