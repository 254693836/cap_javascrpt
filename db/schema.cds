namespace demo;

using { cuid, managed, Currency } from '@sap/cds/common';

entity Products : cuid, managed {
  name        : localized String(100) @mandatory;
  description : localized String(500);
  category    : String(60);
  price       : Decimal(9,2);
  currency    : Currency;
  stock       : Integer default 0;
  active      : Boolean default true;
}
