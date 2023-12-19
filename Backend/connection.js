import sql from "mysql"

const connection = sql.createConnection({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12671606',
    password: '2LIdDq6ukz',
    database: 'sql12671606',
  });
  
  // Connect to MySQL
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err.stack);
      return;
    }
    console.log('Connected to MySQL as id', connection.threadId);
  });

  export default connection;