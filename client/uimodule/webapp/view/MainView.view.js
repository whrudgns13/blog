sap.ui.define([], function () {
    "use strict";
    sap.ui.jsview("sap.blog.view.MainView", {
        getControllerName: function () {
            return "sap.blog.controller.MainView";
        },
        createContent: function () {
            this.setDisplayBlock(true);
            const oCustomHeader =  new sap.m.OverflowToolbar({
                height : "60px",
                content : [
                    new sap.m.Image({
                        src : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='92' height='45' viewBox='0 0 92 45'%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='45.483' x2='45.483' y2='45.001'%3E%3Cstop offset='0' stop-color='%2300AEEF'/%3E%3Cstop offset='.212' stop-color='%230097DC'/%3E%3Cstop offset='.519' stop-color='%23007CC5'/%3E%3Cstop offset='.792' stop-color='%23006CB8'/%3E%3Cstop offset='1' stop-color='%230066B3'/%3E%3C/linearGradient%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' fill='url%28%23a%29' d='M0 45h45.974L90.966 0H0v45'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' fill='%23fff' d='M53.984 9H45l.03 21.13-7.823-21.137H29.45l-6.678 17.653c-.71-4.492-5.354-6.042-9.008-7.203-2.413-.775-4.974-1.915-4.948-3.175.02-1.034 1.37-1.993 4.053-1.85 1.8.097 3.39.242 6.553 1.77l3.11-5.42C19.648 9.3 15.66 8.373 12.39 8.37h-.02c-3.813 0-6.988 1.235-8.956 3.27-1.372 1.42-2.112 3.226-2.142 5.223-.05 2.748.957 4.696 3.073 6.253 1.788 1.31 4.075 2.16 6.09 2.784 2.485.77 4.515 1.44 4.49 2.866-.02.52-.216 1.006-.59 1.398-.62.64-1.57.88-2.885.906-2.537.054-4.417-.345-7.413-2.116L1.27 34.444C4.263 36.146 7.44 37 11.05 37l.812-.006c3.142-.057 5.692-.81 7.718-2.44.116-.093.22-.187.328-.282l-.34 1.752 7.58-.024 1.36-3.482c1.43.488 3.056.758 4.782.758 1.682 0 3.264-.256 4.667-.716l.948 3.44 13.6.013.033-7.938h2.894c6.995 0 11.13-3.56 11.13-9.53C66.56 11.896 62.54 9 53.984 9zM33.29 27.062c-1.045 0-2.025-.182-2.868-.502l2.836-8.955h.055l2.79 8.98c-.84.3-1.797.477-2.814.477zm21.22-5.145h-1.974V14.7h1.975c2.63 0 4.73.876 4.73 3.562-.002 2.78-2.1 3.655-4.73 3.655'/%3E%3Cpath fill='none' d='M0 0h92v45H0z'/%3E%3C/svg%3E"
                    }),
                    new sap.m.Title({
                        text : "Community",
                        titleStyle : sap.ui.core.TitleLevel.H3
                    }),
                    new sap.m.ToolbarSpacer(),
                    new sap.m.Link({ text : "Topics"}),
                    new sap.m.Link({ text : "Groups"}),
                    new sap.m.Link({ text : "Answers"}),
                    new sap.m.Link({ text : "Events"}),
                    new sap.m.Link({ text : "Programs"}),
                    new sap.m.Link({ text : "Resources"}),
                    new sap.m.Link({ text : "What's New"}),
                    new sap.m.Text({ text : "|"}),
                    new sap.m.Button({icon : "sap-icon://search"}),
                    new sap.m.Button({icon : "sap-icon://person-placeholder"})
                ]
            }).addStyleClass("blog__header header__padding");
            
            const oPage = new sap.m.Page({
                customHeader : oCustomHeader,
                content: []
            });

            return new sap.m.App(this.createId("idAppControl"), {
                pages: oPage
            });
        },
    });
});
