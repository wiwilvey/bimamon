$(document).ready(function(){
    $("#submit").click( function(){
        $.post( server + 'login.php',{
            uname: $('#username').val(),
            upass: $('#password').val()
        },function(resp){
            let data = JSON.parse(resp);
            let success, user , nig, nama, jabatan;
            success = data.sukses;
            user = data.data[0];
            nig = user.NIG;
            nama = user.NAMA;
            jabatan = user.JABATAN;
            if( success == '0' ){
                alert('user tidak ditemukan');
            }else{
                localStorage.setItem('nig',nig);
                localStorage.setItem('nama',nama);
                localStorage.setItem('jabatan',jabatan);
                window.location='index.html';
            }
            
        })
    })
})