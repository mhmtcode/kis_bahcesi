var Model_ID;
var Servis_ID;
var Ayak_Num;
var Max_Genislik;
var Max_Yukseklik;
var Max_Derinlik;
var Genislik;
var Yukseklik;
var Derinlik;
var sum;
var degerler = new Array();


function Model_ata(n,a) {
    Model_ID = n;
 
    $("#Model_Listesi").prop("hidden", true);
    $("#Servis_Listesi").prop("hidden", false);
    $("#Top_detay").append('<li Class="list-group-item"">' + a + '</li>');
}
function Servis_ata(n,a) {
    Servis_ID = n;
    $("#Servis_Listesi").prop("hidden", true);
    $("#Ayak_Sec").prop("hidden", false);
    $("#Top_detay").append('<li Class="list-group-item"">'+a+'</li>');
}
function Ayak_ata(n, a) {
    Ayak_Num = n;
    $("#Ayak_Sec").prop("hidden", true);
    $("#sec1").prop("hidden", false);
    $("#toplam").prop("hidden", false);
    $("#Top_detay").append('<li Class="list-group-item"">' + a + '</li>');
    $.ajax({
        url: "/Home/Tavan_Listesi",
        type: "GET",
        dataType: "json",
        crossDomain: true,
        success: function (data) {
            // Gelen veriyi döngüyle gezerek HTML tablosuna yazdırın.

            $.each(data, function (key, value) {

                $("#Tavan_Listesi").append("<option value=" + value.CAM_ID + ">" + value.CAM_NAME + "</option>");

            });
        }
    })
}
function en_boy_kaydet() {

   

    Genislik = Number($("#genislik").val());
    Yukseklik = Number($("#yukseklik").val());
    Derinlik = Number($("#derinlik").val());

    if (Genislik > Max_Genislik || Yukseklik > Max_Yukseklik || Derinlik > Max_Derinlik || Genislik == 0 || Yukseklik == 0 || Derinlik == 0 || Genislik == null || Yukseklik == null || Derinlik == null) {
        alert('Girilen Degerler Sinirlar Icerisinde Degil');
    }
    else

    {

        $.ajax({
            url: "/Home/Fiyat_sonuc",
            type: "POST",
            data: {
                model_id: Model_ID,
                servis_id: Servis_ID,
                cam_id: $("#Tavan_Listesi").val(),
                ayak: 2,
                tiefe: Derinlik,
                geislik: Genislik
            },
            success: function (data) {
                $.each(data, function (key, value) {

                    degerler[0] = Number(data.Return_);
                    if (degerler[0] == 0) {
                       
                        alert('Deger Bulunamadi !');
                    }
                    else {

                        if (Ayak_Num == 2) {
                            toplam();
                            $("#veri2").text(parseInt(sum).toLocaleString() + " €")
                            $("#Top_detay").append('<li id="li_temel" Class="list-group-item""> Temel Fiyat: ' + parseInt(degerler[0]).toLocaleString() + ' €</li>');
                            $("#yukseklik").prop("disabled", true);
                            $("#genislik").prop("disabled", true);
                            $("#derinlik").prop("disabled", true);
                            //
                            $("#btn_kaydet").prop("hidden", true);
                            $("#liste2_btn").prop("hidden", false);
                            renk_doldur();
                            $("#sec3").prop("hidden", false);
                            scroll("sec3");
                        }
                        else if (Ayak_Num == 4) {

                            $.ajax({
                                url: "/Home/Dort_Fiyat_sonuc",
                                type: "POST",
                                data: {
                                    model_id: Model_ID,
                                    cam_id: $("#Tavan_Listesi").val(),
                                    tiefe: Derinlik,
                                    geislik: Genislik
                                },
                                success: function (data1) {
                                    // document.getElementById("total_items").value = response;
                                    $.each(data1, function (key, value) {

                                        degerler[0] = degerler[0] + Number(data1.Return_);
                                        if (Number(data1.Return_) == 0) {
                                            alert('4 Deger Bulunamadi !');
                                        }
                                        else {
                                            toplam();
                                            $("#veri2").text(parseInt(sum).toLocaleString() + " €")
                                            $("#Top_detay").append('<li id="li_temel" Class="list-group-item""> Temel Fiyat: ' + parseInt(degerler[0]).toLocaleString() + ' €</li>');
                                            $("#yukseklik").prop("disabled", true);
                                            $("#genislik").prop("disabled", true);
                                            $("#derinlik").prop("disabled", true);
                                            //
                                            $("#btn_kaydet").prop("hidden", true);
                                            $("#liste2_btn").prop("hidden", false);
                                            renk_doldur();
                                            $("#sec3").prop("hidden", false);
                                            scroll("sec3");
                                        }

                                    });
                                },
                                error: function () {
                                    alert("error");
                                }
                            });  
                        }
                         
                    }

                });
            },
            error: function () {
                alert("error");
            }
        });    

    }

}
function Led_fiyat_getir() {

    $.ajax({
        url: "/Home/Led_Fiyat_sonuc",
        type: "POST",
        data: {
            model_id: Model_ID,
            cam_id: $("#Tavan_Listesi").val(),
            tiefe: Derinlik,
            geislik: Genislik
        },
        success: function (data) {
            $.each(data, function (key, value) {

                degerler[2] = Number(data.Return_);
                if (degerler[2] == 0) {
                    alert('Deger Bulunamadi !');
                }
                else {
                    toplam();
                    $("#veri2").text(parseInt(sum).toLocaleString() + " €")
                    $("#Top_detay").append('<li id="li_led" Class="list-group-item""> Led: +' + parseInt(degerler[2]).toLocaleString() + ' €</li>');
                   
                }

            });
        },
        error: function () {
            alert("error");
        }
    });
}
function renk_doldur() {
    $.ajax({
        url: "/Home/Renk_Listesi",
        type: "GET",
        dataType: "json",
        crossDomain: true,
        success: function (data) {
            // Gelen veriyi döngüyle gezerek HTML tablosuna yazdırın.

            $.each(data, function (key, value) {

                $("#Renkler").append("<option value=" + value.ID + ">" + value.RENK + "</option>");
               
            });
        }
    })
}
function yan_doldur(n) {
    $.ajax({
        url: "/Home/Yan_Listesi",
        type: "GET",
        dataType: "json",
        crossDomain: true,
        success: function (data) {
            
            $.each(data, function (key, value) {

                switch (n) {
                    case 0://ikisini doldur
                        $("#sag_yan_secimi").append("<option value=" + value.ID + ">" + value.KAPAMA_NAME + "</option>");
                        $("#sol_yan_secimi").append("<option value=" + value.ID + ">" + value.KAPAMA_NAME + "</option>");
                        break;
                    case 1://sag soldur
                        $("#sag_yan_secimi").append("<option value=" + value.ID + ">" + value.KAPAMA_NAME + "</option>");
                       
                        break;
                    case 2://Sol doldur
                       
                        $("#sol_yan_secimi").append("<option value=" + value.ID + ">" + value.KAPAMA_NAME + "</option>");
                        break
                    default:
                }
                
            });
        }
    })
}
function on_arka_doldur() {
    $.ajax({
        url: "/Home/On_Listesi",
        type: "GET",
        dataType: "json",
        crossDomain: true,
        success: function (data) {

            $.each(data, function (key, value) {

                $("#on_secimi").append("<option value=" + value.ID + ">" + value.ON_KAPAMA_NAME + "</option>");
                $("#arka_secimi").append("<option value=" + value.ID + ">" + value.ON_KAPAMA_NAME + "</option>");
            });
        }
    })
}
function toplam() {
    sum = 0;
    degerler.forEach((element) => sum += Number(element));
}
function select_remove(n) {
    $("#" + n).prop("disabled", false);
    $("#" + n).children().remove();
    $("#" + n).append('<option value = 0 > Bir Öğe Seçin</option>');
    $("#" + n).val(0);
}

