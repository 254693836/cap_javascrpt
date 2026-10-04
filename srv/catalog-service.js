const cds = require('@sap/cds');

module.exports = (srv) => {
  const { Products } = srv.entities;

  srv.on('checkExists', Products, async (req) => {
    const { ID } = req.params[0] || {};
    const product = await SELECT.one.from(Products).columns('ID').where({ ID });
    const found = Boolean(product);

    return {
      found,
      message: found ? 'データは存在します' : 'データは存在しません'
    };
  });
};
