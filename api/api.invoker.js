
const axios = require('axios');

const dbConnection = require('../config/dbconfig');



const invoker =  (productId)=> {

    const invokeQuery = 'SELECT COUNT(id) AS invokeCount FROM rating WHERE productId="'+productId+'"';

    const ratingUpdate = 'SELECT AVG(rating) AS averageRating FROM rating WHERE productId="'+productId+'"';

    dbConnection.query(invokeQuery, (invokeError, invokeResult) => {
        if (invokeError)
            invokeResult.status(500).send({error: invokeError});
        else if (invokeResult[0].invokeCount > 0) {
            dbConnection.query(ratingUpdate, (ratingUpdateError, ratingUpdateResult) => {
                if (ratingUpdateError)
                    ratingUpdateResult.status(500).send({error: ratingUpdateError});
                else {
                    axios.put('http://[::1]:3003/product/updateRating', {
                        id: productId,
                        rating: String(ratingUpdateResult[0].averageRating)
                    })
                        .then(response => {
                            console.log(`statusCode: ${response.status}`);
                        }).catch(error => {
                        console.log(error);
                    });
                }
            });
        }
    });
};

module.exports = invoker;
