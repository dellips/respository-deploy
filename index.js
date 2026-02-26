import express from 'express';
import noteRouter from './routes/notes.js';
import mongoose from 'mongoose';
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use(cors({
  origin: "*"
}));

// middleware
app.use((req, res, next) => {
    console.log(`Request lewat sini ${req.path}`);
    if(false){
        next(new Error('Not Authorized'));
        return;
    }
    next();
});

app.use('/notes', noteRouter);

app.get('/', (req, res) => {
    res.send('Hello Delli! ^^');
});

// using path parameters
app.get('/say/:greeting', (req, res) => {
    const { greeting } = req.params;
    res.send(greeting);
});

app.get('/home', (req, res) => {
    res.send('Welcome to cisato!');
});

app.get('/tryError', (req, res) => {
    return res.status(401).send('Error Unauthorized 401');
});

// error handling middleware
app.use((err, req, res, next) => {
    res.send('Error Occurred');
});

app.use((req, res, next) => {
    res.status(404).send(`Page not found ${req.path}`);
    // res.send({
    //     result: 'fail',
    //     error: `Page not found ${req.path}`
    // });
});

app.use((err, req, res, next) => {
    res.status(500).send(err.message);
    // res.json({
    //     result: 'fail',
    //     error: err.message,
    // });
});

mongoose.connect('mongodb+srv://dellianasalsabilap3_db_user:95PkR3NKDV2IqnPz@cluster0.2ale6mf.mongodb.net/?appName=Cluster0')
    .then(() => console.log('Koneksi database berhasil tersambung.'))
    .catch((err) => console.error('Koneksi gagal:', err));

app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});