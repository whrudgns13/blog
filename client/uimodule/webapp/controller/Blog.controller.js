sap.ui.define(
    ["sap/blog/controller/MainView.controller"]
    /**
     * @param {typeof sap.blog.controller.BaseController} Controller
     */,
    function (Controller) {
        "use strict";

        return Controller.extend("sap.blog.controller.Blog", {
            onInit : function(){
                const oView = this.getView();
                const oModel = new sap.ui.model.json.JSONModel({
                    ...oView.getViewData(),
                    sendData : {
                        postId : oView.getViewData().id,
                        visible : false,
                        value : "",
                        sender : ""
                    },
                    comments : []                    
                });
                oView.setModel(oModel,"ViewModel");
                this.oViewModel = oView.getModel("ViewModel");
            },
            onShowAddComment : function(){
                this.oViewModel.setProperty("/sendData/visible",!this.oViewModel.getProperty("/sendData/visible"));
            },
            onSaveComment : async function(){
                const response = await fetch("http://localhost:3000/comment",{
                    method : "POST",
                    body : JSON.stringify(this.oViewModel.getProperty("/sendData")),
                    headers : {
                        "Content-Type" : "application/json"
                    }
                });

                if(response.status===200){};
            },
            onPostSubmit : async function(){
                if(!this.validationCheck()) return;

                const oView = this.getView();
                const dDate = new Date();                
                const aToken = oView.byId("tags").getTokens().map((token)=>{
                    return {value : token.getKey()}
                });
                
                this.oViewModel.setProperty("/sendData/date",`${dDate.getFullYear()}년 ${dDate.getMonth()+1}월 ${dDate.getDate()}일`)
                this.oViewModel.setProperty("/sendData/tags",aToken);

                const response = await fetch("http://localhost:3000/posts",{
                    method : "POST",
                    body : JSON.stringify(this.oViewModel.getProperty("/sendData")),
                    headers : {
                        "Content-Type" : "application/json"
                    }
                });

                if(response.status===200) this.onNavigation("MainContent");
            },
        });
    }
);
