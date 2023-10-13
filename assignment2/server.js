
const express = require('express');
const session = require('express-session');
const app = express();
const fs = require('fs');

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


const users = [
    { username: 'admin', password: '123' },
];
const usersData = JSON.parse(fs.readFileSync('fakeUsers.json'));

app.get('/home', (req, res) => {
    const welcomePageHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Welcome!</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            text-align: center;
            margin: 0;
            padding: 0;
          }
          .welcome-container {
            background-color: #3498db;
            color: #fff;
            margin: 50px auto;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            max-width: 600px;
          }
          .welcome-link {
            display: inline-block;
            background-color: #f0f0f0;
            color: #333;
            text-decoration: none;
            padding: 10px;
            border-radius: 10px;
            margin: 10px;
            font-weight: bold;
          }
          h1 {
            font-size: 36px;
            margin: 0;
          }
          p {
            font-size: 18px;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="welcome-container">
          <h1>Welcome</h1>
          <p> Please Enter Your Credentials</p>
          <a class="welcome-link" href="/login">Login </a>

        </div>
      </body>
      </html>
    `;
  
    res.send(welcomePageHTML);
  });
  

app.use(express.urlencoded({ extended: true }));





app.get('/list', (req, res) => {
  const usersData = JSON.parse(fs.readFileSync('fakeUsers.json'));

    const page = req.query.page || 1;
    const perPage = 25;
    const startIdx = (page - 1) * perPage;
    const endIdx = startIdx + perPage;
    const usersOnPage = usersData.slice(startIdx, endIdx);

    const tableRows = usersOnPage.map(user => `
        <tr class="rounded-square">
            <td><a href="/list/${user.id}">${user.id}</a></td>
            <td>${user.firstName} ${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.dob}</td>
            <td>${user.company}</td>
            <td>${user.phone}</td>
        </tr>
    `).join('');

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                table {
                    border-collapse: collapse;
                    width: 80%;
                    margin: 0 auto;
                }

                th, td {
                    border: 1px solid #333;
                    padding: 10px;
                    text-align: center;
                }

                th {
                    background-color: #3498db;
                    color: white;
                }

                tr:hover {
                    background-color: #3498db;
                    color: white;
                }

                .rounded-square {
                    border-radius: 10px;
                }

                a {
                    text-decoration: none;
                    color: inherit;
                }
            </style>
        </head>
        <body>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Date of Birth</th>
                    <th>Company</th>
                    <th>Phone</th>
                </tr>
                ${tableRows}
            </table>
        </body>
        </html>
    `;

    res.send(html);
});

app.get('/list/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = usersData.find(user => user.id === userId);

  if (!user) {
      res.status(404).send('User not found');
      return;
  }

    const userDataHtml = `
        <h1>User ID: ${user.id}</h1>
        <p>Name: ${user.firstName} ${user.lastName}</p>
        <p>Email: ${user.email}</p>
        <p>Password: ${user.password}</p>
        <p>Date of Birth: ${user.dob}</p>
        <p>Company: ${user.company}</p>
        <p>Phone: ${user.phone}</p>
    `;

    res.send(userDataHtml);
});
app.use(express.static('public'));







// handling sessions
app.use(
    session({
        secret: '12',
        resave: false,
        saveUninitialized: true,
    })
);

//   POST request body
app.use(express.urlencoded({ extended: true }));

//   login page
app.get('/login', (req, res) => {
    res.send(`
        <form method="post" action="/login">
            <label for="username">Username:</label>
            <input type="text" name="username" id="username" required><br>
            <label for="password">Password:</label>
            <input type="password" name="password" id="password" required><br>
            <button type="submit">Log In</button>
        </form>
    `);
});

//  login post request
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {

      req.session.user = user;
        res.redirect('/list');
    } else {
        res.send('Invalid credentials');
    }
});

// Serve the paginated list view page
app.get('/list', (req, res) => {
    // Check authenticate
    if (!req.session.user) {
        return res.redirect('/login');
    }

    const page = req.query.page || 1;
    const perPage = 25;
    const startIdx = (page - 1) * perPage;
    const endIdx = startIdx + perPage;
    const usersOnPage = users.slice(startIdx, endIdx);

    const tableRows = usersOnPage.map((user) => `
        <tr class="rounded-square">
            <td>${user.username}</td>
            <!-- Other user information -->
        </tr>
    `).join('');

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <!-- CSS styles for the table -->
        </head>
        <body>
            <!-- Table structure and content -->
            <table>
                <tr>
                    <th>Username</th>
                    <!-- Other table headers -->
                </tr>
                ${tableRows}
            </table>
        </body>
        </html>
    `;

    res.send(html);
});









