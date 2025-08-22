import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import User from './models/user.model';
import Admin from './models/admin.model';
import Customer from './models/customer.model';
import Driver from './models/driver.model';
import Invoice from './models/invoice.model';
import PaymentMethod from './models/paymentMethod.model';
import ride from './models/ride.model';
import RideState from './models/rideState.model';
import Vehicle from './models/vehicle.model';
import VehicleType from './models/vehicleType.model';
import auth from './auth/auth';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// --- Public routes ---
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the React API Server!');
});

// --- Login (Basic Auth -> JWT) ---
/**
 * Flow:
 *  - Client sends Authorization: Basic <base64 user:pass>
 *  - If valid, we mint a JWT and return it.
 */
// app.post('/login', auth.authenticate('basic', { session: false }), (req: Request, res: Response) => {
//   const user = req.user;
//   if (user) {
//     const token = auth.signToken(user.id);
//     res.json({ token });
//   } else {
//     res.status(401).json({ message: 'Authentication failed' });
//   }
// });

// Protect users endpoints (adjust as you prefer)
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname } = req.body;
  const user = await User.findByPk(id);

  if (user) {
    user.firstname = firstname;
    user.lastname = lastname;
    await user.save();
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

/**
 * Create a new user
 * @route POST /users
 * @body {string} firstname - The first name of the user
 * @body {string} lastname - The last name of the user
 * @body {string} email - The email address of the user
 * @body {string} password - The password for the user account
 * @returns {User} The created user object
 */
app.post('/users', async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const user = await User.create({ firstname, lastname, email, password });
    res.status(201).json(user);
  } catch (err: any) {
    console.error('SQL:', err?.original?.sql);
    console.error('MySQL:', err?.original?.code, err?.original?.errno, err?.original?.sqlMessage);
    console.error('Sequelize:', err?.message);
    res.status(500).json({ error: err?.original?.sqlMessage || err?.message });
  }
});

// --- Admin routes ---

/**
 * Get all admins
 * @route GET /admins
 * @returns {Array<Admin>} An array of all admins
 */
app.get('/admins', async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.json(admins);
  } catch (err: any) {
    console.error('SQL:', err?.original?.sql);
    console.error('MySQL:', err?.original?.code, err?.original?.errno, err?.original?.sqlMessage);
    console.error('Sequelize:', err?.message);
    res.status(500).json({ error: err?.original?.sqlMessage || err?.message });
  }
});

/**
 * Create a new admin
 * @route POST /admins
 * @body {string} firstname - The first name of the admin
 * @body {string} lastname - The last name of the admin
 * @body {string} email - The email address of the admin
 * @body {string} password - The password for the admin account
 * @returns {Admin} The created admin object
 */
app.post('/admins', async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const admin = await Admin.create({ firstname, lastname, email, password });
    res.status(201).json(admin);
  } catch (err: any) {
    console.error('SQL:', err?.original?.sql);
    console.error('MySQL:', err?.original?.code, err?.original?.errno, err?.original?.sqlMessage);
    console.error('Sequelize:', err?.message);
    res.status(500).json({ error: err?.original?.sqlMessage || err?.message });
  }
});

// --- Customer routes ---

/**
 * Get all customers
 * @route GET /customers
 * @returns {Array<Customer>} An array of all customers
 */
app.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (err: any) {
    console.error('SQL:', err?.original?.sql);
    console.error('MySQL:', err?.original?.code, err?.original?.errno, err?.original?.sqlMessage);
    console.error('Sequelize:', err?.message);
    res.status(500).json({ error: err?.original?.sqlMessage || err?.message });
  }
});

/**
 * Create a new customer
 * @route POST /customers
 * @body {string} firstname - The first name of the customer
 * @body {string} lastname - The last name of the customer
 * @body {string} email - The email address of the customer
 * @body {string} password - The password for the customer account
 * @returns {Customer} The created customer object
 */
app.post('/customers', async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const customer = await Customer.create({ firstname, lastname, email, password });
    res.status(201).json(customer);
  } catch (err: any) {
    console.error('SQL:', err?.original?.sql);
    console.error('MySQL:', err?.original?.code, err?.original?.errno, err?.original?.sqlMessage);
    console.error('Sequelize:', err?.message);
    res.status(500).json({ error: err?.original?.sqlMessage || err?.message });
  }
});

// --- Driver routes ---

/**
 * Get all drivers
 * @route GET /drivers
 * @returns {Array<Driver>} An array of all drivers
 */
