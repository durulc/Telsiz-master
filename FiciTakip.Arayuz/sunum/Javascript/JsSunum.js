var markers = [];

var DiziPolygon = [];

var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    //osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    osmAttrib = '&nbsp;&nbsp;&nbsp;',
    osm = L.tileLayer(osmUrl, { maxZoom: 30, attribution: osmAttrib }),
    haritaMap = new L.Map('map', { layers: [osm], center: new L.LatLng(39.5437476666813, 26.59065254471876), zoom: 10 });

function jsHaritaFiltre()
{
    var v_ProjeTuru = $('#listeProjeTuru').val();

    var v_ProjeSehir= $('#listeAramaSehir').val();

    var v_projeSayisi = 0;

    var v_ToplamUzunluk = 0;

    var v_Uzunluk = 0;

    for (var iSayac = 0; iSayac < markers.length; iSayac++) {
        haritaMap.removeLayer(markers[iSayac]);

        haritaMap.removeLayer(DiziPolygon[iSayac]);


        //if ((v_ProjeTuru == markers[iSayac].options.CustomProjeTur || v_ProjeTuru == '0') && (v_ProjeDurum == '-1' || v_ProjeDurum == markers[iSayac].options.CustomProjeDurum))
        //{
        //    v_ToplamUzunluk = v_ToplamUzunluk + parseInt(DiziPolygon[iSayac].options.CustomUzunluk);

        //    v_projeSayisi = v_projeSayisi + 1;

        //    haritaMap.addLayer(markers[iSayac]);

        //    haritaMap.addLayer(DiziPolygon[iSayac]);
        //}


        if (
            (v_ProjeTuru == '0' || v_ProjeTuru == markers[iSayac].options.CustomProjeTur ) &&
            (v_ProjeSehir == '-2' || v_ProjeSehir == markers[iSayac].options.CustomSehirId))
        {
            v_ToplamUzunluk = v_ToplamUzunluk + parseInt(DiziPolygon[iSayac].options.CustomUzunluk);

            if (markers[iSayac].options.CustomAnaDosya == '1')
            {
                console.log(markers[iSayac].options.CustomId);

                v_projeSayisi = v_projeSayisi + 1;
            }

            haritaMap.addLayer(markers[iSayac]);

            haritaMap.addLayer(DiziPolygon[iSayac]);

        }


        /*
         v_00
       
        if (v_ProjeTuru == '0')
        {
            v_Uzunluk = markers[iSayac].options.CustomUzunluk;

            v_ToplamUzunluk = v_ToplamUzunluk + parseInt(DiziPolygon[iSayac].options.CustomUzunluk);

            if (markers[iSayac].options.CustomAnaDosya == '1')
            {
                v_projeSayisi = v_projeSayisi + 1;
            }
            haritaMap.addLayer(markers[iSayac]);

            haritaMap.addLayer(DiziPolygon[iSayac]);
        }
        else
        {
            if (v_ProjeTuru == markers[iSayac].options.CustomProjeTur)
            {
                v_ToplamUzunluk = v_ToplamUzunluk + parseInt(DiziPolygon[iSayac].options.CustomUzunluk);

               // v_projeSayisi = v_projeSayisi + 1;

                if (markers[iSayac].options.CustomAnaDosya == '1')
                {
                    console.log(markers[iSayac].options.CustomId);

                    v_projeSayisi = v_projeSayisi + 1;
                }

                haritaMap.addLayer(markers[iSayac]);

                haritaMap.addLayer(DiziPolygon[iSayac]);
            }
        }

        */
    }

    $('#spnProjeSayisi').text(v_projeSayisi);

    v_ToplamUzunluk = new Intl.NumberFormat('tr-TR').format(v_ToplamUzunluk);

    $('#spnUzunluk').text(v_ToplamUzunluk);


    //jsSunumHaritaCiz_v2(haritaMap, v_ProjeTuru);
    //jsSunumHaritaCiz(haritaMap, v_ProjeTuru);


    //for (i in m._layers)
    //{
    //    if (m._layers[i]._path != undefined)
    //    {
    //            try
    //            {
    //                m.removeLayer(m._layers[i]);
    //            }
    //            catch (e)
    //            {
    //                console.log("problem with " + e + m._layers[i]);
    //            }
    //    }
    //}
}


function fnBilgileriYukle_03(v_SessionGuid) {
    $.ajax({
        type: "POST",
        url: "api/HaritaBilgi_03",
        data: JSON.stringify
            ({
                SessionGuid: v_SessionGuid

            }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            //   debugger;
        },
        error: function (request, status, error) {
            UyariMesajiVer('Sistemsel bir hata oluştu');
        },
        success: function (msg) {
            //debugger;
            if (msg.Sonuc == "1") {


                $('#txtProjeNo').val(v_SessionGuid);

                $('#txtKesifBedeli').val(msg.zKesifBedeli);
                $('#txtSozlesmeBedeli').val(msg.zSozlesmeBedeli);
                $('#txtBakanlikHibe').val(msg.zBakanlikHibe);
                $('#txtIlbankHibe').val(msg.zIlbankHibe);
                $('#txtToplamYapimButce').val(msg.zToplamYapimButcesi);

            }
            else {
                UyariMesajiVer('Sistemsel bir hata oluştu');
            }
        },
        complete: function () {
            fnProjeDetayAc(v_SessionGuid);
        }
    });
}

function fn_test(v_SessionGuid) {
    alert(v_SessionGuid);
}


function fnBilgileriYukle_01(v_SessionGuid) {



    $.ajax({
        type: "POST",
        url: "api/ProjeLogBilgileri",

        data: JSON.stringify
            ({
                SessionGuid: v_SessionGuid
            }),

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#tabloLogBilgileri tbody").html('');
        },
        error: function (request, status, error) {
            UyariMesajiVer('Sistemsel bir hata oluştu');
        },
        success: function (msg) {
            if (msg.Sonuc == "1") {
                var vYanitDizi = msg.Dizi;

                var vSayac = 1;

                var content = '';

                for (var iSayac = 0; iSayac < vYanitDizi.length; iSayac++) {
                    content += '<tr>';
                    // content += "<td style='text-align:right'>" + vSayac + "</td>";
                    content += "<td>" + vYanitDizi[iSayac].IslemAciklama + " </td>";
                    content += "<td>" + vYanitDizi[iSayac].IslemTarihi + " </td>";
                    content += "<td>" + vYanitDizi[iSayac].IslemYapanKullanici + " </td>";
                    content += "</tr>";

                    vSayac = vSayac + 1;
                }

                $('#tabloLogBilgileri tbody').html(content);
            }
        },
        complete: function () {

            fnBilgileriYukle_02(v_SessionGuid);
        }
    });


    //debugger;
    //$('#txtKayitNo').val(v_SessionGuid);


    //fnProjeDetayAc(v_SessionGuid);
}

