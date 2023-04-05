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
                
                if(window.location.hash) this.onNavigation(window.location.hash.substr(1));

                window.addEventListener("hashchange",()=>{
                    const [sHash,sSearch] = window.location.hash.split("?");
                    this.onNavigation(sHash.substr(1),sSearch);
                });
                
            },
            onNavigation : function(sViewName,sSearch){
                let viewData
                if(!sViewName) return;
                if(sSearch){
                    const [sKey, sValue] = sSearch.split("=");                
                    viewData = {[sKey] : sValue};                
                }
                
                const oTargetView = sap.ui.view({
                    viewName : `sap.blog.view.${sViewName}`,
                    type : "JS",
                    viewData
                });
                
                const oPage = sap.ui.getCore().byId("mainPage");
                oPage.removeAllContent();
                oPage.addContent(oTargetView);
            },
            onHashChange : function(sHash,sSearch){
                window.location.hash = sHash+(sSearch ? "?"+sSearch : "");
            }
        });
    }
);
