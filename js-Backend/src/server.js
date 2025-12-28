import dotenv from 'dotenv';
import connectDatabase from './config/database.js';
import app from './app.js';

dotenv.config({
    path: './.env',
});

const startServer = async() => {

    try{

        await connectDatabase();
        app.on('error',(error) =>{
            console.log('Error in server:', error);
        });

        app.listen(process.env.PORT || 8080, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });

    }
    catch(error){

        console.error('Failed to start server:', error);
        process.exit(1);

    }

};

startServer();