function fnBilgileriYukle_02(v_SessionGuid) {

    $.ajax({
        type: "POST",
        url: "api/HaritaBilgi_01",
        data: JSON.stringify
            ({
                SessionGuid: v_SessionGuid

            }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            //   debugger;
        },
        error: function (request, status, error) {
            UyariMesajiVer('Sistemsel bir hata oluştu');
        },
        success: function (msg) {
            //debugger;
            if (msg.Sonuc == "1") {

                $('#txtSehir').val(msg.zSehirAdi);
                $('#txtIlce').val(msg.zIlceAdi);
                $('#txtProjeTuru').val(msg.zProjeTuru);
                $('#txtProjeDurumu').val(msg.zProjeDurumu);
                $('#txtGuzergahAdi').val(msg.zGuzergahAdi);
                $('#txtToplamUzunluk').val(msg.zToplamUzunluk);

            }
            else {
                UyariMesajiVer('Sistemsel bir hata oluştu');
            }
        },
        complete: function () {
            // fnProjeDetayAc(v_SessionGuid);
            fnBilgileriYukle_03(v_SessionGuid);
        }
    });

    //fnProjeDetayAc(v_SessionGuid);
}


function fnProjeDetayAc(v_SessionGuid) {

    $('#modal_Proje_Bilgi').appendTo('#map');

    //$('#modal_Proje_Bilgi').on('show.bs.modal', function () {
    //    setTimeout(function () {
    //        haritaMap.invalidateSize();
    //    }, 10);
    //});

    $('#modal_Proje_Bilgi').modal({
        show: true,
        keyboard: false,
        backdrop: 'static'
    });
}




