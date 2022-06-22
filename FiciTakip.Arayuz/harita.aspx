<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="harita.aspx.cs" Inherits="FiciTakip.Arayuz.harita" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">

    <style>
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background: rgba( 255, 255, 255, .8 ) url('resimler/ajax-loader.gif') 50% 50% no-repeat;
        }

        /* When the body has the loading class, we turn the scrollbar off with overflow:hidden */
        body.loading .modal {
            overflow: hidden;
        }

        /* Anytime the body has the loading class, our modal element will be visible */
        body.loading .modal {
            display: block;
        }
    </style>


    <title>Harita</title>


    <link rel="stylesheet" href="Css/leaflet.css" />
    <link rel="stylesheet" href="Css/leaflet.fullscreen.css" />


   <%-- <script type="text/javascript" src="Javascript/haritacizim/L.Control.Button.js"></script>--%>
    <script type="text/javascript" src="Javascript/Leaflet/leaflet.js"></script>
    <script type="text/javascript" src="Javascript/Leaflet/Leaflet.fullscreen.min.js"></script>
    <script type="text/javascript" src="Javascript/Leaflet/L.KML.js"></script>
    <script type="text/javascript" src="Javascript/Leaflet/jsEditable.js"></script>

    <link rel="stylesheet" href="Css/leaflet.draw.css" />

    <script src="Javascript/Leaflet/leaflet.draw.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js"></script>
    <script>
        WebFont.load({
            google: { "families": ["Poppins:300,400,500,600,700", "Roboto:300,400,500,600,700"] },
            active: function () {
                sessionStorage.fonts = true;
            }
        });
    </script>

    <link href="theme/vendors/perfect-scrollbar/css/perfect-scrollbar.css" rel="stylesheet" type="text/css" />

    <!--end:: Global Mandatory Vendors -->
    <!--begin:: Global Optional Vendors -->
    <link href="theme/vendors/tether/dist/css/tether.css" rel="stylesheet" type="text/css" />
    <link href="theme/vendors/bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css" rel="stylesheet" type="text/css" />
    <link href="theme/vendors/bootstrap-datetime-picker/css/bootstrap-datetimepicker.min.css" rel="stylesheet" type="text/css" />
    <link href="theme/vendors/bootstrap-timepicker/css/bootstrap-timepicker.min.css" rel="stylesheet" type="text/css" />
    <link href="theme/vendors/bootstrap-daterangepicker/daterangepicker.css" rel="stylesheet" type="text/css" />
    <link href="theme/vendors/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.css" rel="stylesheet" type="text/css" />
    <link href="theme/vendors/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css" rel="stylesheet" type="text/css" />
    <link href="theme/vendors/bootstrap-select/dist/css/bootstrap-select.css" rel="stylesheet" type="text/css" />
    <link href="theme/vendors/select2/dist/css/select2.css" rel="stylesheet" type="text/css" />
    <link href="theme/vendors/nouislider/distribute/nouislider.css" rel="stylesheet" type="text/css" />
    <link href="theme/vendors/owl.carousel/dist/assets/owl.carousel.css" rel="stylesheet" type="text/css" />
    <link href="theme/vendors/owl.carousel/dist/assets/owl.theme.default.css" rel="stylesheet" type="text/css" />
    <link href="theme/vendors/ion-rangeslider/css/ion.rangeSlider.css" rel="stylesheet" type="text/css" />
    <link href="theme/vendors/ion-rangeslider/css/ion.rangeSlider.skinFlat.css" rel="stylesheet" type="text/css" />
    <link href="theme/vendors/dropzone/dist/dropzone.css" rel="stylesheet" type="text/css" />
    <link href="theme/vendors/summernote/dist/summernote.css" rel="stylesheet" type="text/css" />
    <link href="theme/vendors/bootstrap-markdown/css/bootstrap-markdown.min.css" rel="stylesheet" type="text/css" />
    <link href="theme/vendors/animate.css/animate.css" rel="stylesheet" type="text/css" />
    <link href="theme/vendors/toastr/build/toastr.css" rel="stylesheet" type="text/css" />
    <link href="theme/vendors/jstree/dist/themes/default/style.css" rel="stylesheet" type="text/css" />
    <link href="theme/vendors/morris.js/morris.css" rel="stylesheet" type="text/css" />
    <link href="theme/vendors/chartist/dist/chartist.min.css" rel="stylesheet" type="text/css" />
    <%--<link href="theme/vendors/sweetalert2/dist/sweetalert2.min.css" rel="stylesheet" type="text/css" />--%>
    <link href="theme/vendors/socicon/css/socicon.css" rel="stylesheet" type="text/css" />
    <link href="theme/vendors/vendors/line-awesome/css/line-awesome.css" rel="stylesheet" type="text/css" />
    <link href="theme/vendors/vendors/flaticon/css/flaticon.css" rel="stylesheet" type="text/css" />
    <link href="theme/vendors/vendors/metronic/css/styles.css" rel="stylesheet" type="text/css" />
    <link href="theme/vendors/vendors/fontawesome5/css/all.min.css" rel="stylesheet" type="text/css" />

    <!--end:: Global Optional Vendors -->
    <!--begin::Global Theme Styles -->
    <link href="theme/assets/demo/base/style.bundle.css" rel="stylesheet" type="text/css" />

    <!--RTL version:<link href="theme/assets/demo/base/style.bundle.rtl.css" rel="stylesheet" type="text/css" />-->
    <!--end::Global Theme Styles -->
    <!--begin::Page Vendors Styles -->
    <link href="theme/assets/vendors/custom/fullcalendar/fullcalendar.bundle.css" rel="stylesheet" type="text/css" />



