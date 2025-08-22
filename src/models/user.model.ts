import { DataTypes, Model } from 'sequelize';
import sequelize from '../DB/db';

class User extends Model {
  public id!: number;
  public firstname?: string;
  public lastname?: string;
  public email!: string;
  public password!: string;
  public income?: number;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    lastname: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    income: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    }
  },
  {
    sequelize,
    tableName: 'user',
    timestamps: false,
  }
);

export default User;
