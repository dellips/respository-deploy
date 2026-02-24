import express from 'express';

const app = express();

// middleware
app.use((req, res, next) => {
    console.log(`Request lewat sini ${req.path}`);
    if(false){
        next(new Error('Not Authorized'));
        return;
    }
    next();
});

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
})

// error handling middleware
app.use((err, req, res, next) => {
    res.send('Error Occurred');
})

app.listen(3000);