function jsSunumHaritaCiz(v_ProjeTuru) {
    // debugger;



    //var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    //    //osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    //    osmAttrib = '&nbsp;&nbsp;&nbsp;',
    //    osm = L.tileLayer(osmUrl, { maxZoom: 30, attribution: osmAttrib }),
    //    haritaMap = new L.Map('map', { layers: [osm], center: new L.LatLng(39.5437476666813, 26.59065254471876), zoom: 10 });

    var drawnItems = new L.FeatureGroup();

    haritaMap.addLayer(drawnItems);

    L.control.layers({
        'Google Haritası': osm.addTo(haritaMap),
        "Uydu Görünümü": L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
            attribution: ''
        })
    }, { 'Çizgi': drawnItems }, { position: 'topleft', collapsed: false }).addTo(haritaMap);


    var myStyle = {
        "color": "#ff7800",
        "weight": 25,
        "opacity": 1
    };


    L.drawLocal.draw.toolbar.buttons.polygon = 'Türkiye Cumhuriyeti Çevre, Şehircilik ve İklim Değişikliği Bakanlığı';

    haritaMap.addControl(new L.Control.Fullscreen({
        title: {
            'false': 'View Fullscreen',
            'true': 'Exit Fullscreen'
        }
    }));


    //var helpbutton_1 = new L.Control.Button(L.DomUtil.get('helpbutton_1'), { toggleButton: 'active', position: 'bottomright' });
    //helpbutton_1.addTo(haritaMap);
    //helpbutton_1.on('click', function () {
    //    window.location.href = 'http://www.yourdomain.com/help'
    //});

    var legendProjeTur = L.control({ position: 'topright' });
    legendProjeTur.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');
        // div.innerHTML = '<select><option>1</option><option>2</option><option>3</option></select>';
        div.innerHTML = '<br/><br/><select class="form-control m-input" style="width:250px;" id="listeProjeTuru" name="listeProjeTuru"><option value="0">Tüm Çalışmalar</option><option value="1">Bisiklet Yolu</option><option value="2">Yeşil Yürüyüş Yolu</option><option value="3">Çevre Dostu Sokak</option><option value="4">Bisiklet ve Yeşil Yürüyüş Yolu</option><option value="5">Gürültü Bariyeri</option></select>';
        div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
        return div;
    };
    legendProjeTur.addTo(haritaMap);

    // Proje Türleri
    var legendProjeDurum = L.control({ position: 'topright' });
    legendProjeDurum.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');
        // div.innerHTML = '<select><option>1</option><option>2</option><option>3</option></select>';
        //div.innerHTML = '<br/><br/><select class="form-control m-input" style="width:250px;" id="listeProjeDurumu" name="listeProjeDurumu"><option value="-1">Tüm Çalışmalar</option><option value="1">Kullanımda</option><option value="2">Yapımı Devam Etmekte</option><option value="3">İhale Aşamasında</option><option value="4">Projelendirme Aşamasında</option><option value="5">İptal Edildi</option></select>';

        var v_SehirYazi = "";

        v_SehirYazi = '<br/><br/>';
        v_SehirYazi += '<select class="form-control m-input" style="width:250px;" id="listeAramaSehir" name="listeAramaSehir">';
        v_SehirYazi += '<option value="-2">TÜM ŞEHİRLER</option>';
        v_SehirYazi += '<option value="749E4D82-2028-4A36-8C54-BD731ADA6240">ADANA</option>';
        v_SehirYazi += '<option value="092CF37F-06E6-4D10-B251-35023285E4B6">ADIYAMAN</option>';
        v_SehirYazi += '<option value="DDE8962E-9FA5-4610-A1CB-1A32B91FDB12">AFYON</option>';
        v_SehirYazi += '<option value="76612364-9158-44E1-BE4C-5D520991D8F4">AĞRI</option>';
        v_SehirYazi += '<option value="4FC1CF48-1CFC-4ADE-97FC-237236C0BFB2">AMASYA</option>';
        v_SehirYazi += '<option value="0004D1B2-55F2-4611-B063-B2A562377212">ANKARA</option>';
        v_SehirYazi += '<option value="50F59D5A-6714-4AFB-A100-F96687E42AB1">ANTALYA</option>';
        v_SehirYazi += '<option value="0B0E39BC-8C5A-4D40-B0DA-43E37A657173">ARTVİN</option>';
        v_SehirYazi += '<option value="34FF5047-6F0A-4920-8599-AD3610EAADB7">AYDIN</option>';
        v_SehirYazi += '<option value="FAAC3F7F-0F21-48AF-85E4-4FD59F6F6281">BALIKESİR</option>';
        v_SehirYazi += '<option value="C131F312-4360-4BD0-8208-641C97D02F34">BİLECİK</option>';
        v_SehirYazi += '<option value="DA23348B-8201-4843-B464-3BD20AD26737">BİNGÖL</option>';
        v_SehirYazi += '<option value="2C86C4E2-68D4-41DE-9F23-A18764015205">BİTLİS</option>';
        v_SehirYazi += '<option value="008C5B18-7CC4-41D9-A861-F329F0D93F77">BOLU</option>';
        v_SehirYazi += '<option value="F52C337B-ED7F-4945-BC61-CE3016875827">BURDUR</option>';
        v_SehirYazi += '<option value="08C35578-36CA-4C6D-AC6E-E0F6BF3A3448">BURSA</option>';
        v_SehirYazi += '<option value="DF173DB1-8BB3-458A-B568-33FD700A5FF7">ÇANAKKALE</option>';
        v_SehirYazi += '<option value="06AD80DB-CCDE-47A1-B873-E992B2922FB7">ÇANKIRI</option>';
        v_SehirYazi += '<option value="D959DA00-1B8A-4347-AE0D-7EC81121376C">ÇORUM</option>';
        v_SehirYazi += '<option value="0445367D-576A-4044-A61E-916A2764500F">DENİZLİ</option>';
        v_SehirYazi += '<option value="0F0CB0D7-AB5F-4D6E-8834-54F538C78765">DİYARBAKIR</option>';
        v_SehirYazi += '<option value="039252C5-0135-4B49-9788-E046B198AA2C">EDİRNE</option>';
        v_SehirYazi += '<option value="DE30BC3E-7E2C-4D69-8079-A96EB9EA7614">ELAZIĞ</option>';
        v_SehirYazi += '<option value="9D4A2502-5D10-4EB4-8061-E98B93474B55">ERZİNCAN</option>';
        v_SehirYazi += '<option value="8FD5D828-F9D2-4BE8-91AF-6F6A8808E51C">ERZURUM</option>';
        v_SehirYazi += '<option value="497BB99B-0910-4F51-8D63-811566F45DCF">ESKİŞEHİR</option>';
        v_SehirYazi += '<option value="6EEF8EFE-C38A-4C12-A956-03A6C1440F1E">GAZİANTEP</option>';
        v_SehirYazi += '<option value="430EABA7-F5AB-450E-A23A-3E8CE8D6B744">GİRESUN</option>';
        v_SehirYazi += '<option value="D9EC87D4-ADA5-43FB-AB36-80FD52384ACF">GÜMÜŞHANE</option>';
        v_SehirYazi += '<option value="2FFB8BD3-D2C1-42F4-85EF-D57E0B2000BA">HAKKARİ</option>';
        v_SehirYazi += '<option value="E019CA09-E962-4F43-8308-71FC1B685443">HATAY</option>';
        v_SehirYazi += '<option value="FD59DB6A-9497-4874-AB78-FA5177B6B8CE">ISPARTA</option>';
        v_SehirYazi += '<option value="EC7557D8-71D0-41AF-AE67-7C5FBD9186BF">MERSİN</option>';
        v_SehirYazi += '<option value="42879A35-4D46-41E0-A0D5-38F880A7EF82">İSTANBUL</option>';
        v_SehirYazi += '<option value="5149598E-21DE-46F6-B35E-281C7257F4AC">İZMİR</option>';
        v_SehirYazi += '<option value="CFE664E4-E622-4B80-B7B6-7625C581F798">KARS</option>';
        v_SehirYazi += '<option value="8878A920-F739-4CC3-A776-7671147F86D1">KASTAMONU</option>';
        v_SehirYazi += '<option value="901299BB-F159-4668-9C3D-4E0EB8DC2FB6">KAYSERİ</option>';
        v_SehirYazi += '<option value="8CD88A1F-084D-48C7-AD77-BEC1AF16485F">KIRKLARELİ</option>';
        v_SehirYazi += '<option value="C5AC7EFB-F455-4AAA-B7EC-6AD787E10C60">KIRŞEHİR</option>';
        v_SehirYazi += '<option value="610CC188-73DC-4A79-95CF-1D303D83FE0F">KOCAELİ</option>';
        v_SehirYazi += '<option value="C88BED56-9D98-4619-B753-12FA266D1EC5">KONYA</option>';
        v_SehirYazi += '<option value="6537F54F-BC2D-4153-BA69-AB9E6D249992">KÜTAHYA</option>';
        v_SehirYazi += '<option value="63AABEC9-EE7D-4285-97FE-614534A73EF4">MALATYA</option>';
        v_SehirYazi += '<option value="7DAB442B-1A59-483C-A976-3A9733F6D90D">MANİSA</option>';
        v_SehirYazi += '<option value="AF674C91-3D7C-4EF3-8C8A-396C1DBFBA35">KAHRAMANMARAŞ</option>';
        v_SehirYazi += '<option value="F91613D4-0F11-42A3-BDBE-89DF9E605D96">MARDİN</option>';
        v_SehirYazi += '<option value="7750C125-E5C9-4870-BD38-951E2BEE8FAE">MUĞLA</option>';
        v_SehirYazi += '<option value="881B5F99-B522-42C9-A611-490671B55540">MUŞ</option>';
        v_SehirYazi += '<option value="4262EC87-6F87-423B-801D-D5C446F265CF">NEVŞEHİR</option>';
        v_SehirYazi += '<option value="960C8CEC-F7F8-4CBD-8A7B-6115B6928334">NİĞDE</option>';
        v_SehirYazi += '<option value="5D1629E4-BE89-437F-9608-52121708CDB8">ORDU</option>';
        v_SehirYazi += '<option value="4B2615D1-F445-4A21-A172-A50BF9CB9B14">RİZE</option>';
        v_SehirYazi += '<option value="5D446C27-4C64-417A-82FD-B04BBF90E6DA">SAKARYA</option>';
        v_SehirYazi += '<option value="B6E21A23-AF15-4F80-AD3B-1655A7CBFA56">SAMSUN</option>';
        v_SehirYazi += '<option value="27AC8BA0-15A8-428E-BF5A-73A0EBDE52CB">SİİRT</option>';
        v_SehirYazi += '<option value="942A983E-6E33-45C6-9465-488D2C897173">SİNOP</option>';
        v_SehirYazi += '<option value="AF9360FE-8628-4F31-8FE9-F685A16A57B4">SİVAS</option>';
        v_SehirYazi += '<option value="526FA46F-23BF-40A3-AECC-1E64963124E4">TEKİRDAĞ</option>';
        v_SehirYazi += '<option value="1764E91C-6364-499B-B983-9A5D2000FF34">TOKAT</option>';
        v_SehirYazi += '<option value="5538C6B3-C549-4100-8CB3-62AD76BAF521">TRABZON</option>';
        v_SehirYazi += '<option value="B3294D0E-384D-40EE-BDC4-46C08FFFC751">TUNCELİ</option>';
        v_SehirYazi += '<option value="BBC922EE-843E-4E4D-A7EF-77EB258E60A0">ŞANLIURFA</option>';
        v_SehirYazi += '<option value="F3454E3B-59F2-4D39-A2B5-ECF3A8F7F908">UŞAK</option>';
        v_SehirYazi += '<option value="F53FDAB6-25D3-4EF2-82C9-182E21414712">VAN</option>';
        v_SehirYazi += '<option value="5D336DE2-0834-4259-9B65-D76D314E9443">YOZGAT</option>';
        v_SehirYazi += '<option value="5465923D-6920-4B62-A0A9-53D12356A4D4">ZONGULDAK</option>';
        v_SehirYazi += '<option value="ACCEFDAC-0F24-4DEA-9969-272AE4DD656D">AKSARAY</option>';
        v_SehirYazi += '<option value="7373101F-CE0B-4B0B-B8C1-26919C9E7EA8">BAYBURT</option>';
        v_SehirYazi += '<option value="A6DC3832-3402-433E-BB39-0474ECA9AC85">KARAMAN</option>';
        v_SehirYazi += '<option value="E3CCBB43-692F-4F75-857D-45356C0A52BC">KIRIKKALE</option>';
        v_SehirYazi += '<option value="C6DA3EDB-C572-4934-BAD6-0A06735C6CBC">BATMAN</option>';
        v_SehirYazi += '<option value="6FC11889-21EC-44DF-9888-528DA8DA8FC9">ŞIRNAK</option>';
        v_SehirYazi += '<option value="C0FE0967-C478-4317-AB79-087C13680D9D">BARTIN</option>';
        v_SehirYazi += '<option value="3321FCBF-A4A9-470C-B9CB-FDBC326E96A3">ARDAHAN</option>';
        v_SehirYazi += '<option value="D47AB066-5261-4319-8763-792653437EA7">IĞDIR</option>';
        v_SehirYazi += '<option value="A365F26B-CFB4-46D2-BE8B-3297F7EF16CD">YALOVA</option>';
        v_SehirYazi += '<option value="81F1B4D7-6B1E-4FE5-A765-741EF56075DA">KARABÜK</option>';
        v_SehirYazi += '<option value="C60341A5-8C8D-4AB1-99EF-B41AA6E00A35">KİLİS</option>';
        v_SehirYazi += '<option value="35B05756-22F2-4353-9603-4AEFF96CC82C">OSMANİYE</option>';
        v_SehirYazi += '<option value="CB311AA0-81D6-41AA-AC37-D3828BFB9BB5">DÜZCE</option>';
        v_SehirYazi += '</select>';

        div.innerHTML = v_SehirYazi;

        div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
        return div;
    };
    legendProjeDurum.addTo(haritaMap);

    // Proje Türleri
    var legendButceDurumu = L.control({ position: 'topright' });
    legendButceDurumu.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');
        // div.innerHTML = '<select><option>1</option><option>2</option><option>3</option></select>';
        div.innerHTML = '<br/><br/><select class="form-control m-input" disabled="disabled" style="width:250px;" id="listeButceDurumu" name="listeButceDurumu"><option value="0">Tüm Çalışmalar</option><option value="1">Bakanlık Destekli Çalışmalar</option></select>';
        div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
        return div;
    };
    //legendButceDurumu.addTo(haritaMap);


    var button = L.control({ position: 'topright' });
    button.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');
        // div.innerHTML = '<select><option>1</option><option>2</option><option>3</option></select>';
        div.innerHTML = '<br/><br/><button onclick="jsHaritaFiltre();" style="width:250px;" type="button" class="btn btn-success">Tamam</button>';
        div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
        return div;
    };
    button.addTo(haritaMap);


    var v_PortletYazi = "<div class=\"m-portlet m-portlet--tab\" style=\"width: 250px;\">" +
        "<div class=\"m-portlet__body\" >" +
        "<div class=\"form-group m-form__group row\">" +
        "       <div class=\"col-lg-8\">Çalışma Sayısı</div>" +
        "       <div class=\"col-lg-4\" style=\"text-align: right\"><span id=\"spnProjeSayisi\" name = \"spnProjeSayisi\"></span></div>" +
        "   </div>" +
        "   <div class=\"form-group m-form__group row\">" +
        "       <div class=\"col-lg-8\">Toplam Uzunluk (Km)</div>" +
        "       <div class=\"col-lg-4\" style=\"text-align: right\"><span id=\"spnUzunluk\" name = \"spnUzunluk\"></span></div>" +
        "   </div>" +
        "     </div >" +
        "       </div >";




    var v_Ozet = L.control({ position: 'topright' });
    v_Ozet.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');
        // div.innerHTML = '<select><option>1</option><option>2</option><option>3</option></select>';
        div.innerHTML = v_PortletYazi;
        div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
        return div;
    };
    v_Ozet.addTo(haritaMap);

    haritaMap.on('draw:created', function (e) {

        var type = e.layerType;
        var layer = e.layer;

        var shape = layer.toGeoJSON();
        var shape_for_db = JSON.stringify(shape);
        //debugger;
        //$('#verishape').val(shape);
        $('#verishape_for_db').val(shape_for_db);

        if (type === 'marker') {
            layer.bindPopup('A popup!');
        }

        drawnItems.addLayer(layer);
    });


    //var legendProjeDurum = L.control({ position: 'topright' });
    //legendProjeDurum.onAdd = function (map) {
    //    var div = L.DomUtil.create('div', 'info legend');
    //    // div.innerHTML = '<select><option>1</option><option>2</option><option>3</option></select>';
    //    div.innerHTML = '<br/><br/><select class="form-control m-input" style="width:250px;" id="listeProjeDurumu" onChange="jsProjeDurumuSecildi()" name="listeProjeDurumu"><option value="0">TÜM PROJELER</option><option value="1">KULLANIMDA</option><option value="2">YAPIMI DEVAM ETMEKTE</option><option value="3">İHALE AŞAMASINDA</option><option value="4">PROJELENDİRME AŞAMASINDA</option><option value="5">İPTAL EDİLDİ</option></select>';
    //    div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
    //    return div;
    //};
    ////legendProjeDurum.addTo(haritaMap);


    //var legendProjeTur = L.control({ position: 'topright' });
    //legendProjeTur.onAdd = function (map) {
    //    var div = L.DomUtil.create('div', 'info legend');
    //    // div.innerHTML = '<select><option>1</option><option>2</option><option>3</option></select>';
    //    div.innerHTML = '<br/><br/><select class="form-control m-input" style="width:250px;" id="listeProjeTur" name="listeProjeTur"><option value="0">TÜM PROJELER</option><option value="1">BİSİKLET YOLU</option><option value="2">YEŞİL YÜRÜYÜŞ YOLU</option><option value="3">ÇEVRE DOSTU SOKAK</option><option value="4">BİSİKLET VE YEŞİL YÜRÜYÜŞ YOLU</option><option value="5">GÜRÜLTÜ BARİYERİ</option></select>';
    //    div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
    //    return div;
    //};
    ////legendProjeTur.addTo(haritaMap);

    //   Basla(haritaMap, 0);
    jsSunumHaritaCiz_v2(haritaMap, v_ProjeTuru);
}