app.get('/drivers', async (req, res) => {
  try {
    const drivers = await Driver.findAll();
    res.json(drivers);
  } catch (err: any) {
    console.error('SQL:', err?.original?.sql);
    console.error('MySQL:', err?.original?.code, err?.original?.errno, err?.original?.sqlMessage);
    console.error('Sequelize:', err?.message);
    res.status(500).json({ error: err?.original?.sqlMessage || err?.message });
  }
});

/**
 * Create a new driver
 * @route POST /drivers
 */
app.post('/drivers', async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const driver = await Driver.create({ firstname, lastname, email, password });
    res.status(201).json(driver);
  } catch (err: any) {
    console.error('SQL:', err?.original?.sql);
    console.error('MySQL:', err?.original?.code, err?.original?.errno, err?.original?.sqlMessage);
    console.error('Sequelize:', err?.message);
    res.status(500).json({ error: err?.original?.sqlMessage || err?.message });
  }
});

// --- Invoice routes ---

/**
 * Get all invoices
 * @route GET /invoices
 * @returns {Array<Invoice>} An array of all invoices
 */
app.get('/invoices', async (req, res) => {
  try {
    const invoices = await Invoice.findAll();
    res.json(invoices);
  } catch (err: any) {
    console.error('SQL:', err?.original?.sql);
    console.error('MySQL:', err?.original?.code, err?.original?.errno, err?.original?.sqlMessage);
    console.error('Sequelize:', err?.message);
    res.status(500).json({ error: err?.original?.sqlMessage || err?.message });
  }
});

/**
 * Create a new invoice
 * @route POST /invoices
 * @body {number} amount - The total amount for the invoice
 * @body {number} customerId - The ID of the customer associated with the invoice
 * @returns {Invoice} The created invoice object
 */
app.post('/invoices', async (req, res) => {
  try {
    const { amount, customerId } = req.body;
    const invoice = await Invoice.create({ amount, customerId });
    res.status(201).json(invoice);
  } catch (err: any) {
    console.error('SQL:', err?.original?.sql);
    console.error('MySQL:', err?.original?.code, err?.original?.errno, err?.original?.sqlMessage);
    console.error('Sequelize:', err?.message);
    res.status(500).json({ error: err?.original?.sqlMessage || err?.message });
  }
});

// --- Payment Method routes ---

/**
 * Get all payment methods
 * @route GET /payment-methods
 */
app.get('/payment-methods', async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.findAll();
    res.json(paymentMethods);
  } catch (err: any) {
    console.error('SQL:', err?.original?.sql);
    console.error('MySQL:', err?.original?.code, err?.original?.errno, err?.original?.sqlMessage);
    console.error('Sequelize:', err?.message);
    res.status(500).json({ error: err?.original?.sqlMessage || err?.message });
  }
});

/**
 * Create a new payment method
 * @route POST /payment-methods
 * @body {string} type - The type of payment method (e.g., 'credit_card', 'paypal')
 * @body {object} details - Additional details for the payment method
 * @returns {PaymentMethod} The created payment method object
 */
app.post('/payment-methods', async (req, res) => {
  try {
    const { type, details } = req.body;
    const paymentMethod = await PaymentMethod.create({ type, details });
    res.status(201).json(paymentMethod);
  } catch (err: any) {
    console.error('SQL:', err?.original?.sql);
    console.error('MySQL:', err?.original?.code, err?.original?.errno, err?.original?.sqlMessage);
    console.error('Sequelize:', err?.message);
    res.status(500).json({ error: err?.original?.sqlMessage || err?.message });
  }
});

// --- Ride routes ---

/** * Get all rides
 * @route GET /rides
 * @returns {Array<Ride>} An array of all rides
*/
app.get('/rides', async (req, res) => {
  try {
    const rides = await ride.findAll(); 
    res.json(rides);
  } catch (err: any) {
    console.error('SQL:', err?.original?.sql);
    console.error('MySQL:', err?.original?.code, err?.original?.errno, err?.original?.sqlMessage);
    console.error('Sequelize:', err?.message);
    res.status(500).json({ error: err?.original?.sqlMessage || err?.message });
  }
});

/**
 * Create a new ride
 * @route POST /rides
 * @body {number} customerId - The ID of the customer requesting the ride
 * @body {number} driverId - The ID of the driver assigned to the ride
 * @body {number} vehicleId - The ID of the vehicle used for the ride
 * @body {number} stateId - The ID of the current state of the ride
 * @returns {Ride} The created ride object
 */
app.post('/rides', async (req, res) => {
  try {
    const { customerId, driverId, vehicleId, stateId } = req.body;
    const newRide = await ride.create({ customerId, driverId, vehicleId, stateId });
    res.status(201).json(newRide);
  } catch (err: any) {
    console.error('SQL:', err?.original?.sql);
    console.error('MySQL:', err?.original?.code, err?.original?.errno, err?.original?.sqlMessage);
    console.error('Sequelize:', err?.message);
    res.status(500).json({ error: err?.original?.sqlMessage || err?.message });
  }
});

