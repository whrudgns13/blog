sap.ui.define(
    ["sap/blog/controller/BaseController"]
    /**
     * @param {typeof sap.blog.controller.BaseController} Controller
     */,
    function (Controller) {
        "use strict";

        return Controller.extend("sap.blog.controller.MainView", {
            onInit : function(){
                const oView = this.getView();

                const oModel = new sap.ui.model.json.JSONModel({
                    posts : []
                });
                
                oView.setModel(oModel,"ViewModel");
                this.oViewModel = oView.getModel("ViewModel");

                //this.getPosts();
            },
            onNavigation : function(sViewName){
                const oView = this.getView();
                const oPage = sap.ui.getCore().byId("mainPage");
                
                const oTargetView = sap.ui.view({
                    viewName : `sap.blog.view.${sViewName}`,
                    type : "JS",
                });
                oPage.removeAllContent();
                oPage.addContent(oTargetView);
            },
        });
    }
);
