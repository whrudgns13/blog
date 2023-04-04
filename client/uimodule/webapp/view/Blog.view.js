sap.ui.define([

], function() {
    'use strict';
    sap.ui.jsview("sap.blog.view.Blog",{
        getControllerName : ()=> "sap.blog.controller.Blog",
        createContent : function(oController){
            new sap.m.Text({text : "Hello World"});
            return new sap.m.Panel({
                content : [
                    new sap.m.HBox({
                        items : [
                            new sap.m.VBox({
                                alignItems : "Center",
                                items : [
                                    new sap.m.Avatar({
                                        displaySize : "L"
                                    }),
                                    new sap.m.Button({
                                        width: "7rem",
                                        text : "Follow"
                                    }),
                                    new sap.m.Button({
                                        width: "7rem",
                                        icon : "sap-icon://thumb-up",
                                        text : "Like"
                                    }),
                                    new sap.m.Button({
                                        width: "7rem",
                                        icon : "sap-icon://feed",
                                        text : "RSS Feed"
                                    })
                                ]
                            }).addStyleClass("sapUiLargeMarginEnd"),
                            new sap.m.VBox({
                                items : [
                                    new sap.m.Link({
                                        text : "{ViewModel>/sender}"
                                    }),
                                    new sap.m.Text({
                                        text : "{ViewModel>/date}"
                                    }),
                                    new sap.m.Title({
                                        text : "{ViewModel>/title}",
                                        titleStyle : sap.ui.core.TitleLevel.H1
                                    }),
                                    new sap.ui.core.HTML({
                                        content : "{ViewModel>/value}"
                                    })
                                ]    
                            }).addStyleClass("blog__content"),
                            new sap.m.VBox({
                                items : [
                                    new sap.m.Title({
                                        width: "100%",
                                        text : "Assigned Tags",
                                        titleStyle : sap.ui.core.TitleLevel.H5
                                    }).addStyleClass("blog__tagTitle"),
                                    new sap.m.VBox({
                                        items : {
                                            path : "ViewModel>/tags",
                                            template : new sap.m.Text({
                                                text  : "{ViewModel>value}"
                                            }).addStyleClass("sapUiTinyMarginTop")
                                        }
                                    })
                                ]
                            })      
                        ]
                    }).addStyleClass("sapUiLargeMarginBottom"),
                    (function(){
                        
                        const oRTE = new sap.ui.richtexteditor.RichTextEditor({
                            visible : "{ViewModel>/sendData/visible}",
                            width: "80%",
                            height: "8rem",
                            value : "{ViewModel>/sendData/value}",
                            customToolbar: true,
                            showGroupFont: true,
                            showGroupLink: true,
                            showGroupInsert: true,
                        });
                        
                        const oButtomGroup = new sap.m.HBox({
                            visible : "{ViewModel>/sendData/visible}",
                            items : [
                                new sap.m.Input({
                                    value : "{ViewModel>/sendData/sender}",
                                    width : "8rem",
                                    placeholder : "작성자"
                                }).addStyleClass("sapUiSmallMarginEnd"),
                                new sap.m.Button({
                                    text : "Submit",
                                    type : "Emphasized",
                                    press : function(){
                                        oController.onSaveComment();
                                    }
                                }).addStyleClass("sapUiSmallMarginEnd"),
                                new sap.m.Button({
                                    text : "Cancel",
                                    press : function(){
                                        oController.onShowAddComment();
                                    }
                                })
                            ]
                        }).addStyleClass("sapUiSmallMarginTop");
                        
                        const oVBox = new sap.m.VBox({
                            items : [
                                new sap.m.Button({
                                    text : "Add Comment",
                                    visible : "{= !${ViewModel>/sendData/visible}}",
                                    press : function(){
                                       oController.onShowAddComment(); 
                                    }
                                }),
                                oRTE,
                                oButtomGroup  
                            ]
                        }).addStyleClass("blog__comment");

                        return oVBox;
                    }()) 
                ]
            });
        }
    })
});