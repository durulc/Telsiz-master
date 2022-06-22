<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="etikettanim.aspx.cs" Inherits="FiciTakip.Arayuz.etikettanim" %>


<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <style id="jsbin-css">
        @media (min-width: 768px) {
            .modal-xl {
                width: 90%;
                max-width: 1200px;
            }
        }
    </style>
    <div class="m-content">
        <!--begin::YeniUrunKayit-->
        <div class="row">
            <div class="col-md-12">
                <!--begin::Portlet-->
                <div class="m-portlet m-portlet--tab">
                    <div class="m-portlet__head">
                        <div class="m-portlet__head-caption">
                            <div class="m-portlet__head-title">
                                <span class="m-portlet__head-icon m--hide">
                                    <i class="la la-gear"></i>
                                </span>
                                <h3 class="m-portlet__head-text">RFID Etiket Tanımlama Ekranı
                                </h3>
                            </div>
                        </div>
                    </div>

                    <!--begin::Form-->
                    <form class="m-form m-form--fit m-form--label-align-right">
                        <div class="m-portlet__body">

                            <div class="form-group m-form__group row">
                                <div class="col-lg-3">
                                    <h6>Ekipman Id</h6>
                                    <div class="input-group m-input-group">
                                        <div class="input-group-prepend"><span class="input-group-text">5@</span></div>
                                        <input type="text" autocomplete="off" class="form-control m-input" style="text-transform: uppercase;" name="txtEkipmanId" id="txtEkipmanId" />
                                    </div>
                                </div>

                                <div class="col-lg-3">
                                    <h6>Tesis</h6>
                                    <select class="form-control m-input" id="listeTesis" name="listeTesis">
                                        <option value="0">----</option>
                                        <option value="1">Mevcut Tesis</option>

                                    </select>
                                </div>
                            </div>


                            <div class="form-group m-form__group row">
                                <div class="col-lg-3">
                                    <h6>Ekipman Tanım</h6>
                                    <input type="text" autocomplete="off" class="form-control m-input" name="txtEkipmanTanim" id="txtEkipmanTanim" />
                                </div>

                                <div class="col-lg-3">
                                    <h6>Renk</h6>
                                    <select class="form-control m-input" id="listeRenk" name="listeRenk">
                                        <option value="0">----</option>
                                        <option value="1">Renkli</option>
                                        <option value="2">Renksiz</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group m-form__group row">
                                <div class="col-lg-3">
                                    <h6>Ekipman Tipi</h6>
                                     <select class="form-control m-input" id="listeRenk" name="listeRenk">
                                        <option value="0">----</option>
                                        <option value="1">T KAPAK</option>
                                    </select>
                                </div>


                                <div class="col-lg-3">
                                    <h6>Barkod </h6>
                                    <div class="input-group m-input-group">
                                        <div class="input-group-prepend"><span class="input-group-text">5@</span></div>
                                        <input type="text" autocomplete="off" class="form-control m-input" style="text-transform: uppercase;" name="txtBarkod" id="txtBarkod" />
                                    </div>

                                </div>
                            </div>




                            <div class="form-group m-form__group row">
                                <div class="col-lg-3">
                                    <h6>Adet</h6>
                                    <input type="number" autocomplete="off" class="form-control m-input" name="txtnumber" id="txtnumber" />
                                </div>

                                <div class="col-lg-3">
                                    <h6>&nbsp;</h6>

                                    <a href="#" onclick="js_Tamamla()" class="btn btn-outline-success m-btn m-btn--icon pull-right">
                                        <span>
                                            <i class="la la-calendar-check-o"></i>
                                            <span>Kaydet</span>
                                        </span>
                                    </a>

                                </div>
                            </div>

                        </div>
                    </form>

                    <!--end::Form-->
                </div>

                <!--end::Portlet-->
            </div>
        </div>
    </div>
</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
</asp:Content>
