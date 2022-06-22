<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="formsecim.aspx.cs" Inherits="FiciTakip.Arayuz.formsecim" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">


    <div class="modal fade" id="m_modal_01" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabelxx">Form Seçim</h5>
                        <img src="resimler/close.png" onclick="jsAnaSayfa();" class="close" />
                    </div>
                    <div class="modal-body">
                        <div class="m-scrollable m-scroller ps ps--active-y" data-scrollbar-shown="true" data-scrollable="true" >

                            <div class="form-group m-form__group row">
                                <div class="col-lg-12">
                                    <h6>ÜRÜN FORMU</h6>
                              

                                    <div class="input-group m-input-group">
                                        <select class="form-control m-input" id="listeProjeTuru" name="listeProjeTuru" aria-describedby="basic-alan01"></select>
                                        <div class="input-group-prepend" id="alan01"><span class="input-group-text" id="basic-alan01"><i class="la la-exclamation-triangle"></i></span></div>

                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">

                       

                        <div class="col-lg-8">
                        </div>

                        <div class="col-lg-4">
                            <button type="button" class="btn btn-success btn-block pull-right" onclick="jsDevamEt();">DEVAM ET</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <script type="text/javascript" src="javascript/formsecim.js"></script>
</asp:Content>
