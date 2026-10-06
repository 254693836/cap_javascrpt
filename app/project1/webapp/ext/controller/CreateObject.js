sap.ui.define([
    "sap/m/MessageBox"
], function(MessageBox) {
    "use strict";

    return {
        /**
         * Opens the Fiori elements Object Page in create mode.
         * The Object Page's Save button sends the CREATE request to CAP.
         */
        create: function() {
            const extensionAPI = this.base && this.base.getExtensionAPI && this.base.getExtensionAPI();
            const editFlow = this.editFlow || (extensionAPI && extensionAPI.editFlow);

            if (!editFlow) {
                MessageBox.error("新規Object画面を開始できません。画面を再読み込みしてから、もう一度実行してください。");
                return Promise.resolve();
            }

            return editFlow.createDocument("/Products", {
                creationMode: "NewPage"
            }).catch(function(error) {
                MessageBox.error(error.message || "新規Object画面を開始できませんでした。");
            });
        }
    };
});
