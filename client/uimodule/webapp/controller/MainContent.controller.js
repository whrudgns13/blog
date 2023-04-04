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
                    posts : [],
                    selectedKey : "title",
                    categorys : [
                        { key : "title",text : "제목" },
                        { key : "value",text : "본문" },
                        { key : "sender",text : "작성자" },
                        { key : "tags",text : "태그" },
                    ]
                });
                
                oView.setModel(oModel,"ViewModel");
                this.oViewModel = oView.getModel("ViewModel");
                this.getPosts();
            },
            getPosts : async function(sPath){                
                let aPost = await (await fetch(`http://localhost:3000/posts/${sPath ? sPath : ""}`)).json();
                console.log(aPost);

                aPost = aPost.map(post=>{
                    post.value = post.value.replace(/(<([^>]+)>)/gi, "")
                    return post;
                });

                this.oViewModel.setProperty("/posts",aPost);         
            },
            onPostSearch : function(oEvent){
                const sQuery = oEvent.getParameter("query");
                const sCategory = this.oViewModel.getProperty("/selectedKey");
                let sPath;
                if(sQuery) sPath = `search/${sQuery}/category/${sCategory}`;
                this.getPosts(sPath);
            },
            testfn : async function(oEvent){
                const sBindingPath = oEvent.getSource().getBindingContext("ViewModel").getPath();
                const iId = this.oViewModel.getProperty(sBindingPath+"/id");
                const oPost = await (await fetch(`http://localhost:3000/posts/id/${iId}`)).json();
                this.onNavigation("Blog",oPost);
            }
        });
    }
);
