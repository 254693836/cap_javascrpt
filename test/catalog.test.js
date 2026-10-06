const test = require('node:test');
const assert = require('node:assert/strict');
const cds = require('@sap/cds');

const { GET, POST, PATCH } = cds.test(__dirname + '/..');
const baseUrl = '/catalog3';

test('products can be listed, created, updated, and checked', async () => {
  const list = await GET(`${baseUrl}/Products`);
  assert.equal(list.status, 200);
  assert.ok(list.data.value.length >= 3);

  const product = {
    name: 'Test Product',
    category: 'Tests',
    price: 10,
    currency_code: 'JPY',
    stock: 1,
    active: true
  };
  const created = await POST(`${baseUrl}/Products`, product);
  assert.equal(created.status, 201);

  const productId = created.data.ID;
  assert.ok(productId);

  const updated = await PATCH(`${baseUrl}/Products(${productId})`, { stock: 2 });
  assert.equal(updated.status, 200);

  const check = await POST(`${baseUrl}/Products(${productId})/CatalogService.checkExists`, {});
  assert.equal(check.status, 200);
  assert.equal(check.data.found, true);
  assert.equal(check.data.message, 'データは存在します');

  const invalid = await POST(`${baseUrl}/Products`, { name: ' ', price: -1, stock: -1 });
  assert.equal(invalid.status, 400);
});
