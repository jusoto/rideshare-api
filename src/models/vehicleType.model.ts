import { DataTypes, Model } from 'sequelize';
import sequelize from '../DB/db';

class VehicleType extends Model {
  public id!: number;
  public description?: string;
}

VehicleType.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true,
    }
  },
  {
    sequelize,
    tableName: 'vehicle_type',
    timestamps: false,
  }
);

export default VehicleType;
