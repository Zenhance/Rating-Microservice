const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const rateRoutes = require('./api/routes/rating.route');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        "Access-Control-Allow-Header",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    if(req.method==='OPTIONS')
    {
        res.header('Access-Control-Allow-Method','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
})


//Add all the application routers here.
app.use('/rate',rateRoutes);




app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status=404;
    next(error);
});
app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    });
});

module.exports = app;
