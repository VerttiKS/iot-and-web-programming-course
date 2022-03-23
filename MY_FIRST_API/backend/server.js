import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = 5000;

const COLLECTORS = [
    {
      id: 1,
      name: "Emerald Vega",
      email: "proin.ultrices@yahoo.org",
      cars: ["JLR", "Mahindra", "Mahindra"],
      slogan: "et netus et malesuada fames ac turpis egestas. Fusce aliquet",
      trading: true
    },
    {
      id: 2,
      name: "Philip Walters",
      email: "augue.porttitor@aol.ca",
      cars: ["Acura", "Hyundai", "Motors"],
      slogan: "justo nec ante. Maecenas mi felis, adipiscing fringilla, porttitor vulputate,",
      trading: false
    },
    {
      id: 3,
      name: "Catherine Burgess",
      email: "sodales.nisi.magna@google.couk",
      cars: ["Ford", "Vauxhall", "Daihatsu"],
      slogan: "diam nunc, ullamcorper eu, euismod ac, fermentum vel, mauris. Integer",
      trading: true
    }
  ]

app.get('/api/', (req, res) => {
    res.send('BACKEND IS RUNNING')
})

app.get('/api/collectors', (req, res) => {
    res.status(200).json({data: COLLECTORS})
})

app.get('/api/collectors/:cid', (req, res) => {
    const collectorId = parseInt(req.params.cid);

    const collector = COLLECTORS.find( item => {
        return item.id === collectorId;
    })

    if(!collector)
    {
        return res.status(404).json({message: "Not found"});
    }

    res.status(200).json({collector})
})

app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`)
})