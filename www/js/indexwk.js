$(document).ready(function(){
    let pos='';
    const kelas = localStorage.getItem('kelas');
    const nig = localStorage.getItem('nig');
    const saatini = new Date();
    const tahunIni  = saatini.getFullYear()
    const tahunLalu = parseInt(tahunIni) - 1;
    // $("#tes").html( tahunLalu +'-'+ tahunIni);
    if( kelas == null || kelas == '' || kelas == 0){
        $.ajax({
            url: server + `kelasku.php?nig=${nig}`,
            success : function(kls){
                console.log('kelamu:',kls);
                localStorage.setItem('kelas',kls);
                //nig = localStorage.getItem('nig');
                location.reload();
            }
        })
    }

    $("#rwyby").click(function(){
        window.location='riwayatBayar.html';
    })

    $('#wkspp').click(function(){ 
        pos = 'sppBulananKelas.php' ; 
        $(".bayaran").removeClass('bg-maroon');
        $(this).addClass('bg-maroon');
    }) 

    $('#wkdfu').click(function(){ 
        pos = 'duBulananKelas.php';
        $(".bayaran").removeClass('bg-maroon');
        $(this).addClass('bg-maroon');
    }) 
    for (let tl = 7 ; tl <=12 ; tl ++){
        let bulan = pad(tl,2);
        $("#fltBulan").append(`<option value='${tahunLalu}-${bulan}'>${bulan}-${tahunLalu}</option>`)
    }

    for ( let ti = 1 ; ti <=12 ; ti++ ){
        let bulan = pad(ti,2);
        $("#fltBulan").append(`<option value='${tahunIni}-${bulan}'>${bulan}-${tahunIni}</option>`)
    }

    $("#fltBulan").change( function(){
        let bulan = $(this).val();
        $.getJSON(`${server}/${pos}?bulan=${bulan}&kelas=${kelas}` , function(bayaran){
            console.log(bayaran);
            $("#dataBayaran li").remove();
            $.each(bayaran , function(i,data){
                $("#dataBayaran").append(`
                <li class='list-group-item dabay'>
                <p>${data.NAMA}</p>
                <p>${data.TANGGAL}
                <span style='float:right; margin-right: 15px;'>
                ${parseInt(data.JUMLAH).toLocaleString('id-ID')}</span>
                </p>
                </li>
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