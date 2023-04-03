sap.ui.define(
    ["sap/blog/controller/MainView.controller"]
    /**
     * @param {typeof sap.blog.controller.BaseController} Controller
     */,
    function (Controller) {
        "use strict";

        return Controller.extend("sap.blog.controller.MainContent", {
            onInit : function(){
                const oView = this.getView();

                const oModel = new sap.ui.model.json.JSONModel({
                    posts : []
                });
                
                oView.setModel(oModel,"ViewModel");
                this.oViewModel = oView.getModel("ViewModel");
                this.getPosts();
            },
            getPosts : async function(){
                let aPost = await (await fetch("http://localhost:3000/posts")).json();
                console.log(aPost);

                aPost = aPost.map(post=>{
                    post.value = post.value.replace(/(<([^>]+)>)/gi, "")
                    return post;
                });

                this.oViewModel.setProperty("/posts",aPost);         
            }
        });
    }
);
