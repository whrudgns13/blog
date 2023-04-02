/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */
sap.ui.define(
    ["sap/ui/core/UIComponent", "sap/blog/model/models"],
    /**
     * @param {typeof sap.ui.core.UIComponent} UIComponent
     * @param {typeof sap.blog.model.models} models
     */
    function (UIComponent, models) {
        "use strict";

        return UIComponent.extend("sap.blog.Component", {
            metadata: {
                manifest: "json",
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            },
        });
    }
);
