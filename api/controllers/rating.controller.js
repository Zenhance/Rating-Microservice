
const uuid = require('uuid');
const invoker = require('../api.invoker');

const dbConnection = require('../../config/dbconfig');

exports.postRating = (req,res,next)=>{
    const id = uuid.v4();
    const productId = req.body.productId;
    const rating = req.body.rating;
    const raterId = req.body.raterId;

    const insertquery = 'INSERT INTO rating (id,productId,rating,raterId)' +
        'values("'+id+'","'+productId+'",'+rating+',"'+raterId+'")';

    const updatequery = 'UPDATE rating SET rating='
        +rating+
        'WHERE productId="'+productId+'"AND raterId="'+raterId+'"';

    const query = 'SELECT COUNT(id) AS RATING_COUNT FROM rating WHERE productId="'+productId+'"AND raterId="'+raterId+'"';


    dbConnection.query(query,(error,rows)=>{
        if(error)
        {
            rows.status(500).send({
                error:error
            });
        }
        else
        {
            if(rows[0].RATING_COUNT===1)
            {
                dbConnection.query(updatequery,(err,result)=>{
                    if(err)
                    {
                        res.status(500).send({
                            error:err
                        });
                    }
                    else
                    {
                        invoker(productId);
                        res.status(200).send({
                            updated_rating: rating,
                            affectedRows:result.affectedRows
                        });
                    }
                });
            }
            else
            {
                dbConnection.query(insertquery,(err,result)=>{
                    if(err)
                    {
                        res.status(500).send({
                            error:err
                        });
                    }
                    else
                    {
                        invoker(productId);
                        res.status(200).send({
                            id:id,
                            rating: rating,
                            affectedRows:res.affectedRows
                        });
                    }
                });
            }

        }
    });
};


