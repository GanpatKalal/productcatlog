module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    description: DataTypes.STRING,
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    deletionDate: {
      type: DataTypes.DATE,
      defaultValue: null
    },
  });

  return Product;
};
