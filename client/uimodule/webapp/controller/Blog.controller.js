sap.ui.define(
    ["sap/blog/controller/MainView.controller"]
    /**
     * @param {typeof sap.blog.controller.BaseController} Controller
     */,
    function (Controller) {
        "use strict";

        return Controller.extend("sap.blog.controller.Blog", {
            onInit : function(){                
                this._setDefault();
            },
            _setDefault : async function(){
                const oView = this.getView();
                const oPost = await this.getPost();
                
                const oModel = new sap.ui.model.json.JSONModel({
                    ...oPost,
                    sendData : {
                        postId : oPost.id,
                        visible : false,
                        value : "",
                        sender : ""
                    }
                });                

                oView.setModel(oModel,"ViewModel");
                this.oViewModel = oView.getModel("ViewModel");
            },
            getPost : async function(){
                const oView = this.getView();
                const oViewData = oView.getViewData();

                let oPost = await (await fetch(`http://localhost:3000/posts/id/${oViewData.id}`)).json();
                if(oPost){
                    oPost.comments = oPost.comments.map(comments=>{
                        comments.value = comments.value.replace(/(<([^>]+)>)/gi, "")
                        return comments;
                    });
                }

                return oPost;
            },
            onShowAddComment : function(){
                this.oViewModel.setProperty("/sendData/visible",!this.oViewModel.getProperty("/sendData/visible"));
            },
            onSaveComment : async function(){
                this.oViewModel.setProperty("/sendData/date",this.getCurrentDate());
                const response = await fetch("http://localhost:3000/comment",{
                    method : "POST",
                    body : JSON.stringify(this.oViewModel.getProperty("/sendData")),
                    headers : {
                        "Content-Type" : "application/json"
                    }
                });

                if(response.status===200){
                    const oComment = await response.json();
                    const aComments = this.oViewModel.getProperty("/comments");
                    aComments.push(oComment);
                    this.oViewModel.setProperty("/comments",aComments);
                }
            }
        });
    }
);