function Basla(haritaMap, p_SiraNo) {

    //debugger;
    var v_Guid = "-1";
    var v_KayitSiraNo = 0;


    $.ajax({
        type: "POST",
        url: "api/SunumIlkGuid",

        data: JSON.stringify
            ({
                KayitSiraNo: p_SiraNo
            }),

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        error: function (request, status, error) {

            UyariMesajiVer('Sistemsel bir hata oluştu');
        },
        success: function (msg) {
            //debugger;
            var v_Sonuc = msg.Sonuc;

            if (v_Sonuc == "1") {
                v_Guid = msg.Guid;

                v_KayitSiraNo = msg.KayitSiraNo;
            }
            else {
                v_Guid = "-1";
            }

        },
        complete: function () {
            if (v_Guid != "-1") {
                ProjeBilgiCiz(haritaMap, v_Guid, v_KayitSiraNo);
            }

        }
    });
}


//function old_ProjeBilgiCiz(haritaMap, v_SessionGuid, v_KayitSiraNo) {

//    $.ajax({
//        type: "POST",
//        url: "api/HaritaGoster",

//        data: JSON.stringify
//            ({
//                SessionGuid: v_SessionGuid
//            }),

//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        beforeSend: function () {

//        },
//        error: function (request, status, error) {

//            UyariMesajiVer('Sistemsel bir hata oluştu');
//        },
//        success: function (msg) {

//            var butunVeri = msg.TabloYazisi.split('___');

//            var v_ProjeTuru = msg.ProjeTuru;

//            var v_ProjeDosyasi = msg.ProjeDosyasi;

//            var all_skills = [];
//            //debugger;
//            all_skills = $.parseJSON(butunVeri[0]);

//            //$('#verishape').val(all_skills);
//           //$('#verishape_for_db').val(shape_for_db);


