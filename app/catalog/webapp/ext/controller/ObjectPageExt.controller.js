sap.ui.define(["sap/ui/core/mvc/ControllerExtension", "sap/m/MessageBox"], (ControllerExtension, MessageBox) => {
  "use strict";

  return ControllerExtension.extend("demo.productcatalog.ext.controller.ObjectPageExt", {
    onCheck: async function () {
      const context = this.base.getExtensionAPI().getBindingContext();
      const results = await this.base.getExtensionAPI().invokeActions("CatalogService.checkExists", [context]);
      const result = Array.isArray(results) ? results[0] : results;
      const message = result?.getObject?.().message || "データは存在しません";
      MessageBox.information(message);
    }
  });
});
