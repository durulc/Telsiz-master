<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="ficikapatma.aspx.cs" Inherits="FiciTakip.Arayuz.ficikapatma" %>

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
                                <h3 class="m-portlet__head-text">Fıçı Kapatma İşlemi
                                </h3>
                            </div>
                        </div>
                    </div>

                    <!--begin::Form-->
                    <form class="m-form m-form--fit m-form--label-align-right">
                        <div class="m-portlet__body">

                            <div class="form-group m-form__group row">
                                <div class="col-lg-3">
                                    <h6>Fıçı Etiketi</h6>
                                    <input type="text" autocomplete="off" class="form-control m-input" name="txtFiciEtiketi" id="txtFiciEtiketi" />
                                </div>

                                <div class="col-lg-3">
                                    <h6>&nbsp;</h6>
                                </div>


                                <div class="col-lg-3">
                                    <h6>Sipariş Numarası Seç</h6>
                                    <input type="text" autocomplete="off" class="form-control m-input" name="txtSiparisNo" id="txtSiparisNo" />
                                </div>

                            </div>


                             <div class="form-group m-form__group row">
                                  <div class="col-lg-3">
                                    <h6>Kapat Etiketi</h6>
                                    <input type="text" autocomplete="off" class="form-control m-input" name="txtKapakEtiketi" id="txtKapakEtiketi" />
                                </div>

                                 <div class="col-lg-3">
                                    <h6>&nbsp;</h6>
                                </div>


                                <div class="col-lg-3">
                                    <h6>Malzeme Kodu Seç </h6>
                                    <input type="text" autocomplete="off" class="form-control m-input" name="txtMalzemeKoduSec" id="txtMalzemeKoduSec" />
                                </div>

                             </div>

                             <div class="form-group m-form__group row">
                                 <div class="col-lg-6">
                                     <h6>&nbsp;</h6>
                                 </div>

                                  <div class="col-lg-3">
                                    <h6>Malzeme Tanımı Seç </h6>
                                    <input type="text" autocomplete="off" class="form-control m-input" name="txtMalzemeTanim" id="txtMalzemeTanim" />
                                </div>
                             </div>

                             <div class="form-group m-form__group row">
                                 <div class="col-lg-6">
                                     <h6>&nbsp;</h6>
                                 </div>

                                  <div class="col-lg-3">
                                    <h6>Parti Numarası Seç </h6>
                                    <input type="text" autocomplete="off" class="form-control m-input" name="txtPartiNumarasi" id="txtPartiNumarasi" />
                                </div>
                             </div>

                             <div class="form-group m-form__group row">
                                 <div class="col-lg-6">
                                     <h6>&nbsp;</h6>
                                 </div>

                                  <div class="col-lg-3">
                                    <h6>&nbsp;</h6>

                                    <a href="#" onclick="js_Tamamla()" class="btn btn-outline-success m-btn m-btn--icon pull-right">
                                        <span>
                                            <i class="la la-calendar-check-o"></i>
                                            <span>Eşleştirmeyi Tamamla</span>
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
