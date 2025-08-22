import { DataTypes, Model } from 'sequelize';
import sequelize from '../DB/db';

class Admin extends Model {
  public userId!: number;
  public employeeId?: string;
}

Admin.init(
  {
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      field: 'user_id',
    },
    employeeId: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true,
      field: 'employee_id',
    }
  },
  {
    sequelize,
    tableName: 'admin',
    timestamps: false,
  }
);

export default Admin;