</head>
<body onload="fn_HaritaCiz();">
    <form id="form1" runat="server">



        <div  id="map" style="height: 600px !important;"></div>

        
        <div class="modal fade" data-backdrop="static" id="modal_Proje_Bilgi" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Çalışma Bilgileri</h5>
                        <img src="resimler/close.png" style="cursor: pointer !important;" data-dismiss="modal" class="close" />

                        <%--<button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>--%>
                    </div>
                    <div class="modal-body">
                        <%--<div class="form-group m-form__group row">
                            <div class="col-lg-12">
                                <h6><%=Resources.Resource.page_002_yazi_12 %></h6>
                                <input type="text" autocomplete="off" class="form-control m-input" name="txtUpdateEyaletAdi" id="txtUpdateEyaletAdi" placeholder="<%=Resources.Resource.page_002_yazi_12 %>" />
                                <input type="text" name="txtUpdateID" id="txtUpdateID" readonly="readonly" style="display: none;" />
                            </div>
                        </div>--%>




                        <div class="m-portlet">

                            <div class="m-portlet__body">
                                <ul class="nav nav-tabs" role="tablist">                                   
                                   
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#m_tabs_1_1">
                                            <i class="flaticon-book m--font-danger"></i>Genel Bilgiler
                                        </a>
                                    </li>
                                    
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#m_tabs_1_2">
                                            <i class="flaticon-book m--font-danger"></i>Bütçe Bilgileri
                                        </a>
                                    </li>

                                     <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#m_tabs_1_3">
                                            <i class="flaticon-book m--font-danger"></i>Kayıt Bilgileri
                                        </a>
                                    </li>




                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane" id="m_tabs_1_3" role="tabpanel" style="height: 500px !important;">
                                        <br />
                                        <div class="form-group m-form__group row">
                                            <div class="col-lg-12">
                                                 <table name="tabloLogBilgileri" id="tabloLogBilgileri" class="table table-bordered m-table m-table--border-brand m-table--head-separator-primary">
                                        <thead>
                                            <tr>
                                                <th style="display:none;">
                                                    <h6 style="text-align: center">#</h6>
                                                </th>

                                                <th style="text-align: center">
                                                    <h6>İşlem Açıklaması</h6>
                                                </th>
                                                <th style="text-align: center">
                                                    <h6>İşlem Tarihi</h6>
                                                </th>
                                                <th style="text-align: center">
                                                    <h6>İşlem Yapan Kullanıcı</h6>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>

                                                <%--<h6>Kayıt No </h6>
                                                <input type="text" id="txtKayitNo" autocomplete="off" name="txtKayitNo" class="form-control m-input" />--%>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="tab-pane active" id="m_tabs_1_1" role="tabpanel" style="height: 500px !important;">
                                        <br />
                                        <div class="form-group m-form__group row">
                                            <div class="col-lg-6">
                                                <h6>Şehir </h6>
                                                <input type="text" id="txtSehir" autocomplete="off" name="txtSehir" class="form-control m-input" readonly="readonly" />

                                            </div>

                                            <div class="col-lg-6">
                                                <h6>İlçe </h6>
                                                <input type="text" id="txtIlce" autocomplete="off" name="txtIlce" class="form-control m-input" readonly="readonly" />

                                            </div>

                                        </div>

                                        <div class="form-group m-form__group row">
                                            <div class="col-lg-6">
                                                <h6>Çalışma Türü </h6>
                                                <input type="text" id="txtProjeTuru" autocomplete="off" name="txtProjeTuru" class="form-control m-input" readonly="readonly" />

                                            </div>

                                            <div class="col-lg-6">
                                                <h6>Çalışma Durumu </h6>
                                                <input type="text" id="txtProjeDurumu" autocomplete="off" name="txtProjeDurumu" class="form-control m-input" readonly="readonly" />

                                            </div>
                                        </div>

                                        <div class="form-group m-form__group row">
                                            <div class="col-lg-12">
                                                <h6>Toplam Uzunluk (metre)</h6>
                                                <input type="text" id="txtToplamUzunluk" autocomplete="off" name="txtToplamUzunluk" class="form-control m-input" readonly="readonly" />

                                            </div>
                                        </div>

                                        <div class="form-group m-form__group row">
                                            <div class="col-lg-12">
                                                <h6>Güzergah Adı</h6>
                                                <input type="text" id="txtGuzergahAdi" autocomplete="off" name="txtGuzergahAdi" class="form-control m-input" readonly="readonly" />
                                            </div>
                                        </div>

                                        <div class="form-group m-form__group row" style="display:none;">
                                            <div class="col-lg-12">
                                                <h6>Güzergah Adı</h6>
                                                <input type="text" id="txtProjeNo" autocomplete="off" name="txtProjeNo" class="form-control m-input"  />
                                            </div>
                                        </div>

                                    </div>

                                    <div class="tab-pane" id="m_tabs_1_2" role="tabpanel" style="height: 500px !important;">
                                        <br />
                                       
                                       <div class="form-group m-form__group row">
                                            <div class="col-lg-6">
                                                <h6>Keşif Bedeli (₺)</h6>
                                                <input type="text" id="txtKesifBedeli" style="text-align:right;" autocomplete="off" name="txtKesifBedeli" class="form-control m-input" />
                                            </div>

                                            <div class="col-lg-6">
                                                <h6>Sözleşme Bedeli (₺)</h6>
                                                <input type="text" id="txtSozlesmeBedeli" style="text-align:right;" autocomplete="off" name="txtSozlesmeBedeli" class="form-control m-input" />
                                            </div>
                                        </div>

                                        <div class="form-group m-form__group row">

                                            <div class="col-lg-6">
                                                <h6>Bakanlık Hibe Milktarı(₺)</h6>
                                                <input type="text" id="txtBakanlikHibe" style="text-align:right;" autocomplete="off" name="txtBakanlikHibe" class="form-control m-input" />
                                            </div>

                                            <div class="col-lg-6">
                                                <h6>İlbank Hibe Milktarı(₺)</h6>
                                                <input type="text" id="txtIlbankHibe" style="text-align:right;" autocomplete="off" name="txtIlbankHibe" class="form-control m-input" />
                                            </div>
                                        </div>

                                         <div class="form-group m-form__group row">
                                             <div class="col-lg-6">
                                                <h6>Toplam Yapım Bütçesi (₺)</h6>
                                                <input type="text" id="txtToplamYapimButce" style="text-align:right;" autocomplete="off" name="txtToplamYapimButce" class="form-control m-input" />
                                            </div>
                                         </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="col-lg-2">
                            <%-- <button type="button" class="btn btn-danger" onclick="jsEyaletSilOnay();"><%=Resources.Resource.page_004_yazi_10 %></button>--%>
                        </div>
                        <div class="col-lg-10">
                            <%--<button type="button" class="btn btn-secondary" data-dismiss="modal">Kapat</button>--%>
                            <%--  <button type="button" class="btn btn-success pull-right" onclick="jsEyaletGuncelle()"><%=Resources.Resource.page_004_yazi_08 %></button>--%>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </form>




    <script src="theme/vendors/jquery/dist/jquery.js" type="text/javascript"></script>
    <script src="theme/vendors/popper.js/dist/umd/popper.js" type="text/javascript"></script>
    <script src="theme/vendors/bootstrap/dist/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="theme/vendors/js-cookie/src/js.cookie.js" type="text/javascript"></script>
    <script src="theme/vendors/moment/min/moment.min.js" type="text/javascript"></script>
    <script src="theme/vendors/tooltip.js/dist/umd/tooltip.min.js" type="text/javascript"></script>
    <script src="theme/vendors/perfect-scrollbar/dist/perfect-scrollbar.js" type="text/javascript"></script>
    <script src="theme/vendors/wnumb/wNumb.js" type="text/javascript"></script>

    <!--end:: Global Mandatory Vendors -->
    <!--begin:: Global Optional Vendors -->
    <script src="theme/vendors/jquery.repeater/src/lib.js" type="text/javascript"></script>
    <script src="theme/vendors/jquery.repeater/src/jquery.input.js" type="text/javascript"></script>
    <script src="theme/vendors/jquery.repeater/src/repeater.js" type="text/javascript"></script>
    <script src="theme/vendors/jquery-form/dist/jquery.form.min.js" type="text/javascript"></script>
    <script src="theme/vendors/block-ui/jquery.blockUI.js" type="text/javascript"></script>
    <script src="theme/vendors/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js" type="text/javascript"></script>
    <script src="theme/vendors/js/framework/components/plugins/forms/bootstrap-datepicker.init.js" type="text/javascript"></script>
    <script src="theme/vendors/bootstrap-datetime-picker/js/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
    <script src="theme/vendors/bootstrap-timepicker/js/bootstrap-timepicker.min.js" type="text/javascript"></script>
    <script src="theme/vendors/js/framework/components/plugins/forms/bootstrap-timepicker.init.js" type="text/javascript"></script>
    <script src="theme/vendors/bootstrap-daterangepicker/daterangepicker.js" type="text/javascript"></script>
    <script src="theme/vendors/js/framework/components/plugins/forms/bootstrap-daterangepicker.init.js" type="text/javascript"></script>
    <script src="theme/vendors/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.js" type="text/javascript"></script>
    <script src="theme/vendors/bootstrap-maxlength/src/bootstrap-maxlength.js" type="text/javascript"></script>
    <script src="theme/vendors/bootstrap-switch/dist/js/bootstrap-switch.js" type="text/javascript"></script>
    <script src="theme/vendors/js/framework/components/plugins/forms/bootstrap-switch.init.js" type="text/javascript"></script>
    <script src="theme/vendors/vendors/bootstrap-multiselectsplitter/bootstrap-multiselectsplitter.min.js" type="text/javascript"></script>
    <script src="theme/vendors/bootstrap-select/dist/js/bootstrap-select.js" type="text/javascript"></script>
    <script src="theme/vendors/select2/dist/js/select2.full.js" type="text/javascript"></script>
    <script src="theme/vendors/typeahead.js/dist/typeahead.bundle.js" type="text/javascript"></script>
    <script src="theme/vendors/handlebars/dist/handlebars.js" type="text/javascript"></script>
    <script src="theme/vendors/inputmask/dist/jquery.inputmask.bundle.js" type="text/javascript"></script>
    <script src="theme/vendors/inputmask/dist/inputmask/inputmask.date.extensions.js" type="text/javascript"></script>
    <script src="theme/vendors/inputmask/dist/inputmask/inputmask.numeric.extensions.js" type="text/javascript"></script>
    <script src="theme/vendors/inputmask/dist/inputmask/inputmask.phone.extensions.js" type="text/javascript"></script>
    <script src="theme/vendors/nouislider/distribute/nouislider.js" type="text/javascript"></script>
    <script src="theme/vendors/owl.carousel/dist/owl.carousel.js" type="text/javascript"></script>
    <script src="theme/vendors/autosize/dist/autosize.js" type="text/javascript"></script>
    <script src="theme/vendors/clipboard/dist/clipboard.min.js" type="text/javascript"></script>
    <script src="theme/vendors/ion-rangeslider/js/ion.rangeSlider.js" type="text/javascript"></script>
    <script src="theme/vendors/dropzone/dist/dropzone.js" type="text/javascript"></script>
    <script src="theme/vendors/summernote/dist/summernote.js" type="text/javascript"></script>
    <script src="theme/vendors/markdown/lib/markdown.js" type="text/javascript"></script>
    <script src="theme/vendors/bootstrap-markdown/js/bootstrap-markdown.js" type="text/javascript"></script>
    <script src="theme/vendors/js/framework/components/plugins/forms/bootstrap-markdown.init.js" type="text/javascript"></script>
    <script src="theme/vendors/jquery-validation/dist/jquery.validate.js" type="text/javascript"></script>
    <script src="theme/vendors/jquery-validation/dist/additional-methods.js" type="text/javascript"></script>
    <script src="theme/vendors/js/framework/components/plugins/forms/jquery-validation.init.js" type="text/javascript"></script>
    <script src="theme/vendors/bootstrap-notify/bootstrap-notify.min.js" type="text/javascript"></script>
    <script src="theme/vendors/js/framework/components/plugins/base/bootstrap-notify.init.js" type="text/javascript"></script>
    <script src="theme/vendors/toastr/build/toastr.min.js" type="text/javascript"></script>
    <script src="theme/vendors/jstree/dist/jstree.js" type="text/javascript"></script>
    <script src="theme/vendors/raphael/raphael.js" type="text/javascript"></script>
    <script src="theme/vendors/morris.js/morris.js" type="text/javascript"></script>
    <script src="theme/vendors/chartist/dist/chartist.js" type="text/javascript"></script>
    <script src="theme/vendors/chart.js/dist/Chart.bundle.js" type="text/javascript"></script>
    <script src="theme/vendors/js/framework/components/plugins/charts/chart.init.js" type="text/javascript"></script>
    <script src="theme/vendors/vendors/bootstrap-session-timeout/dist/bootstrap-session-timeout.min.js" type="text/javascript"></script>
    <script src="theme/vendors/vendors/jquery-idletimer/idle-timer.min.js" type="text/javascript"></script>
    <script src="theme/vendors/waypoints/lib/jquery.waypoints.js" type="text/javascript"></script>
    <script src="theme/vendors/counterup/jquery.counterup.js" type="text/javascript"></script>
    <script src="theme/vendors/es6-promise-polyfill/promise.min.js" type="text/javascript"></script>
    <%--<script src="theme/vendors/sweetalert2/dist/sweetalert2.min.js" type="text/javascript"></script>--%>
    <%-- <script src="theme/vendors/js/framework/components/plugins/base/sweetalert2.init.js" type="text/javascript"></script>--%>

    <!--end:: Global Optional Vendors -->
    <!--begin::Global Theme Bundle -->
    <script src="theme/assets/demo/base/scripts.bundle.js" type="text/javascript"></script>

    <!--end::Global Theme Bundle -->
    <!--begin::Page Vendors -->
    <script src="theme/assets/vendors/custom/fullcalendar/fullcalendar.bundle.js" type="text/javascript"></script>
    <script src="theme/assets/demo/custom/crud/forms/widgets/bootstrap-switch.js" type="text/javascript"></script>

    <!--end::Page Vendors -->
    <!--begin::Page Scripts -->



    <!--end::Page Scripts -->
    <script type="text/javascript" src="Javascript/sweetalert.min.js"></script>
    <script type="text/javascript" src="Javascript/GenelIslemler.js"></script>
    <script type="text/javascript" src="Javascript/JsSunum.js"></script>
    <div class="modal">
        <!-- Place at bottom of page -->
    </div>
</body>
</html>
