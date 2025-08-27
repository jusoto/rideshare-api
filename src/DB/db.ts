import { Sequelize } from 'sequelize';

const dbName = process.env.DB_NAME || "rideshare_db";
const dbUser = process.env.DB_USER || "root";
const dbPassword = process.env.DB_PASSWORD || "root";
const dbHost = process.env.DB_HOST || "localhost";
const dbDialect = process.env.DB_DIALECT || "mysql";
const dbPort = process.env.DB_PORT || "3306";


const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDialect as 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql',
  port: parseInt(dbPort, 10),
  logging: false,
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

export default sequelize;