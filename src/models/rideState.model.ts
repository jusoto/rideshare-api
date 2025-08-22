import { DataTypes, Model } from 'sequelize';
import sequelize from '../DB/db';

class RideState extends Model {
  public id!: number;
  public description?: string;
}

RideState.init(
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
    tableName: 'ride_state',
    timestamps: false,
  }
);

export default RideState;
