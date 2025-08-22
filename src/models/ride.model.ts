import { DataTypes, Model } from 'sequelize';
import sequelize from '../DB/db';

class Ride extends Model {
  public id!: number;
  public customerId?: number;
  public driverId?: number;
  public vehicleId?: number;
  public rideStateId?: number;
  public originAddress?: string;
  public originLatitude?: number;
  public originLongitude?: number;
  public destinationAddress?: string;
  public destinationLatitude?: number;
  public destinationLongitude?: number;
  public timeEstimate?: number;
  public priceEstimate?: number;
}

Ride.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    customerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      field: 'customer_id',
    },
    driverId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      field: 'driver_id',
    },
    vehicleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      field: 'vehicle_id',
    },
    rideStateId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      field: 'ride_state_id',
    },
    originAddress: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'origin_address',
    },
    originLatitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'origin_latitude',
    },
    originLongitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'origin_longitude',
    },
    destinationAddress: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'destination_address',
    },
    destinationLatitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'destination_latitude',
    },
    destinationLongitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'destination_longitude',
    },
    timeEstimate: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      field: 'time_estimate',
    },
    priceEstimate: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'price_estimate',
    }
  },
  {
    sequelize,
    tableName: 'ride',
    timestamps: false,
  }
);

export default Ride;
