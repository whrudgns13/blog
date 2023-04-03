sap.ui.jsview("sap.blog.view.NewPost", {
    getControllerName : function(){
        return "sap.blog.controller.NewPost"
    },
    createContent : function(oController){
        const oTitleBox = new sap.m.OverflowToolbar({
            height : "auto",
            content : [
               new sap.m.VBox({
                    width : "100%",
                    justifyContent : "Center",
                    items : [
                        new sap.m.VBox({
                            justifyContent : sap.m.FlexJustifyContent.SpaceBetween,
                            items : [
                                new sap.m.Title({
                                    text : "Add New Post",
                                    titleStyle : sap.ui.core.TitleLevel.H2
                                }),                               
                            ]
                        }),
                    ]
               })
            ]
        }).addStyleClass("blog__titleBox");
        
        const oTitle = new sap.m.Input({
            value : "{ViewModel>/sendData/title}",
            placeholder : "제목을 입력하세요"
        });

        const oRTE = new sap.ui.richtexteditor.RichTextEditor({
            width: "100%",
            height: "20rem",
            value : "{ViewModel>/sendData/value}",
            customToolbar: true,
            showGroupFont: true,
            showGroupLink: true,
            showGroupInsert: true,
        });

        const oTagBox = new sap.m.VBox({
            items : [
                new sap.m.Text({
                    text : "You currently do not have any followed tags. You can find out more about the benefits of following tags here."
                }),
                new sap.m.Text({
                    text : "SAP Managed Tags"
                }),
                new sap.m.MultiInput({
                    id : this.createId("tags"),
                    showSuggestion : true,
                    value : "{ViewModel>/tag}",
                    maxTokens : 3,
                    liveChange : function(oEvent){
                        oController.onSearchTag(oEvent);
                    },
                    suggestionItems : {
                        path : "ViewModel>/suggest/searchedTags",
                        template : new sap.ui.core.ListItem({
                            key : "{ViewModel>displayName}",
                            text : "{ViewModel>displayName}"
                        })
                    }
                })
            ]
        });
        
        const oSubmitBox = new sap.m.HBox({
            items : [
                new sap.m.Input({
                    value : "{ViewModel>/sendData/sender}",
                    width :"7rem",
                    placeholder : "작성자"
                }).addStyleClass("sapUiSmallMarginEnd"),
                new sap.m.Button({
                    text : "Submit",
                    type : "Emphasized",
                    press : function(){
                        oController.onPostSubmit();
                    }
                }).addStyleClass("sapUiSmallMarginEnd"),
                new sap.m.Button({
                    text : "Close",
                    press : function(){
                        oController.onNavigation("MainContent");
                    }
                })
            ]
        }).addStyleClass("sapUiSmallMarginTop");

        const oContent = new sap.m.Panel({
            content : [
                oTitle,
                oRTE,
                oTagBox,
                oSubmitBox
            ]
        });

        return [oTitleBox,oContent];
    }
})