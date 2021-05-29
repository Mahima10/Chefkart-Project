const
    app = express(),
    bcrypt = require('bcrypt'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    express = require('express'),
    mysqlConnection = require('./common/mysql-controller');

let port = process.env.PORT || 8080; // If port is not specified in .env then, default will be considered as 8080

app.use(cors());

// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.json('Welcome to the Chefkart Backend!');
})


// API to register a user.
app.post('/user/register', async function (req, res) {
    try {

        let { name, password, phone_number, address } = req.body;
        const salt = await bcrypt.genSalt();
        password = await bcrypt.hash(password, salt);
        const user = { name, password, phone_number, address };
        console.log(req.body);

        console.log(JSON.stringify(req.body));
        mysqlConnection().connect(function (err) {
            if (err) throw err;
            let query = `insert into client_referals.user set ? `;
            mysqlConnection().query(query, user, (error, response) => {
                console.log(error || response);
                if (response) {
                    res.status(200).send('User Signup Successful')
                } else {
                    res.json(error);
                }
            });
        });
    }
    catch (error) {
        console.log(`Routes: Error occured while signup: ${error.message}`);
        throw error;
    }
})

// API to sign-in
app.post('/user/signIn', function (req, res) {
    try {

        const { phone_number, password } = req.body;
        mysqlConnection().connect(function (err) {
            if (err) throw err;
            let query = `SELECT * FROM client_referals.user WHERE phone_number = "${phone_number}"`;
            mysqlConnection().query(query, async function (err, result, fields) {

                if (err) res.status(400, "User not found");
                if (!result || result.length == 0) {
                    return res.status(400).send("User not exists");
                } else {
                    // user exists.
                    const response = await bcrypt.compare(password, result[0].password);
                    console.log("response:", response)
                    if (response == true) {
                        res.status(200).send("Authentication Successful.")
                    } else {
                        res.status(401).send("Unauthorized");
                    }
                }
            });
        });
    }
    catch (error) {
        console.log(`Routes: Error occured while fetching user details: ${error.message}`);
        throw error;
    }
})


// Retrieve user details
app.get('/users/:userId', function (req, res) {
    try {

        const user_id = req.params.userId;
        console.log("Printing user Id:", user_id);

        mysqlConnection().connect(function (err) {
            if (err) throw err;
            let query = `SELECT name, phone_number, address FROM client_referals.user WHERE id = ${user_id}`;
            mysqlConnection().query(query, function (err, result, fields) {
                if (result) {
                    res.status(200).send(JSON.stringify(result[0]));
                } else {
                    res.status(500).send(error);
                }
            });
        });
    }
    catch (error) {
        console.log(`Routes: Error occured while fetching user details: ${error.message}`);
        throw error;
    }
})


// Submit new lead
app.post('/leads/:userId', function (req, res) {
    try {

        const { name, phone_number, address } = req.body;
        const inputData = {
            user_id: req.params.userId,
            name: name,
            phone_number: phone_number,
            address: address,
            status: "New"
        }

        mysqlConnection().connect(function (err) {
            if (err) throw err;
            let query = `insert into client_referals.lead set ?`;
            mysqlConnection().query(query, inputData, (error, response) => {
                console.log(error || response);
                if (response) {
                    res.status(200).send('Lead submitted successfully!')
                } else {
                    res.status(500).send(error);
                }
            });
        });
    }
    catch (error) {
        console.log(`Routes: Error occured while fetching user details: ${error.message}`);
        throw error;
    }
})

// Retrieve rewards for all leads for a given user.
app.get('/users/:userId/rewards', function (req, res) {
    try {

        mysqlConnection().connect(function (err) {
            if (err) throw err;
            let query = `select name, rewards from client_referals.lead where user_id = ${req.params.userId}`;
            mysqlConnection().query(query, function (error, response) {
                console.log(error || response);
                if (response) {
                    res.status(200).send(JSON.stringify(response))
                } else {
                    res.status(500).send(error);
                }
            });
        });
    }
    catch (error) {
        console.log(`Routes: Error occured while fetching lead details for a user: ${error.message}`);
        throw error;
    }
})


// Retrieve all leads info with status that given user submitted.
// Retrieve all leads submitted between 2 given dates for a user.
app.get('/users/:userId/leads', function (req, res) {
    try {

        const { startDate, endDate } = req.query;
        mysqlConnection().connect(function (err) {
            if (err) throw err;
            let query;
            if (startDate != null && endDate != null) {
                query = `select name, phone_number, address, status, date_created from client_referals.lead where user_id = ${req.params.userId} and date_created between ${startDate} and ${endDate}`;
            } else {
                query = `select name, phone_number, address, status from client_referals.lead where user_id = ${req.params.userId}`;
            }
            mysqlConnection().query(query, function (error, response) {
                if (response) {
                    res.status(200).send(JSON.stringify(response));
                } else {
                    res.status(500).send(error);
                }
            });
        });
    }
    catch (error) {
        console.log(`Routes: Error occured while fetching lead details for a user: ${error.message}`);
        throw error;
    }
})

// TODO: API to update lead status, will create if needed in future.

module.exports = app.listen(port, () => console.log('Server listening on port: ' + port));
