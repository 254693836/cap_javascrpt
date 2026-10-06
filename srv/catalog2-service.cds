using { demo as db } from '../db/schema';

@path: '/catalog3'
@impl: './catalog-service.js'
service CatalogService {
  entity Products as projection on db.Products actions {
    action checkExists() returns CheckResult;
  };

  type CheckResult {
    found   : Boolean;
    message : String;
  }
}
