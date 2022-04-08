import express from 'express';
import cors from 'cors';
import pg from 'pg';
import bodyParser from 'body-parser';

const pool = new pg.Pool({
    database: 'collectors',
    user: 'user',
    password: 'pass',
    host: 'localhost'
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/api/health', (req, res) => {
    res.status(200).send('BACKEND IS UP');
})

app.get('/api/collectors', async (req, res) => {
    try{
        const client = await pool.connect();
        const result = await client.query(
            'SELECT * FROM collectors'
        );
        client.release();
        res.status(200).json({data: result.rows});

    } catch (error)
    {
        console.error(error);
        res.status(500).json({message: 'Internal error'});
    }

})

app.post('/api/collectors', async (req, res) => {
    console.log(req.body);

    const {
        name,
        email,
        cars,
        slogan,
        trading
     } = req.body;


     try{
        const client = await pool.connect();
        const result = await client.query(
            `INSERT INTO collectors (name, email, cars, slogan, trading)
                VALUES ($1, $2, $3, $4, $5)`,
                [name, email, cars, slogan, trading]
        );

        client.release();
        
        if(result.rowCount !== 1)
        {
            throw Error('Colletor not added');
        }

        res.status(201).json({message: "Collector added"});

    } catch (error)
    {
        console.error(error);
        res.status(500).json({message: 'Internal error'});
    }
})

app.get('/api/collectors/:cid', async (req, res) => {
    try{
        const collectorId = parseInt(req.params.cid);

        const client = await pool.connect();
        const result = await client.query(
            "SELECT * FROM collectors WHERE id = '" + collectorId + "'"
        );
        client.release();
        res.status(200).json({data: result.rows});

    } catch (error)
    {
        console.error(error);
        res.status(500).json({message: 'Internal error'});
    }

})

app.listen(5000, () => {
    console.log("BACKEND API STARTED")
})