// --- Ride State routes ---

/** * Get all ride states
 * @route GET /ride-states
 * @returns {Array<RideState>} An array of all ride states
*/
app.get('/ride-states', async (req, res) => {
  try {
    const rideStates = await RideState.findAll();
    res.json(rideStates);
  } catch (err: any) {
    console.error('SQL:', err?.original?.sql);
    console.error('MySQL:', err?.original?.code, err?.original?.errno, err?.original?.sqlMessage);
    console.error('Sequelize:', err?.message);
    res.status(500).json({ error: err?.original?.sqlMessage || err?.message });
  }
});

/**
 * Create a new ride state
 * @route POST /ride-states
 * @body {string} state - The state of the ride (e.g., 'requested', 'in_progress', 'completed')
 * @returns {RideState} The created ride state object
 */
app.post('/ride-states', async (req, res) => {
  try {
    const { description } = req.body;
    const newState = await RideState.create({ description });
    res.status(201).json(newState);
  } catch (err: any) {
    console.error('SQL:', err?.original?.sql);
    console.error('MySQL:', err?.original?.code, err?.original?.errno, err?.original?.sqlMessage);
    console.error('Sequelize:', err?.message);
    res.status(500).json({ error: err?.original?.sqlMessage || err?.message });
  }
});

// --- Vehicle routes ---

/**
 * Get all vehicles
 * @route GET /vehicles
 * @returns {Array<Vehicle>} An array of all vehicles
*/
app.get('/vehicles', async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.json(vehicles);
  } catch (err: any) {
    console.error('SQL:', err?.original?.sql);
    console.error('MySQL:', err?.original?.code, err?.original?.errno, err?.original?.sqlMessage);
    console.error('Sequelize:', err?.message);
    res.status(500).json({ error: err?.original?.sqlMessage || err?.message });
  }
});

/**
 * Create a new vehicle
 * @route POST /vehicles
 * @body {string} make - The make of the vehicle (e.g., 'Toyota', 'Honda
 * @body {string} model - The model of the vehicle (e.g., 'Camry', 'Civic')
 * @body {number} year - The year of the vehicle (e.g., 2020)
 * @body {number} typeId - The ID of the vehicle type (e.g., 'Sedan', 'SUV')
 * @returns {Vehicle} The created vehicle object
*/
app.post('/vehicles', async (req, res) => {
  try {
    const { make, model, year, typeId } = req.body;
    const newVehicle = await Vehicle.create({ make, model, year, typeId });
    res.status(201).json(newVehicle);
  } catch (err: any) {
    console.error('SQL:', err?.original?.sql);
    console.error('MySQL:', err?.original?.code, err?.original?.errno, err?.original?.sqlMessage);
    console.error('Sequelize:', err?.message);
    res.status(500).json({ error: err?.original?.sqlMessage || err?.message });
  }
});

// --- Vehicle Type routes ---

/**
 * Get all vehicle types
 * @route GET /vehicle-types
 * @returns {Array<VehicleType>} An array of all vehicle types
*/
app.get('/vehicle-types', async (req, res) => {
  try {
    const vehicleTypes = await VehicleType.findAll();
    res.json(vehicleTypes);
  } catch (err: any) {
    console.error('SQL:', err?.original?.sql);
    console.error('MySQL:', err?.original?.code, err?.original?.errno, err?.original?.sqlMessage);
    console.error('Sequelize:', err?.message);
    res.status(500).json({ error: err?.original?.sqlMessage || err?.message });
  }
});

/**
 * Create a new vehicle type
 * @route POST /vehicle-types
 * @body {string} type - The type of vehicle (e.g., 'Sedan', 'SUV')
 * @returns {VehicleType} The created vehicle type object
 */
app.post('/vehicle-types', async (req, res) => {
  try {
    const { description } = req.body;
    const newVehicleType = await VehicleType.create({ description });
    res.status(201).json(newVehicleType);
  } catch (err: any) {
    console.error('SQL:', err?.original?.sql);
    console.error('MySQL:', err?.original?.code, err?.original?.errno, err?.original?.sqlMessage);
    console.error('Sequelize:', err?.message);
    res.status(500).json({ error: err?.original?.sqlMessage || err?.message });
  }
});

// --- Start the server ---
// If you have an Express-compatible middleware, use it here, e.g.:
// app.use(authMiddleware);
// Otherwise, remove or fix the import/export in './auth/auth'

app.use((req: Request, res: Response) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await User.sequelize?.authenticate();
  console.log('Database connected');
});
