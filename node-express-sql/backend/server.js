import express from 'express';
import cors from 'cors';
import pg from 'pg';

const pool = new pg.Pool({
    database: 'collectors',
    user: 'user',
    password: 'pass',
    host: 'localhost'
});

const app = express();
app.use(cors());

app.get('/api/health', () => {
    res.status(200).send('BACKEND IS UP');
})

app.get('/api/collectors', async (req, res) => {
    try{
        const client = await pool.connect();
        const result = await client.query(
            'SELECT * FROM collectors'
        );
        client.release();
        res.status(200).json({data: result.rows})

    } catch (error)
    {
        console.error(error);
        res.status(500).json({message: 'Internal error'});
    }

})

app.listen(5000, () => {
    console.log("BACKEND API STARTED")
})