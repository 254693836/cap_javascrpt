sap.ui.define([
    "sap/m/MessageBox"
], function(MessageBox) {
    "use strict";

    return {
        /**
         * Calls the bound CAP action for the product currently shown on the Object Page.
         *
         * @param {sap.ui.model.odata.v4.Context} oContext Current product context.
         * @returns {Promise<void>} Result of the existence check.
         */
        check: async function(oContext) {
            if (!oContext) {
                MessageBox.error("確認対象の商品が見つかりません。");
                return;
            }

            try {
                const response = await fetch(
                    "/catalog3" + oContext.getPath() + "/CatalogService.checkExists",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: "{}"
                    }
                );

                const result = await response.json().catch(() => ({}));
                if (!response.ok) {
                    throw new Error(result.error && result.error.message || "存在チェックに失敗しました。");
                }

                MessageBox.information(result.message || "存在チェックが完了しました。");
            } catch (error) {
                MessageBox.error(error.message || "存在チェックに失敗しました。");
            }
        }
    };
});
