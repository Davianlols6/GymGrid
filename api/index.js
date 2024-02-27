const app = require('./src/app');

const PORT = 3100;

app.listen(PORT, () => {
    console.log(`App is listening to port ${PORT}`);
});
