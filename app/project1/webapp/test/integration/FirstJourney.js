sap.ui.define([
    "sap/ui/test/opaQunit",
    "./pages/JourneyRunner"
], function (opaTest, runner) {
    "use strict";

    function journey() {
        QUnit.module("First journey");

        opaTest("Start application", function (Given, When, Then) {
            Given.iStartMyApp();

            Then.onTheProductsList.iSeeThisPage();
            Then.onTheProductsList.onTable().iCheckColumns(6, {"name":{"header":"Name"},"category":{"header":"Category"},"price":{"header":"Price"},"currency_code":{"header":"Currency"},"stock":{"header":"Stock"},"active":{"header":"Active"}});

        });


        opaTest("Navigate to ObjectPage", function (Given, When, Then) {
            // Note: this test will fail if the ListReport page doesn't show any data
            
            When.onTheProductsList.onFilterBar().iExecuteSearch();
            
            Then.onTheProductsList.onTable().iCheckRows();

            When.onTheProductsList.onTable().iPressRow(0);
            Then.onTheProductsObjectPage.iSeeThisPage();

        });

        opaTest("Teardown", function (Given, When, Then) { 
            // Cleanup
            Given.iTearDownMyApp();
        });
    }

    runner.run([journey]);
});