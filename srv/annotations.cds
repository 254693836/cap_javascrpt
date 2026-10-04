using CatalogService from './catalog-service';
using { Currency } from '@sap/cds/common';

annotate CatalogService.Products with @(
  UI.LineItem: [
    { $Type: 'UI.DataField', Value: name, Label: 'Name' },
    { $Type: 'UI.DataField', Value: category, Label: 'Category' },
    { $Type: 'UI.DataField', Value: price, Label: 'Price' },
    { $Type: 'UI.DataField', Value: currency_code, Label: 'Currency' },
    { $Type: 'UI.DataField', Value: stock, Label: 'Stock' },
    { $Type: 'UI.DataField', Value: active, Label: 'Active' }
  ],
  UI.Identification: [
    { $Type: 'UI.DataField', Value: name, Label: 'Name' },
    { $Type: 'UI.DataField', Value: description, Label: 'Description' },
    { $Type: 'UI.DataField', Value: category, Label: 'Category' },
    { $Type: 'UI.DataField', Value: price, Label: 'Price' },
    { $Type: 'UI.DataField', Value: currency_code, Label: 'Currency' },
    { $Type: 'UI.DataField', Value: stock, Label: 'Stock' },
    { $Type: 'UI.DataField', Value: active, Label: 'Active' }
  ]
);
