const cds = require('@sap/cds');

module.exports = (srv) => {
  const { Products } = srv.entities;

  srv.before('CREATE', Products, (req) => {
    const { name, price, stock } = req.data;

    if (typeof name !== 'string' || !name.trim()) {
      return req.error(400, '商品名を入力してください。', 'name');
    }
    req.data.name = name.trim();

    if (price !== undefined && (Number.isNaN(Number(price)) || Number(price) < 0)) {
      return req.error(400, '価格は0以上の数値で入力してください。', 'price');
    }

    if (stock !== undefined && (!Number.isInteger(Number(stock)) || Number(stock) < 0)) {
      return req.error(400, '在庫数は0以上の整数で入力してください。', 'stock');
    }
  });

  srv.on('checkExists', [Products, Products.drafts], async (req) => {
    const { ID } = req.params[0] || {};
    const product = await SELECT.one.from(req.target).columns('ID').where({ ID });
    const found = Boolean(product);

    return {
      found,
      message: found ? 'データは存在します1' : 'データは存在しません2'
    };
  });
};