//            // zoom için 
//            var v_Baslangic = [];
//            v_Baslangic.push(all_skills[0]);

//            varBaslangic = L.marker(v_Baslangic);

//            // zoom için 
//            var v_Bitis = [];
//            v_Bitis.push(all_skills[all_skills.length - 1]);
//            varBitis = L.marker(v_Bitis);


//            var BisikletIcon = L.icon({
//                //iconUrl: 'css/projeresim/cycling.png',
//                iconUrl: 'css/projeresim/marker-icon.png',
//                //shadowUrl: 'leaf-shadow.png',

//                iconSize: [25, 41], // size of the icon
//                //shadowSize: [50, 64], // size of the shadow
//                iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
//                // shadowAnchor: [4, 62],  // the same for the shadow
//                popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
//            });

//            var GurultuBariyeriIcon = L.icon({
//               // iconUrl: 'css/projeresim/earthquake.png',
//                iconUrl: 'css/projeresim/marker-icon.png',
//                //shadowUrl: 'leaf-shadow.png',

//                iconSize: [25, 41], // size of the icon
//                //shadowSize: [50, 64], // size of the shadow
//                iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
//                // shadowAnchor: [4, 62],  // the same for the shadow
//                popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
//            });

//            var YuruyusYoluIcon = L.icon({
//                //iconUrl: 'css/projeresim/yuruyus.png',
//                iconUrl: 'css/projeresim/marker-icon.png',
//                //shadowUrl: 'leaf-shadow.png',

//                iconSize: [25, 41], // size of the icon
//                //shadowSize: [50, 64], // size of the shadow
//                iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
//                // shadowAnchor: [4, 62],  // the same for the shadow
//                popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
//            });

//            var iSayac = 1;

//            var customPopup = "Proje Durumu:  <br/>Uzunluk: <br/>";

//            var customOptions =
//            {
//                'maxWidth': '300',
//                'className': 'custom'
//            };



//            // BİSİKLET YOLU
//            if (v_ProjeTuru == '1') {
//                //debugger;
//                v_Polyline = L.polyline(all_skills, { CustomProjeTur: v_ProjeTuru, color: 'green', weight: 5 }).addTo(haritaMap);

//                v_Zoom = L.marker(all_skills[0], { CustomProjeTur: v_ProjeTuru,  CustomId: v_SessionGuid, icon: BisikletIcon }).addTo(haritaMap);

//                v_Zoom.on('click', function (e) {
//                   //   debugger;
//                    //alert(this.options.CustomId);
//                    haritaMap.setView(e.latlng, 13);
//                    //alert(this.options.CustomProjeTur);
//                   fnBilgileriYukle_01(this.options.CustomId);
//                    //fn_test(this.options.CustomProjeTur);
//                    //fnBilgileriYukle_02(this.options.CustomProjeTur);
//                    //v_haritaMap.setView(e.latlng, 13);
//                    //fn_BirimDetayModalAc(e.latlng, this.options.CustomId);

//                });


//               // v_Zoom.bindPopup(customPopup, customOptions).openPopup();

//                for (iSayac = 1; iSayac < butunVeri.length; iSayac++) {
//                    all_skills = $.parseJSON(butunVeri[iSayac]);
//                    //debugger;
//                    L.polyline(all_skills, { color: 'green', weight: 5 }).addTo(haritaMap);
//                }
//            }

//            // YEŞİL YÜRÜYÜŞ YOLU
//            if (v_ProjeTuru == '2') {
//                v_Polyline = L.polyline(all_skills, { CustomProjeTur: v_ProjeTuru, color: 'blue', weight: 5 }).addTo(haritaMap);

//                v_Zoom = L.marker(all_skills[0], { CustomProjeTur: v_ProjeTuru,CustomId: v_SessionGuid,icon: YuruyusYoluIcon }).addTo(haritaMap);
//               // v_Zoom.bindPopup(customPopup, customOptions).openPopup();

//                v_Zoom.on('click', function (e) {
//                    //  debugger;
//                    //alert(this.options.CustomId);
//                    haritaMap.setView(e.latlng, 13);
//                    fnBilgileriYukle_01(this.options.CustomId);
//                    //fn_test(this.options.CustomProjeTur);
//                    //v_haritaMap.setView(e.latlng, 13);
//                    //fn_BirimDetayModalAc(e.latlng, this.options.CustomId);

//                });

//                // haritaMap.fitBounds(varBaslangic.getBounds());

//                for (iSayac = 1; iSayac < butunVeri.length; iSayac++) {
//                    all_skills = $.parseJSON(butunVeri[iSayac]);
//                    //debugger;
//                    L.polyline(all_skills, { color: 'blue', weight: 5 }).addTo(haritaMap);
//                }
//            }



//            // ÇEVRE DOSTU SOKAK
//            if (v_ProjeTuru == '3') {
//                v_Polyline = L.polyline(all_skills, { CustomProjeTur: v_ProjeTuru, color: 'blue', weight: 5 }).addTo(haritaMap);

//                v_Zoom = L.marker(all_skills[0], { CustomProjeTur: v_ProjeTuru, CustomId: v_SessionGuid, icon: YuruyusYoluIcon }).addTo(haritaMap);
//               // v_Zoom.bindPopup(customPopup, customOptions).openPopup();

//                v_Zoom.on('click', function (e) {
//                    //  debugger;
//                    //alert(this.options.CustomId);
//                    haritaMap.setView(e.latlng, 13);
//                    //fn_test(this.options.CustomProjeTur);
//                    fnBilgileriYukle_01(this.options.CustomId);
//                    //v_haritaMap.setView(e.latlng, 13);
//                    //fn_BirimDetayModalAc(e.latlng, this.options.CustomId);

//                });
//                // haritaMap.fitBounds(varBaslangic.getBounds());

//                for (iSayac = 1; iSayac < butunVeri.length; iSayac++) {
//                    all_skills = $.parseJSON(butunVeri[iSayac]);
//                   // debugger;
//                    L.polyline(all_skills, { color: 'blue', weight: 5 }).addTo(haritaMap);
//                }
//            }



//            // GÜRÜLTÜ BARİYERİ
//            if (v_ProjeTuru == '5') {
//                v_Polyline = L.polyline(all_skills, { CustomProjeTur: v_ProjeTuru, color: 'red', weight: 5 }).addTo(haritaMap);

//                v_Zoom = L.marker(all_skills[0], { CustomProjeTur: v_ProjeTuru, CustomId: v_SessionGuid, icon: GurultuBariyeriIcon }).addTo(haritaMap);
//               //v_Zoom.bindPopup(customPopup, customOptions).openPopup();

//                v_Zoom.on('click', function (e) {
//                    //  debugger;
//                    //alert(this.options.CustomId);
//                    haritaMap.setView(e.latlng, 13);
//                   //fn_test(this.options.CustomProjeTur);
//                    fnBilgileriYukle_01(this.options.CustomId);
//                    //fnBilgileriYukle_02(this.options.CustomProjeTur);
//                    //v_haritaMap.setView(e.latlng, 13);
//                    //fn_BirimDetayModalAc(e.latlng, this.options.CustomId);

//                });

//                // haritaMap.fitBounds(varBaslangic.getBounds());

