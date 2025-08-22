import { DataTypes, Model } from 'sequelize';
import sequelize from '../DB/db';

class Customer extends Model {
  public userId!: number;
  public dob?: Date;
}

Customer.init(
  {
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      field: 'user_id',
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  },
  {
    sequelize,
    tableName: 'customer',
    timestamps: false,
  }
);

export default Customer;