$(document).ready(function () {

})
function scroll(n) {
    $('html, body').animate({
        scrollTop: $("#" + n).offset().top
    }, 800);
}
function degistir_btn(n) {
    switch (n) {
        case 1: //tavan degistir
            $("#Tavan_Listesi").prop("disabled", false);
            // gizlenen ogeler
            $("#sec2").prop("hidden", true);
            $("#sec3").prop("hidden", true);
            $("#sec4").prop("hidden", true);
            $("#sec5").prop("hidden", true);
            $("#sec6").prop("hidden", true);
            $("#sec7").prop("hidden", true);
            $("#sec8").prop("hidden", true);
           // li leri sil
            $("#li_temel").remove();
            $("#li_tavan").remove();
            $("#li_renk").remove();
            $("#li_led").remove();
            $("#li_sag_yan_secimi").remove();
            $("#li_sol_yan_sacimi").remove();
            $("#li_on_secimi").remove();
            
            
            // olcu giris ekrani
            $("#yukseklik").prop("disabled", false);
            $("#genislik").prop("disabled", false);
            $("#derinlik").prop("disabled", false);
            //
            $("#btn_kaydet").prop("hidden", false);
            $("#liste2_btn").prop("hidden", true);

            // Secenekleri Sifirla
            select_remove('Renkler');
            $("#Led_secimi").prop("disabled", false);
            $("#Led_secimi").val(0);
            select_remove('sag_yan_secimi');
            select_remove('sol_yan_secimi');
            select_remove('on_secimi');
            
            //
            degerler.splice(0, 11);
            toplam();
            $("#veri2").text(parseInt(sum).toLocaleString() + " €")
            scroll("sec1")
            break;
        case 2:

            $("#genislik").prop("disabled", false);
            $("#yukseklik").prop("disabled", false);
            $("#derinlik").prop("disabled", false);
            $("#btn_kaydet").prop("hidden", false);
            $("#liste2_btn").prop("hidden", true);
            // gizlenen ogeler
            $("#sec3").prop("hidden", true);
            $("#sec4").prop("hidden", true);
            $("#sec5").prop("hidden", true);
            $("#sec6").prop("hidden", true);
            $("#sec7").prop("hidden", true);
            $("#sec8").prop("hidden", true);
            // li leri sil
            $("#li_temel").remove();
          
            $("#li_renk").remove();
            $("#li_led").remove();
            $("#li_sag_yan_secimi").remove();
            $("#li_sol_yan_sacimi").remove();
            $("#li_on_secimi").remove();

            // Secenekleri Sifirla
            select_remove('Renkler');
            $("#Led_secimi").prop("disabled", false);
            $("#Led_secimi").val(0);
            select_remove('sag_yan_secimi');
            select_remove('sol_yan_secimi');
            select_remove('on_secimi');

            //
            degerler.splice(0, 11);
            toplam();
            $("#veri2").text(parseInt(sum).toLocaleString() + " €")
            scroll("sec2")

            //
            //$("#sec3").prop("hidden", true);
            //$("#liste3").prop("disabled", false);
            //$("#liste3").val(0);
            //$("#image3").attr("src", null);
            //
            //$("#sec4").prop("hidden", true);
            //$("#liste4").prop("disabled", false);
            //$("#liste4").val(0);
        /*    $("#image4").attr("src", null);*/
            //
           
            break;
        case 3:
            $("#Renkler").prop("disabled", false);
            // gizlenen ogeler
           
            $("#sec4").prop("hidden", true);
            $("#sec5").prop("hidden", true);
            $("#sec6").prop("hidden", true);
            $("#sec7").prop("hidden", true);
            $("#sec8").prop("hidden", true);
            // li leri sil
         
            $("#li_renk").remove();
            $("#li_led").remove();
            $("#li_sag_yan_secimi").remove();
            $("#li_sol_yan_sacimi").remove();
            $("#li_on_secimi").remove();

            // Secenekleri Sifirla
         
            $("#Led_secimi").prop("disabled", false);
            $("#Led_secimi").val(0);
            select_remove('sag_yan_secimi');
            select_remove('sol_yan_secimi');
            select_remove('on_secimi');

            //
            degerler.splice(1, 11);
            toplam();
            $("#veri2").text(parseInt(sum).toLocaleString() + " €")
            scroll("sec3")
            break;
        case 4:
            $("#Led_secimi").prop("disabled", false);
            // gizlenen ogeler
          
            $("#sec5").prop("hidden", true);
            $("#sec6").prop("hidden", true);
            $("#sec7").prop("hidden", true);
            $("#sec8").prop("hidden", true);
            // li leri sil
           
            $("#li_led").remove();
            $("#li_sag_yan_secimi").remove();
            $("#li_sol_yan_sacimi").remove();
            $("#li_on_secimi").remove();

            // Secenekleri Sifirla
         
            select_remove('sag_yan_secimi');
            select_remove('sol_yan_secimi');
            select_remove('on_secimi');

            //
            degerler.splice(2, 11);
            toplam();
            $("#veri2").text(parseInt(sum).toLocaleString() + " €")
            scroll("sec4")
            break;
        case 5:
            $("#sag_yan_secimi").prop("disabled", false);
            // gizlenen ogeler
            
            $("#sec6").prop("hidden", true);
            $("#sec7").prop("hidden", true);
            $("#sec8").prop("hidden", true);
            // li leri sil
          
            $("#li_sag_yan_secimi").remove();
            $("#li_sol_yan_sacimi").remove();
            $("#li_on_secimi").remove();

            // Secenekleri Sifirla
          
            select_remove('sol_yan_secimi');
            select_remove('on_secimi');

            //
            degerler.splice(3, 11);
            toplam();
            $("#veri2").text(parseInt(sum).toLocaleString() + " €")
            scroll("sec5")
            break;
        case 6:
            $("#sol_yan_secimi").prop("disabled", false);
            // gizlenen ogeler
           
            $("#sec7").prop("hidden", true);
            $("#sec8").prop("hidden", true);
            // li leri sil
          
            $("#li_sol_yan_sacimi").remove();
            $("#li_on_secimi").remove();

            // Secenekleri Sifirla
        
            select_remove('on_secimi');

            //
            degerler.splice(4, 11);
            toplam();
            $("#veri2").text(parseInt(sum).toLocaleString() + " €")
            scroll("sec6")
            break;
        default:
            break;
    }


}