//                for (iSayac = 1; iSayac < butunVeri.length; iSayac++) {
//                    all_skills = $.parseJSON(butunVeri[iSayac]);
//                   // debugger;
//                    L.polyline(all_skills, { color: 'red', weight: 5 }).addTo(haritaMap);
//                }
//            }
//        },
//        complete: function () {

//           // Basla(haritaMap, v_KayitSiraNo);

//            haritaMap.eachLayer(function (layer) {
//                //debugger;
//                // Check if layer is a marker
//                if (layer instanceof L.Polyline) {

//                    // Create GeoJSON object from marker
//                    var geojson = layer.toGeoJSON();
//                    // Push GeoJSON object to collection
//                    collection.features.push(geojson);
//                }
//            });
//            //debugger;
//           // $('#verishape').val(collection);
//        }
//    });
//}


function fn_SunumYamaHarita(haritaMap) {

    $.ajax({
        type: "POST",
        url: "api/SunumParcaHarita",

        data: JSON.stringify
            ({
                KayitSiraNo: -89,
                ProjeTuru: '0',
                zSessionGuid: '0'
            }),

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        error: function (request, status, error) {

            UyariMesajiVer('Sistemsel bir hata oluştu');
        },

        success: function (msg) {
            //debugger;
            if (msg.Sonuc == "1") {
                var vYanitDizi = msg.Dizi;

                var vSayac = 1;

                var content = '';

                for (var iSiraTakip = 0; iSiraTakip < vYanitDizi.length; iSiraTakip++) {
                    var butunVeri = vYanitDizi[iSiraTakip].TabloYazisi.split('___');

                    var v_ProjeTuru = vYanitDizi[iSiraTakip].ProjeTuru;

                    var v_Uzunluk = vYanitDizi[iSiraTakip].zUzunluk;

                    var v_ProjeDurum = vYanitDizi[iSiraTakip].zProjeDurumu;
                    var v_SehirId = vYanitDizi[iSiraTakip].zSehirId;
                    var v_AnaDosya = vYanitDizi[iSiraTakip].zAnaProje;

                    var v_SessionGuid = vYanitDizi[iSiraTakip].SessionGuid;

                    var all_skills = [];
                    //debugger;
                    all_skills = $.parseJSON(butunVeri[0]);

                    // zoom için 
                    var v_Baslangic = [];
                    v_Baslangic.push(all_skills[0]);

                    varBaslangic = L.marker(v_Baslangic);

                    // zoom için 
                    var v_Bitis = [];
                    v_Bitis.push(all_skills[all_skills.length - 1]);
                    varBitis = L.marker(v_Bitis);


                    var GizliIcon = L.icon({

                        iconUrl: 'css/projeresim/marker-icon.png',
                        iconSize: [0, 0],
                        iconAnchor: [0, 0],
                        popupAnchor: [-3, -76]
                    });

                    var iSayac = 1;

                    // BİSİKLET YOLU
                    if (v_ProjeTuru == '1') {
                        //debugger;
                        v_Polyline = L.polyline(all_skills, { CustomSehirId: v_SehirId, CustomAnaDosya: v_AnaDosya, CustomProjeDurum: v_ProjeDurum, CustomUzunluk: v_Uzunluk, CustomProjeTur: v_ProjeTuru, color: 'green', weight: 5 }).addTo(haritaMap);
                        DiziPolygon.push(v_Polyline);

                        v_Zoom = L.marker(all_skills[0], { CustomSehirId: v_SehirId,CustomAnaDosya: v_AnaDosya, CustomProjeTur: v_ProjeTuru, CustomId: v_SessionGuid, icon: GizliIcon }).addTo(haritaMap);
                        markers.push(v_Zoom);

                        for (iSayac = 1; iSayac < butunVeri.length; iSayac++) {
                            all_skills = $.parseJSON(butunVeri[iSayac]);
                            //debugger;
                            v_Polyline = L.polyline(all_skills, { color: 'green', weight: 5 }).addTo(haritaMap);
                            DiziPolygon.push(v_Polyline);

                        }
                    }

                    // YEŞİL YÜRÜYÜŞ YOLU
                    if (v_ProjeTuru == '2') {
                        v_Polyline = L.polyline(all_skills, { CustomSehirId: v_SehirId, CustomAnaDosya: v_AnaDosya, CustomProjeDurum: v_ProjeDurum, CustomUzunluk: v_Uzunluk, CustomProjeTur: v_ProjeTuru, color: 'blue', weight: 5 }).addTo(haritaMap);
                        DiziPolygon.push(v_Polyline);

                        v_Zoom = L.marker(all_skills[0], { CustomSehirId: v_SehirId,CustomAnaDosya: v_AnaDosya, CustomProjeTur: v_ProjeTuru, CustomId: v_SessionGuid, icon: GizliIcon }).addTo(haritaMap);
                        // v_Zoom.bindPopup(customPopup, customOptions).openPopup();
                        markers.push(v_Zoom);

                        for (iSayac = 1; iSayac < butunVeri.length; iSayac++) {
                            all_skills = $.parseJSON(butunVeri[iSayac]);
                            //debugger;
                            v_Polyline = L.polyline(all_skills, { color: 'blue', weight: 5 }).addTo(haritaMap);
                            DiziPolygon.push(v_Polyline);

                        }
                    }



                    // ÇEVRE DOSTU SOKAK
                    if (v_ProjeTuru == '3') {
                        v_Polyline = L.polyline(all_skills, { CustomSehirId: v_SehirId,CustomAnaDosya: v_AnaDosya, CustomProjeDurum: v_ProjeDurum, CustomUzunluk: v_Uzunluk, CustomProjeTur: v_ProjeTuru, color: 'blue', weight: 5 }).addTo(haritaMap);
                        DiziPolygon.push(v_Polyline);

                        v_Zoom = L.marker(all_skills[0], { CustomSehirId: v_SehirId,CustomAnaDosya: v_AnaDosya, CustomProjeTur: v_ProjeTuru, CustomId: v_SessionGuid, icon: GizliIcon }).addTo(haritaMap);
                        // v_Zoom.bindPopup(customPopup, customOptions).openPopup();
                        markers.push(v_Zoom);

                        for (iSayac = 1; iSayac < butunVeri.length; iSayac++) {
                            all_skills = $.parseJSON(butunVeri[iSayac]);
                            // debugger;
                            v_Polyline = L.polyline(all_skills, { color: 'blue', weight: 5 }).addTo(haritaMap);
                            DiziPolygon.push(v_Polyline);
                        }
                    }



                    // BİSİKLET VE YEŞİL YÜRÜYÜŞ YOLU
                    if (v_ProjeTuru == '4') {
                        v_Polyline = L.polyline(all_skills, { CustomSehirId: v_SehirId,CustomAnaDosya: v_AnaDosya, CustomProjeDurum: v_ProjeDurum, CustomUzunluk: v_Uzunluk, CustomProjeTur: v_ProjeTuru, color: 'purple', weight: 5 }).addTo(haritaMap);
                        DiziPolygon.push(v_Polyline);

                        v_Zoom = L.marker(all_skills[0], { CustomSehirId: v_SehirId,CustomAnaDosya: v_AnaDosya, CustomProjeTur: v_ProjeTuru, CustomId: v_SessionGuid, icon: GizliIcon }).addTo(haritaMap);
                        // v_Zoom.bindPopup(customPopup, customOptions).openPopup();
                        markers.push(v_Zoom);



                        for (iSayac = 1; iSayac < butunVeri.length; iSayac++) {
                            all_skills = $.parseJSON(butunVeri[iSayac]);
                            // debugger;
                            v_Polyline = L.polyline(all_skills, { color: 'purple', weight: 5 }).addTo(haritaMap);
                            DiziPolygon.push(v_Polyline);
                        }
                    }



                    // GÜRÜLTÜ BARİYERİ
                    if (v_ProjeTuru == '5') {
                        v_Polyline = L.polyline(all_skills, { CustomSehirId: v_SehirId, CustomAnaDosya: v_AnaDosya, CustomProjeDurum: v_ProjeDurum, CustomUzunluk: v_Uzunluk, CustomProjeTur: v_ProjeTuru, color: 'red', weight: 5 }).addTo(haritaMap);
                        DiziPolygon.push(v_Polyline);

                        v_Zoom = L.marker(all_skills[0], { CustomSehirId: v_SehirId, CustomAnaDosya: v_AnaDosya, CustomProjeTur: v_ProjeTuru, CustomId: v_SessionGuid, icon: GizliIcon }).addTo(haritaMap);
                        //v_Zoom.bindPopup(customPopup, customOptions).openPopup();
                        markers.push(v_Zoom);


                        // haritaMap.fitBounds(varBaslangic.getBounds());

                        for (iSayac = 1; iSayac < butunVeri.length; iSayac++) {
                            all_skills = $.parseJSON(butunVeri[iSayac]);
                            // debugger;
                            v_Polyline = L.polyline(all_skills, { color: 'red', weight: 5 }).addTo(haritaMap);
                            DiziPolygon.push(v_Polyline);
                        }
                    }
                }
            }

        },



        complete: function () {

            haritaMap.setView([39.848637, 32.900169], 7);

            jsHaritaFiltre();

        }
    });


}






