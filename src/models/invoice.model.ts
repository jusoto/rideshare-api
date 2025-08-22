import { DataTypes, Model } from 'sequelize';
import sequelize from '../DB/db';

class Invoice extends Model {
  public id!: number;
  public rideId!: number;
  public paymentMethodId?: number;
  public totalAmount!: number;
  public totalDuration?: number;
}

Invoice.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rideId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      field: 'ride_id',
    },
    paymentMethodId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'payment_method_id',
    },
    totalAmount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      field: 'total_amount',
    },
    totalDuration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'total_duration',
    }
  },
  {
    sequelize,
    tableName: 'invoice',
    timestamps: false,
  }
);

export default Invoice;