$("#Tavan_Listesi").change(function () {
    $.ajax({
        url: "/Home/Tavan_Listesi/" + $("#Tavan_Listesi").val(),
        type: "GET",
        dataType: "json",
        crossDomain: true,
        success: function (data) {
            // Gelen veriyi döngüyle gezerek HTML tablosuna yazdırın.

            $.each(data, function (key, value) {
                $("#image1").attr("src", "/Images/" + value.IMAGES);
                Max_Derinlik = value.DERINLIK;
                Max_Genislik = value.GENISLIK;
                Max_Yukseklik = value.YUKSEKLIK;
                $('#max_derinlik').text('Max : ' + value.DERINLIK + ' cm');
                $('#max_genislik').text('Max : ' + value.GENISLIK + ' cm');
                $('#max_yukseklik').text('Max : ' + value.YUKSEKLIK + ' cm');
                scroll("sec2");
                $("#Top_detay").append('<li id="li_tavan" Class="list-group-item""> Tavan: ' + $("#Tavan_Listesi option:selected").text() + ' </li>');
            });
        }
    })

    $("#Tavan_Listesi").prop("disabled", true);
    $("#sec2").prop("hidden", false);
   

})
$("#Renkler").change(function () {

    $.ajax({
        url: "/Home/Renk_Listesi/" + $("#Renkler").val(),
        type: "GET",
        dataType: "json",
        crossDomain: true,
        success: function (data) {
           $.each(data, function (key, value) {

                degerler[1] = Math.round((degerler[0] * Number(value.ORAN)) - degerler[0])
                toplam();
                $("#veri2").text(parseInt(sum).toLocaleString() + " €")
                $("#image3").attr("src", "/images/" + value.IMAGES);
                $("#Top_detay").append('<li id="li_renk" Class="list-group-item""> Renk: ' + value.RENK + ' +' + parseInt(Math.round(degerler[1])).toLocaleString()  +' €</li>');
               scroll("sec4");
            });
        }
    })

    $("#Renkler").prop("disabled", true);
    $("#sec4").prop("hidden", false);
})
$("#Led_secimi").change(function () {

    
    switch (Number($("#Led_secimi").val()))
    {
        case 1: //led istemiyor
            $("#Top_detay").append('<li id="li_led" Class="list-group-item""> Led: YOK</li>');
            break;
        case 2: // led istiyor
            Led_fiyat_getir();
            break;
        default:
            break;
    }
    yan_doldur(1);
    $("#Led_secimi").prop("disabled", true);
    $("#sec5").prop("hidden", false);
    scroll("sec5");
})
$("#sag_yan_secimi").change(function () {

    $.ajax({
        url: "/Home/Yan_Listesi/" + $("#sag_yan_secimi").val(),
        type: "GET",
        dataType: "json",
        crossDomain: true,
        success: function (data) {
            $.each(data, function (key, value) {

                degerler[3] = Derinlik * Number(value.DEGER)
                toplam();
                $("#veri2").text(parseInt(sum).toLocaleString() + " €")
                $("#Top_detay").append('<li id="li_sag_yan_secimi" Class="list-group-item""> Sag Yan: ' + value.KAPAMA_NAME + ' +' + parseInt(degerler[3]).toLocaleString() + ' €</li>');
                yan_doldur(2);
                scroll("sec6");
            });
        }
    })

    $("#sag_yan_secimi").prop("disabled", true);
    $("#sec6").prop("hidden", false);
    
})
$("#sol_yan_secimi").change(function () {

    $.ajax({
        url: "/Home/Yan_Listesi/" + $("#sol_yan_secimi").val(),
        type: "GET",
        dataType: "json",
        crossDomain: true,
        success: function (data) {
            $.each(data, function (key, value) {

                degerler[4] = Derinlik * Number(value.DEGER)
                toplam();
                $("#veri2").text(parseInt(sum).toLocaleString() + " €")
                $("#Top_detay").append('<li id="li_sol_yan_sacimi" Class="list-group-item""> Sol Yan: ' + value.KAPAMA_NAME +' +' + parseInt(degerler[4]).toLocaleString() + ' €</li>');
                scroll("sec7");
            });
        }
    })

    $("#sol_yan_secimi").prop("disabled", true);
     $("#sec7").prop("hidden", false);
    on_arka_doldur();
})
$("#on_secimi").change(function () {

    $.ajax({
        url: "/Home/On_Listesi/" + $("#on_secimi").val(),
        type: "GET",
        dataType: "json",
        crossDomain: true,
        success: function (data) {
            $.each(data, function (key, value) {

                degerler[5] = Genislik * Number(value.DEGER)
                toplam();
                $("#veri2").text(parseInt(sum).toLocaleString() + " €")
                $("#Top_detay").append('<li id="li_on_secimi" Class="list-group-item""> On : ' + value.ON_KAPAMA_NAME + ' +' + parseInt(degerler[5]).toLocaleString() + ' €</li>');
                
            });
        }
    })
    scroll("toplam");
    $("#on_secimi").prop("disabled", true);
    if (Ayak_Num = 4)
    {
       // $("#sec8").prop("hidden", false);
    }

})
