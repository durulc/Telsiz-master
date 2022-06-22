$(document).ready(function () {
   
    fn_HaritaOlustur_v3();


    

});

function jsCizimKayit()
{
    var v_Deger = $("#pointsTextArea").val();

    if (v_Deger.length ==0) {
        alert("Lütfen harita çizimi tamamlayınız");
        return false;
    }

    if (v_Deger.length != 0)
    {
        $.ajax({
            type: "POST",
            url: "api/ProjeKoordinatKayit",
            data: JSON.stringify
                ({
                    zKoordinatlar: v_Deger,
                    zProjeNo: getParameterByName('zProjeNo')

                }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                //   debugger;
            },
            error: function (request, status, error) {
                alert('Sistemsel bir hata oluştu');
            },
            success: function (msg) {

                debugger;

                if (msg.Sonuc == "1") {

                    alert('İşlem Başarılı');
                    //swal({
                    //    buttons: {
                    //        confirm: "TAMAM"
                    //    },
                    //    title: "İşlem Tamamlandı",
                    //    text: "Proje verileri başarı ile kayıt edildi",
                    //    icon: "success",
                    //    dangerMode: false
                    //})
                    //    .then((willDelete) => {
                    //        window.location.href = 'bilgigirisi.aspx';
                    //    });
                }
                else {
                    alert('Sistemsel bir hata oluştu');
                }
            },
            complete: function () {

            }
        });
    }
}



