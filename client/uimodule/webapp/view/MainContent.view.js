sap.ui.define([], function () {
    "use strict";
    sap.ui.jsview("sap.blog.view.MainContent", {
        getControllerName : function(){
            return "sap.blog.controller.MainContent"
        },
        createContent: function (oController) {                        
            const oSearchBox = new sap.m.OverflowToolbar({
                height : "auto",
                content : [
                   new sap.m.VBox({
                        width : "100%",
                        justifyContent : "Center",
                        items : [
                            new sap.m.VBox({
                                justifyContent : sap.m.FlexJustifyContent.SpaceBetween,
                                height : "8rem",
                                items : [
                                    new sap.m.Title({
                                        text : "All Blog Posts",
                                        titleStyle : sap.ui.core.TitleLevel.H2
                                    }),
                                    new sap.m.SearchField({                                       
                                        width : "40rem"
                                    }),
                                    new sap.m.Link({
                                        text : "Write a Blog Post",
                                        press : function(){
                                            oController.onNavigation("NewPost");
                                        }
                                    }),
                                ]
                            }),
                        ]
                   })
                ]
            }).addStyleClass("blog__titleBox");
            
            const oContent = new sap.m.Panel({
                content : [
                    new sap.m.CustomListItem({
                        content : {
                            path : "ViewModel>/posts",
                            template : new sap.m.FlexBox({
                                items : [
                                    new sap.m.Avatar({}).addStyleClass("sapUiSmallMarginEnd"),
                                    new sap.m.VBox({
                                        items : [
                                            new sap.m.HBox({
                                                items : [
                                                    new sap.m.Text({text : "{ViewModel>sender}"}).addStyleClass("sapUiTinyMarginEnd"),
                                                    new sap.m.Text({text : "{ViewModel>date}"}),
                                                ]
                                            }),
                                            new sap.m.VBox({
                                                items : [
                                                    new sap.m.Link({text : "{ViewModel>title}"}),
                                                    new sap.m.Text({text : "{ViewModel>value}"}).addStyleClass("maincontent__content"),
                                                ]
                                            }),
                                            new sap.m.HBox({
                                                items : [
                                                    new sap.ui.core.Icon({src : "sap-icon://tags"}),
                                                    new sap.m.HBox({
                                                        items : {
                                                            path : "ViewModel>tags",
                                                            template : new sap.m.Text({
                                                                text : "{ViewModel>value}"
                                                            }).addStyleClass("sapUiTinyMarginBegin sapUiTinyMarginEnd maincontent__tag")
                                                        }
                                                    }).addStyleClass("maincontent__tags"),
                                                ]
                                            })
                                            
                                        ]
                                    }),
                                ]
                            }).addStyleClass("sapUiLargeMarginBottom")
                        }
                    })
                ]
            }).addStyleClass("maincontent");

            return [oSearchBox, oContent]
        },
    });
});