function jsSunumHaritaCiz_v2(haritaMap, v_ProjeTuru) {
    $.ajax({
        type: "POST",
        url: "api/TamHarita",

        data: JSON.stringify
            ({
                KayitSiraNo: -89,
                ProjeTuru: v_ProjeTuru,
                zSessionGuid:'0'
            }),

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            //$(".leaflet-marker-icon").remove();
            //$(".leaflet-popup").remove();
        },
        error: function (request, status, error) {

            UyariMesajiVer('Sistemsel bir hata oluştu');
        },
        success: function (msg) {
           // debugger;
            if (msg.Sonuc == "1") {
                var vYanitDizi = msg.Dizi;

                var vSayac = 1;

                var content = '';

                for (var iSiraTakip = 0; iSiraTakip < vYanitDizi.length; iSiraTakip++) {
                    var butunVeri = vYanitDizi[iSiraTakip].TabloYazisi.split('___');

                    var v_ProjeTuru = vYanitDizi[iSiraTakip].ProjeTuru;

                    var v_Uzunluk = vYanitDizi[iSiraTakip].zUzunluk;

                    var v_ProjeDurum = vYanitDizi[iSiraTakip].zProjeDurumu;
                    var v_SehirId = vYanitDizi[iSiraTakip].zSehirId;
                    var v_AnaDosya = vYanitDizi[iSiraTakip].zAnaProje;

                    var v_SessionGuid = vYanitDizi[iSiraTakip].SessionGuid;

                    var all_skills = [];
                    //debugger;
                    all_skills = $.parseJSON(butunVeri[0]);

                    // zoom için 
                    var v_Baslangic = [];
                    v_Baslangic.push(all_skills[0]);

                    varBaslangic = L.marker(v_Baslangic);

                    // zoom için 
                    var v_Bitis = [];
                    v_Bitis.push(all_skills[all_skills.length - 1]);
                    varBitis = L.marker(v_Bitis);


                    var BisikletIcon = L.icon({
                        //iconUrl: 'css/projeresim/cycling.png',
                        iconUrl: 'css/projeresim/marker-icon.png',
                        //shadowUrl: 'leaf-shadow.png',

                        iconSize: [25, 41], // size of the icon
                        //shadowSize: [50, 64], // size of the shadow
                        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                        // shadowAnchor: [4, 62],  // the same for the shadow
                        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                    });

                    var GurultuBariyeriIcon = L.icon({
                        iconUrl: 'css/projeresim/marker-icon.png',
                        //iconUrl: 'css/projeresim/earthquake.png',
                        //shadowUrl: 'leaf-shadow.png',

                        iconSize: [25, 41], // size of the icon
                        //shadowSize: [50, 64], // size of the shadow
                        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                        // shadowAnchor: [4, 62],  // the same for the shadow
                        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                    });

                    var YuruyusYoluIcon = L.icon({
                        iconUrl: 'css/projeresim/marker-icon.png',
                        //iconUrl: 'css/projeresim/yuruyus.png',
                        //shadowUrl: 'leaf-shadow.png',

                        iconSize: [25, 41], // size of the icon
                        //shadowSize: [50, 64], // size of the shadow
                        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
                        // shadowAnchor: [4, 62],  // the same for the shadow
                        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
                    });

                    var iSayac = 1;

                   


                    // BİSİKLET YOLU
                    if (v_ProjeTuru == '1') {
                        //debugger;
                        v_Polyline = L.polyline(all_skills, { CustomSehirId: v_SehirId, CustomAnaDosya:v_AnaDosya, CustomProjeDurum : v_ProjeDurum, CustomUzunluk: v_Uzunluk, CustomProjeTur: v_ProjeTuru, color: 'green', weight: 5 }).addTo(haritaMap);
                        DiziPolygon.push(v_Polyline);

                        v_Zoom = L.marker(all_skills[0], { CustomSehirId: v_SehirId,CustomAnaDosya: v_AnaDosya,  CustomProjeTur: v_ProjeTuru, CustomId: v_SessionGuid, icon: BisikletIcon }).addTo(haritaMap);
                        markers.push(v_Zoom);

                        v_Zoom.on('click', function (e) {
                            //  debugger;
                            //alert(this.options.CustomId);
                            haritaMap.setView(e.latlng, 13);
                            //fn_test(this.options.CustomProjeTur);
                            fnBilgileriYukle_01(this.options.CustomId);
                            //v_haritaMap.setView(e.latlng, 13);
                            //fn_BirimDetayModalAc(e.latlng, this.options.CustomId);

                        });


                        // v_Zoom.bindPopup(customPopup, customOptions).openPopup();

                        for (iSayac = 1; iSayac < butunVeri.length; iSayac++) {
                            all_skills = $.parseJSON(butunVeri[iSayac]);
                            //debugger;
                            v_Polyline = L.polyline(all_skills, { color: 'green', weight: 5 }).addTo(haritaMap);
                            DiziPolygon.push(v_Polyline);

                        }
                    }

                    // YEŞİL YÜRÜYÜŞ YOLU
                    if (v_ProjeTuru == '2') {
                        v_Polyline = L.polyline(all_skills, { CustomSehirId: v_SehirId, CustomAnaDosya: v_AnaDosya, CustomProjeDurum: v_ProjeDurum, CustomUzunluk: v_Uzunluk, CustomProjeTur: v_ProjeTuru, color: 'blue', weight: 5 }).addTo(haritaMap);
                        DiziPolygon.push(v_Polyline);

                        v_Zoom = L.marker(all_skills[0], { CustomSehirId: v_SehirId,CustomAnaDosya: v_AnaDosya, CustomProjeTur: v_ProjeTuru, CustomId: v_SessionGuid, icon: YuruyusYoluIcon }).addTo(haritaMap);
                        // v_Zoom.bindPopup(customPopup, customOptions).openPopup();
                        markers.push(v_Zoom);
                        v_Zoom.on('click', function (e) {
                            //  debugger;
                            //alert(this.options.CustomId);
                            haritaMap.setView(e.latlng, 13);
                            // fn_test(this.options.CustomProjeTur);
                            fnBilgileriYukle_01(this.options.CustomId);
                            //v_haritaMap.setView(e.latlng, 13);
                            //fn_BirimDetayModalAc(e.latlng, this.options.CustomId);

                        });

                        // haritaMap.fitBounds(varBaslangic.getBounds());

                        for (iSayac = 1; iSayac < butunVeri.length; iSayac++) {
                            all_skills = $.parseJSON(butunVeri[iSayac]);
                            //debugger;
                            v_Polyline = L.polyline(all_skills, { color: 'blue', weight: 5 }).addTo(haritaMap);
                            DiziPolygon.push(v_Polyline);

                        }
                    }



                    // ÇEVRE DOSTU SOKAK
                    if (v_ProjeTuru == '3') {
                        v_Polyline = L.polyline(all_skills, { CustomSehirId: v_SehirId,CustomAnaDosya: v_AnaDosya, CustomProjeDurum: v_ProjeDurum, CustomUzunluk: v_Uzunluk, CustomProjeTur: v_ProjeTuru, color: 'blue', weight: 5 }).addTo(haritaMap);
                        DiziPolygon.push(v_Polyline);

                        v_Zoom = L.marker(all_skills[0], { CustomSehirId: v_SehirId, CustomAnaDosya: v_AnaDosya, CustomProjeTur: v_ProjeTuru, CustomId: v_SessionGuid, icon: YuruyusYoluIcon }).addTo(haritaMap);
                        // v_Zoom.bindPopup(customPopup, customOptions).openPopup();
                        markers.push(v_Zoom);
                        v_Zoom.on('click', function (e) {
                            //  debugger;
                            //alert(this.options.CustomId);
                            haritaMap.setView(e.latlng, 13);
                            //fn_test(this.options.CustomProjeTur);
                            fnBilgileriYukle_01(this.options.CustomId);
                            //v_haritaMap.setView(e.latlng, 13);
                            //fn_BirimDetayModalAc(e.latlng, this.options.CustomId);

                        });
                        // haritaMap.fitBounds(varBaslangic.getBounds());

                        for (iSayac = 1; iSayac < butunVeri.length; iSayac++) {
                            all_skills = $.parseJSON(butunVeri[iSayac]);
                            // debugger;
                            v_Polyline = L.polyline(all_skills, { color: 'blue', weight: 5 }).addTo(haritaMap);
                            DiziPolygon.push(v_Polyline);
                        }
                    }



                    // BİSİKLET VE YEŞİL YÜRÜYÜŞ YOLU
                    if (v_ProjeTuru == '4') {
                        v_Polyline = L.polyline(all_skills, { CustomSehirId: v_SehirId, CustomAnaDosya: v_AnaDosya, CustomProjeDurum: v_ProjeDurum, CustomUzunluk: v_Uzunluk, CustomProjeTur: v_ProjeTuru, color: 'purple', weight: 5 }).addTo(haritaMap);
                        DiziPolygon.push(v_Polyline);

                        v_Zoom = L.marker(all_skills[0], { CustomSehirId: v_SehirId, CustomAnaDosya: v_AnaDosya, CustomProjeTur: v_ProjeTuru, CustomId: v_SessionGuid, icon: YuruyusYoluIcon }).addTo(haritaMap);
                        // v_Zoom.bindPopup(customPopup, customOptions).openPopup();
                        markers.push(v_Zoom);
                        v_Zoom.on('click', function (e) {
                            //  debugger;
                            //alert(this.options.CustomId);
                            haritaMap.setView(e.latlng, 13);
                            //fn_test(this.options.CustomProjeTur);
                            fnBilgileriYukle_01(this.options.CustomId);
                            //v_haritaMap.setView(e.latlng, 13);
                            //fn_BirimDetayModalAc(e.latlng, this.options.CustomId);

                        });
                        // haritaMap.fitBounds(varBaslangic.getBounds());

                        for (iSayac = 1; iSayac < butunVeri.length; iSayac++) {
                            all_skills = $.parseJSON(butunVeri[iSayac]);
                            // debugger;
                            v_Polyline = L.polyline(all_skills, { color: 'purple', weight: 5 }).addTo(haritaMap);
                            DiziPolygon.push(v_Polyline);
                        }
                    }



                    // GÜRÜLTÜ BARİYERİ
                    if (v_ProjeTuru == '5') {
                        v_Polyline = L.polyline(all_skills, { CustomSehirId: v_SehirId, CustomAnaDosya: v_AnaDosya, CustomProjeDurum: v_ProjeDurum,  CustomUzunluk: v_Uzunluk, CustomProjeTur: v_ProjeTuru, color: 'red', weight: 5 }).addTo(haritaMap);
                        DiziPolygon.push(v_Polyline);

                        v_Zoom = L.marker(all_skills[0], { CustomSehirId: v_SehirId,CustomAnaDosya: v_AnaDosya, CustomProjeTur: v_ProjeTuru, CustomId: v_SessionGuid, icon: GurultuBariyeriIcon }).addTo(haritaMap);
                        //v_Zoom.bindPopup(customPopup, customOptions).openPopup();
                        markers.push(v_Zoom);
                        v_Zoom.on('click', function (e) {
                            //  debugger;
                            //alert(this.options.CustomId);
                            haritaMap.setView(e.latlng, 13);
                            //fn_test(this.options.CustomProjeTur);
                            fnBilgileriYukle_01(this.options.CustomId);
                            //v_haritaMap.setView(e.latlng, 13);
                            //fn_BirimDetayModalAc(e.latlng, this.options.CustomId);

                        });

                        // haritaMap.fitBounds(varBaslangic.getBounds());

                        for (iSayac = 1; iSayac < butunVeri.length; iSayac++) {
                            all_skills = $.parseJSON(butunVeri[iSayac]);
                            // debugger;
                            v_Polyline = L.polyline(all_skills, { color: 'red', weight: 5 }).addTo(haritaMap);
                            DiziPolygon.push(v_Polyline);
                        }
                    }
                }
                // $('#tabloEkliDosyalar tbody').html(content);
            }

        },
        complete: function () {

            fn_SunumYamaHarita(haritaMap);

            //haritaMap.setView([39.848637, 32.900169], 7);

            //jsHaritaFiltre();
            //haritaMap.setView(e.latlng, 13);

            //if (v_Guid != "-1") {
            //    ProjeBilgiCiz(haritaMap, v_Guid, v_KayitSiraNo);
            //}

        }
    });

}