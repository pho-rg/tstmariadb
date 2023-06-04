const express = require('express');
const router = express.Router();
const pool = require('../helpers/dbConfig');

router.get('/:id', async function(req, res) {
    try {
        const sqlQuery = 'SELECT id, email, password, created_at FROM user WHERE id=?'
        const rows = await pool.query(sqlQuery, req.params.id)
        res.status(200).json(rows);
        return;
    } catch (error) {
        res.status(400).send(error.message)
    }

    res.status(200).json({id:req.params.id})
})

router.post('/register', async function(req, res) {
    try {
        const {email, password} = req.body; //tester sur POSTMAN

        const sqlQuery = 'INSERT INTO user (email, password) VALUES (?,?)';
        const result = await pool.query(sqlQuery, [email, password]);

        //V1 insertion ok mais err postman do not know serialize a bigInt
        //res.status(200).json({userId: result.insertId}); //formater le retour que l'on veut cf postman
        
        //V2 manage err
        const userId = result.insertId;
        const userIdString = userId.toString(); // Conversion du BigInt en chaîne de caractères

        const responseData = JSON.stringify({ userId: userIdString });
        res.status(200).json(JSON.parse(responseData));
        //fin V2

        return;
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete('/supp/:id', async function(req, res) {
    try {
        const userId = req.params.id;

        const sqlQuery = 'DELETE FROM user WHERE id = ?';
        const result = await pool.query(sqlQuery, [userId]);

        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router;