function fn_HaritaOlustur_v3() {
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        //osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        osmAttrib = '&nbsp;&nbsp;&nbsp;',
        osm = L.tileLayer(osmUrl, { maxZoom: 30, attribution: osmAttrib }),
        haritaMap = new L.Map('map', { layers: [osm], center: new L.LatLng(37.366290, 33.839601), zoom: 5 });

    var drawnItems = new L.FeatureGroup();

    haritaMap.addLayer(drawnItems);



    //$("#btnGoster").click(function () {
    //    alert('1');
    //    var pointsTextArea = document.getElementById('pointsTextArea');

    //    pointsTextArea.innerHTML = '';

    //    haritaMap.getEditablePolylines().forEach(function (polyline) {
    //        var points = polyline.getPoints();
    //        debugger;

    //        points.forEach(function (point) {
    //            var latLng = point.getLatLng();

    //            //console.log(point.context);
    //            pointsTextArea.innerHTML += 'originalPointNo=' + (point.context ? point.context.originalPointNo : null)
    //                + ' originalPolylineNo=' + (point.context ? point.context.originalPolylineNo : null)
    //                + ' (' + latLng.lat + ',' + latLng.lng + ')\n';
    //            + '\n';
    //        });
    //        pointsTextArea.innerHTML += '----------------------------------------------------------------------------------------------------\n';
    //    });
    //}); 



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


    var drawControl = new L.Control.Draw({
        position: 'topleft',
        draw:
        {
            polyline:
            {
                metric: true,
                //color:'#0000FF'
                shapeOptions: {
                    color: '#0000FF'
                }
            },
            polygon: false,
            circle: false,
            rectangle: false,
            //polygon: {

            //    allowIntersection: false,
            //    showArea: true,
            //    drawError: {
            //        color: '#b00b00',
            //        timeout: 1000
            //    },
            //    shapeOptions: {
            //        color: '#bada55'
            //    }
            //},
            //circle: {
            //    shapeOptions: {
            //        color: '#662d91'
            //    }
            //},
            marker: false
        }

        //edit:
        //{
        //    featureGroup: drawnItems,
        //    toolbar: {
        //        actions: {
        //            save: {
        //                title: 'Save changes',
        //                text: 'Save'
        //            },
        //            cancel: {
        //                title: 'Cancel editing, discards all changes',
        //                text: 'Cancel'
        //            },
        //            clearAll: {
        //                title: 'Clear all layers',
        //                text: 'Clear All'
        //            }
        //        },
        //        buttons: {
        //            edit: 'Edit layers',
        //            editDisabled: 'No layers to edit',
        //            remove: 'Delete layers',
        //            removeDisabled: 'No layers to delete'
        //        }
        //    },
        //    handlers: {
        //        edit: {
        //            tooltip: {
        //                text: 'Drag handles or markers to edit features.',
        //                subtext: 'Click cancel to undo changes.'
        //            }
        //        },
        //        remove: {
        //            tooltip: {
        //                text: 'Silmek için tıkla.'
        //            }
        //        }
        //    }
        //}

        //edit: {
        //    featureGroup: drawnItems,





        //}
    });
    haritaMap.addControl(drawControl);


    //haritaMap.on(L.Draw.Event.CREATED, function (e) {
    //    var layer = e.layer;
    //    drawnItems.addLayer(layer);
    //    console.log(layer.getLatLngs());
    //    alert(layer.getLatLngs());
    //});


    L.drawLocal.draw.toolbar.buttons.polygon = 'Türkiye Cumhuriyeti Çevre, Şehircilik ve İklim Değişikliği Bakanlığı';

    L.control.mousePosition().addTo(haritaMap);

    haritaMap.addControl(new L.Control.Fullscreen({
        title: {
            'false': 'View Fullscreen',
            'true': 'Exit Fullscreen'
        }
    }));
  




    //var legendSehir = L.control({ position: 'topright' });
    //legendSehir.onAdd = function (map) {
    //    var div = L.DomUtil.create('div', 'info legend');
    //    // div.innerHTML = '<select><option>1</option><option>2</option><option>3</option></select>';
    //    div.innerHTML = '<select class="form-control m-input" style="width:250px;"  id="listeIl" name="listeIl"> <option value="0">TÜM ŞEHİRLER</option><option value="1">ADANA</option><option value="2">ADIYAMAN</option><option value="3">AFYON</option><option value="4">AĞRI</option><option value="68">AKSARAY</option><option value="5">AMASYA</option><option value="6">ANKARA</option><option value="7">ANTALYA</option><option value="75">ARDAHA</option><option value="8">ARTVİN</option><option value="9">AYDIN</option><option value="10">BALIKESİR</option><option value="74">BARTI</option><option value="72">BATMA</option><option value="69">BAYBURT</option><option value="11">BİLECİK</option><option value="12">BİNGÖL</option><option value="13">BİTLİS</option><option value="14">BOLU</option><option value="15">BURDUR</option><option value="16">BURSA</option><option value="17">ÇANAKKALE</option><option value="18">ÇANKIRI</option><option value="19">ÇORUM</option><option value="20">DENİZLİ</option><option value="21">DİYARBAKIR</option><option value="81">DÜZCE</option><option value="22">EDİRNE</option><option value="23">ELAZIĞ</option><option value="24">ERZİNCA</option><option value="25">ERZURUM</option><option value="26">ESKİŞEHİR</option><option value="27">GAZİANTEP</option><option value="28">GİRESU</option><option value="29">GÜMÜŞHANE</option><option value="30">HAKKARİ</option><option value="31">HATAY</option><option value="76">IĞDIR</option><option value="32">ISPARTA</option><option value="33">İÇEL</option><option value="34">İSTANBUL</option><option value="35">İZMİR</option><option value="46">KAHRAMANMARAŞ</option><option value="78">KARABÜK</option><option value="70">KARAMA</option><option value="36">KARS</option><option value="37">KASTAMONU</option><option value="38">KAYSERİ</option><option value="71">KIRIKKALE</option><option value="39">KIRKLARELİ</option><option value="40">KIRŞEHİR</option><option value="79">KİLİS</option><option value="41">KOCAELİ</option><option value="42">KONYA</option><option value="43">KÜTAHYA</option><option value="44">MALATYA</option><option value="45">MANİSA</option><option value="47">MARDİ</option><option value="48">MUĞLA</option><option value="49">MUŞ</option><option value="50">NEVŞEHİR</option><option value="51">NİĞDE</option><option value="52">ORDU</option><option value="80">OSMANİYE</option><option value="53">RİZE</option><option value="54">SAKARYA</option><option value="55">SAMSU</option><option value="56">SİİRT</option><option value="57">SİNOP</option><option value="58">SİVAS</option><option value="63">ŞANLIURFA</option><option value="73">ŞIRNAK</option><option value="59">TEKİRDAĞ</option><option value="60">TOKAT</option><option value="61">TRABZO</option><option value="62">TUNCELİ</option><option value="64">UŞAK</option><option value="65">VA</option><option value="77">YALOVA</option><option value="66">YOZGAT</option><option value="67">ZONGULDAK</option></select>';
    //    div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
    //    return div;
    //};
    //legendSehir.addTo(haritaMap);


    var button = L.control({ position: 'topright' });
    button.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');
        // div.innerHTML = '<select><option>1</option><option>2</option><option>3</option></select>';
        div.innerHTML = '<br/><br/><button onclick=jsCizimKayit();"" type="button" class="btn btn-success">ÇİZİMİ KAYDET</button>';
        div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
        return div;
    };
    button.addTo(haritaMap);

      //var button_1 = new L.Control.Button('Click me');
      //  button_1.addTo(haritaMap);
      //  button_1.on('click', function () {
      //      alert('you clicked the button!');
      //  });






    haritaMap.on('draw:created', function (e) {      

        var type = e.layerType,
            layer = e.layer;

        if (type === 'marker') {
            layer.bindPopup('A popup!');
        }

        if (type === 'polyline') {
          
            var Sayi = e.layer._latlngs.length;

            var Yazi = "";

            for (var iSayac = 0; iSayac < Sayi; iSayac=iSayac+2)
            {
                Yazi += "[" + e.layer._latlngs[iSayac].lat + "," + e.layer._latlngs[iSayac].lng + "]-";
            }

            //$("#pointsTextArea").va(Yazi.slice(0, -1));
            document.getElementById("pointsTextArea").value = Yazi.slice(0, -1);
        }

        drawnItems.addLayer(layer);
    });
}