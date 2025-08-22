import { DataTypes, Model } from 'sequelize';
import sequelize from '../DB/db';

class PaymentMethod extends Model {
  public id!: number;
  public userId!: number;
  public ccNumber?: string;
  public ccName?: string;
  public ccExpiry?: string;
  public ccCvv?: string;
  public billingAddress?: string;
  public billingCity?: string;
  public billingState?: string;
  public billingZip?: string;
  public billingCountry?: string;
}

PaymentMethod.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: 'user_id',
    },
    ccNumber: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'cc_number',
    },
    ccName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'cc_name',
    },
    ccExpiry: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'cc_expiry',
    },
    ccCvv: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'cc_cvv',
    },
    billingAddress: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'billing_address',
    },
    billingCity: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'billing_city',
    },
    billingState: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'billing_state',
    },
    billingZip: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'billing_zip',
    },
    billingCountry: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'billing_country',
    }
  },
  {
    sequelize,
    tableName: 'payment_method',
    timestamps: false,
  }
);

export default PaymentMethod;
