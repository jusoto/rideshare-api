import { DataTypes, Model } from 'sequelize';
import sequelize from '../DB/db';

class Driver extends Model {
  public userId!: number;
  public socialSecurityNumber?: string | null;
  public driverLicense?: string | null;
  public dob?: string | null;
}

Driver.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'user_id',
    },
    socialSecurityNumber: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'social_security_number',
    },
    driverLicense: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'driver_license',
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'dob',
    }
  },
  {
    sequelize,
    tableName: 'driver',
    timestamps: false,
  }
);

export default Driver;
