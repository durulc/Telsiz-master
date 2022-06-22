<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="uretimsiparisleri.aspx.cs" Inherits="FiciTakip.Arayuz.uretimsiparisleri" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
<head>
        <style id="jsbin-css">
        @media (min-width: 768px) {
            .modal-xl {
                width: 90%;
                max-width: 1200px;
            }
        }
    </style>
         <link rel="stylesheet" href="javascript/all.min.css"  />
    
    </head>

    <div class="m-content">
        <!--begin::YeniUrunKayit-->
        <div class="row">
            <div class="col-md-6">
                <!--begin::Portlet-->
                <div class="m-portlet m-portlet--tab">
                    <div class="m-portlet__head">
                        <div class="m-portlet__head-caption">
                            <div class="m-portlet__head-title">
                                <span class="m-portlet__head-icon m--hide">
                                    <i class="la la-gear"></i>
                                </span>
                                <h3 class="m-portlet__head-text">Bekleme Alanı
                                </h3>
                            </div>
                        </div>
                    </div>

                    <!--begin::Form-->
                    <form class="m-form m-form--fit m-form--label-align-right">
                        <div class="m-portlet__body">
                             <div class="form-group m-form__group row">

                                <div class="container">
                                    <div class="row">
                                        <div class="col-md-4" id="txtTelsiz" style="height:350px;">
                                          <%--  <i class="fa-solid fa-walkie-talkie fa-2x" id="para" style="color: red"></i>--%>
                                           
                                     
                                          
                                        </div>
                                        <!-- <div class="col-md-8">
                                        <i class="fa-solid fa-walkie-talkie" style="color:red"></i>
                                        <i class="fa-solid fa-walkie-talkie" style="color:red"></i>
                                        <i class="fa-solid fa-walkie-talkie" style="color:red"></i>
                                        <i class="fa-solid fa-walkie-talkie" style="color:red"></i>
                                        <i class="fa-solid fa-walkie-talkie" style="color:red"></i>
                                        <i class="fa-solid fa-walkie-talkie" style="color:red"></i>
                                        <i class="fa-solid fa-walkie-talkie" style="color:red"></i>
                                        </div> -->

                                     <%--   <button class="btn btn-success" onclick="myfile()">Geçiş</button>--%>

                                    </div>

                                      </div>
                            </div>

             

                        </div>
                    </form>

                    <!--end::Form-->
                </div>

                <!--end::Portlet-->
            </div>


            <div class="col-md-6">
                <!--begin::Portlet-->
                <div class="m-portlet m-portlet--tab">
                    <div class="m-portlet__head">
                        <div class="m-portlet__head-caption">
                            <div class="m-portlet__head-title">
                                <span class="m-portlet__head-icon m--hide">
                                    <i class="la la-gear"></i>
                                </span>
                                <h3 class="m-portlet__head-text">1 Nolu Alan
                                </h3>
                            </div>
                        </div>
                    </div>

                    <!--begin::Form-->
                    <form class="m-form m-form--fit m-form--label-align-right">
                        <div class="m-portlet__body">
                             <div class="form-group m-form__group row">

                                <div class="container">
                                    <div class="row">
                                        <div class="col-md-4" id="txtTelsizGecenler" style="height:350px;">
                                          <%--  <i class="fa-solid fa-walkie-talkie fa-2x" id="para" style="color: red"></i>--%>
                                           
                                     
                                          
                                        </div>
                                        <!-- <div class="col-md-8">
                                        <i class="fa-solid fa-walkie-talkie" style="color:red"></i>
                                        <i class="fa-solid fa-walkie-talkie" style="color:red"></i>
                                        <i class="fa-solid fa-walkie-talkie" style="color:red"></i>
                                        <i class="fa-solid fa-walkie-talkie" style="color:red"></i>
                                        <i class="fa-solid fa-walkie-talkie" style="color:red"></i>
                                        <i class="fa-solid fa-walkie-talkie" style="color:red"></i>
                                        <i class="fa-solid fa-walkie-talkie" style="color:red"></i>
                                        </div> -->

                                     <%--   <button class="btn btn-success" onclick="myfile()">Geçiş</button>--%>

                                    </div>

                                      </div>
                            </div>

             

                        </div>
                    </form>

                    <!--end::Form-->
                </div>

                <!--end::Portlet-->
            </div>


            <div class="col-md-12">
                <!--begin::Portlet-->
                <div class="m-portlet m-portlet--tab">
                    <div class="m-portlet__head">
                        <div class="m-portlet__head-caption">
                            <div class="m-portlet__head-title">
                                <span class="m-portlet__head-icon m--hide">
                                    <i class="la la-gear"></i>
                                </span>
                                <h3 class="m-portlet__head-text"> Geçiş Sayı Bilgileri
                                </h3>
                            </div>
                        </div>
                    </div>

                    <!--begin::Form-->
                    <form class="m-form m-form--fit m-form--label-align-right">
                        <div class="m-portlet__body">
                          

                            <div class="form-group m-form__group row">
                                <div class="col-lg-12">
                                    <table name="m_table_1" id="m_table_1" class="table table-bordered m-table m-table--border-brand m-table--head-separator-primary" />
                                        <thead>
                                            <tr>

                                                <th style="text-align: center">Okunan Etiket Sayısı</th>
                                                <th style="text-align: center">Okunmayan Etiket Sayısı</th>

                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>


                            <div class="form-group m-form__group row">
                                 <div class="col-lg-6">
                                     <h6>&nbsp;</h6>
                                 </div>
                                <div class="col-lg-2">
                                    <button type="button" class="btn btn-success btn-block" onclick="jsBaslat()" data-dismiss="modal">BAŞLAT</button>
                                </div>
                                <div class="col-lg-2">
                                    <button type="button" class="btn btn-warning btn-block" onclick="jsDurdur()" data-dismiss="modal">DURDUR</button>
                                </div>
                                <div class="col-lg-2">
                                    <button type="button" class="btn btn-danger btn-block" onclick="jsTemizle()"  data-dismiss="modal">TEMİZLE</button>
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
    <script src="javascript/jsuretimsiparisleri.js" type="text/javascript"></script>
</asp:Content>
