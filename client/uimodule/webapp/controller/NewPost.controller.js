sap.ui.define(
    ["sap/blog/controller/MainView.controller"]
    /**
     * @param {typeof sap.blog.controller.BaseController} Controller
     */,
    function (Controller) {
        "use strict";

        return Controller.extend("sap.blog.controller.NewPost", {
            onInit : function(){
                const oView = this.getView();
                const oModel = new sap.ui.model.json.JSONModel({
                    sendData : {
                        title : "",
                        value : "",
                        sender : "",
                        tags : [],                    
                    },
                    tag : "",  
                    suggest : [],
                });

                oView.setModel(oModel,"ViewModel");
                this.oViewModel = oView.getModel("ViewModel");
            },
            onPostSubmit : async function(){
                const oView = this.getView();
                const dDate = new Date();                
                const aToken = oView.byId("tags").getTokens().map((token)=>{
                    return {value : token.getKey()}
                });
                
                this.oViewModel.setProperty("/date",`${dDate.getFullYear()}년 ${dDate.getMonth()+1}월 ${dDate.getDate()}일`)
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
            onSearchTag : async function(oEvent){
                const sTag = oEvent.getParameter("value");
                const aTag = await (await fetch(`http://localhost:3000/searchTag/${sTag}`)).json();
                this.oViewModel.setProperty("/suggest",aTag);
            }
        });
    }
);
