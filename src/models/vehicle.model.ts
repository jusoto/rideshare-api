import { DataTypes, Model } from 'sequelize';
import sequelize from '../DB/db';

class Vehicle extends Model {
  public id!: number;
  public userId!: number;
  public vehicleTypeId!: number;
  public year?: number;
  public make?: string;
  public model?: string;
  public color?: string;
  public licensePlate?: string;
  public vin?: string;
}

Vehicle.init(
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
    vehicleTypeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: 'vehicle_type_id',
    },
    year: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    make: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    model: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    licensePlate: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'license_plate',
    },
    vin: {
      type: DataTypes.STRING(100),
      allowNull: true,
    }
  },
  {
    sequelize,
    tableName: 'vehicle',
    timestamps: false,
  }
);

export default Vehicle;
