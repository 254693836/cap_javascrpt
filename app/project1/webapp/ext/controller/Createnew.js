sap.ui.define([
    "sap/m/Button",
    "sap/m/CheckBox",
    "sap/m/Dialog",
    "sap/m/Input",
    "sap/m/Label",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/m/VBox"
], function(Button, CheckBox, Dialog, Input, Label, MessageBox, MessageToast, VBox) {
    'use strict';

    return {
        /**
         * Opens a dialog and creates a product through the CAP OData service.
         */
        create: function() {
            const nameInput = new Input({ width: "100%" });
            const descriptionInput = new Input({ width: "100%" });
            const categoryInput = new Input({ width: "100%" });
            const priceInput = new Input({ type: "Number", width: "100%", value: "0" });
            const currencyInput = new Input({ width: "100%", value: "JPY", maxLength: 3 });
            const stockInput = new Input({ type: "Number", width: "100%", value: "0" });
            const activeInput = new CheckBox({ selected: true, text: "有効" });

            const dialog = new Dialog({
                title: "新規商品",
                contentWidth: "28rem",
                content: new VBox({
                    class: "sapUiSmallMargin",
                    items: [
                        new Label({ text: "商品名", required: true, labelFor: nameInput }), nameInput,
                        new Label({ text: "説明", labelFor: descriptionInput }), descriptionInput,
                        new Label({ text: "カテゴリ", labelFor: categoryInput }), categoryInput,
                        new Label({ text: "価格", labelFor: priceInput }), priceInput,
                        new Label({ text: "通貨", labelFor: currencyInput }), currencyInput,
                        new Label({ text: "在庫数", labelFor: stockInput }), stockInput,
                        activeInput
                    ]
                }),
                beginButton: new Button({
                    text: "保存",
                    type: "Emphasized",
                    press: async function() {
                        const name = nameInput.getValue().trim();
                        const price = Number(priceInput.getValue());
                        const stock = Number(stockInput.getValue());

                        if (!name) {
                            nameInput.setValueState("Error");
                            nameInput.setValueStateText("商品名を入力してください。");
                            return;
                        }
                        if (!Number.isFinite(price) || price < 0 || !Number.isInteger(stock) || stock < 0) {
                            MessageBox.error("価格は0以上の数値、在庫数は0以上の整数で入力してください。");
                            return;
                        }

                        try {
                            const response = await fetch("/catalog3/Products", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    name,
                                    description: descriptionInput.getValue().trim(),
                                    category: categoryInput.getValue().trim(),
                                    price,
                                    currency_code: currencyInput.getValue().trim().toUpperCase() || "JPY",
                                    stock,
                                    active: activeInput.getSelected()
                                })
                            });

                            if (!response.ok) {
                                const error = await response.json().catch(() => ({}));
                                throw new Error(error.error && error.error.message || "商品の保存に失敗しました。");
                            }

                            dialog.close();
                            MessageToast.show("商品を登録しました。");
                            window.location.reload();
                        } catch (error) {
                            MessageBox.error(error.message || "商品の保存に失敗しました。");
                        }
                    }
                }),
                endButton: new Button({
                    text: "キャンセル",
                    press: function() { dialog.close(); }
                }),
                afterClose: function() { dialog.destroy(); }
            });

            dialog.open();
        }
    };
});
