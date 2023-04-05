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
                        //date : ""
                    },
                    tag : "",  
                    suggest : [],
                });

                oView.setModel(oModel,"ViewModel");
                this.oViewModel = oView.getModel("ViewModel");
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

                if(response.status===200) this.onHashChange("MainContent");
            },
            validationCheck : function(){
                const oSendData = this.oViewModel.getProperty("/sendData");
                const sTitle = oSendData.title;
                const sSender = oSendData.sender;
                let aMessage = [];
                if(!sTitle) aMessage.push("제목");
                if(!sSender) aMessage.push("작성자");
                if(aMessage.length){
                    new sap.m.MessageToast.show(`${aMessage.join(",")}은 필수입니다.`);
                    return false;
                }
                return true;
            },
            onSearchTag : async function(oEvent){
                const sTag = oEvent.getParameter("value");
                const aTag = await (await fetch(`http://localhost:3000/searchTag/${sTag}`)).json();
                this.oViewModel.setProperty("/suggest",aTag);
            }
        });
    }
);
