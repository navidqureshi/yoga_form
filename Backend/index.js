import express from "express"
import connection from "./connection.js";
import cron from "node-cron";
import cors from "cors"

const app = express();
app.use(cors());
const PORT = 3000;
app.use(express.json());



app.post('/users', (req, res) => {
    const { name, age, number, batch, email } = req.body;
  
    const query = `
      INSERT INTO users (name, age, number, batch, email)
      VALUES (?, ?, ?, ?, ?)
    `;
  
    connection.query(query, [name, age, number, batch, email], (error, results) => {
      if (error) {
        console.error('Error inserting user:', error);
        return res.status(500).json({ error: 'Error inserting user' });
      }
  
      res.json({ message: 'Payment Successful !', userId: results.insertId });
    });
  });
  

cron.schedule('0 0 * * *', async () => {
    console.log('Running the daily job...');
  
    const query = `
      UPDATE users
      SET payment_status = CASE
        WHEN DATEDIFF(CURDATE(), last_payment_date) > 30 THEN false
        ELSE true
      END
    `;
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error updating payment status:', error);
      } else {
        console.log('Payment status updated successfully');
      }
    });
  }, {
    scheduled: true,
    timezone: 'IST', 
  });
  

app.listen(PORT, () => {
    console.log("Listening on " + PORT)
})