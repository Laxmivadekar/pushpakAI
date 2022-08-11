var knex  = require('../db');
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /:
 *  get:
 *      summary: Returns the list of all the data
 *      tags: [info]
 *      responses:
 *          200:
 *              description: The list of the data
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *          404:
 *            description: The data were not found
 *            
 */

// get all employees
router.get("/",(req,res)=>{
    knex.select()
    .table('Subjects')
    .then((data) => {
        console.log('all data fetched successfully');
        res.status(200).json({"data":data})
    })
    .catch(err => {
        console.log('Error while fetching data', err);
        res.status(422).send('Error while fetching data', err)
    })
})

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get the data by id
 *     tags: [info]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The data id
 *     responses:
 *       200:
 *         description: The data description by id
 *         contents:
 *           application/json:
 *       404:
 *          description: The data was not found
 *          
 */


// get book by ID from DB
router.get("/:id",(req,res)=>{
    console.log("req.params.id",req.params.id);
    knex.select()
    .where({id:req.params.id})
    .table('Subjects')
    .then((data) => {
        console.log('data fetched  by id successfully');
        res.status(200).json({"data":data})
    })
    .catch(err => {
        console.log('Error while fetching book by id', err);
        res.status(422).send({"error":err.message})
    })
})

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new data
 *     tags: [info]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              id:
 *                type: number
 *              name:
 *                type: string
 *                default: ''
 *              dob:
 *                type: string
 *                default: '19/08/2012'
 *              photo:
 *                type: string
 *                default: ''
 *              createdAt:
 *                type: string
 *                default: '2022-08-11'
 *   responses:
 *     200:
 *       description: The data was successfully created
 *       content:
 *         application/json:
 *     500:
 *       description: something went wrong in server error
 */

// create new book
router.post("/",(req,res)=>{
    const {id,name,dob,photo,createdAt}=req.body;
    console.log(req.body);
    knex('Subjects')
    .select('*')
    .insert({id:id,name:name,dob:dob,photo:photo,createdAt:createdAt})
    .then((data) => {
        console.log({"data":data})
        res.status(200).json({"data":req.body})
    })
    .catch(err=>{
        console.error(err.message)
        res.status(500).send("something went wrong while inserting the data into database")
    })
})

/**
 * @swagger
 * /{id}:
 *  put:
 *    summary: Update the Profile by its ID
 *    tags: [info]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Profile update by id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: number
 *              name:
 *                type: string
 *                default: ''
 *              dob:
 *                type: string
 *                default: '19/08/2012'
 *              photo:
 *                type: string
 *                default: ''
 *              createdAt:
 *                type: string
 *                default: '2022-08-11'
 *    responses:
 *      200:
 *        description: The data was updated
 *        content:
 *          application/json:/{id}
 *      404:
 *        description: The data was not found 
 *      default:
 *        description: Default response for this api
 */

// update book
router.put("/:id",(req,res)=>{
    const {id,name,dob,photo,createdAt}=req.body;
    knex('Subjects')
    .where({id: req.params.id})
    .update({id:id,name:name,dob:dob,photo:photo,createdAt:createdAt})
    .then((data)=>{
        console.log("data updated successfully",data);
        res.status(200).send({"data":req.body})
    })
    .catch(err=>{
        console.log('Error while updating the book');
        res.status(422).send({"error":err.message})
    })
})

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Remove the data by ID
 *     tags: [info]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The data by id
 *     responses:
 *       200:
 *         description: The data was deleted successfully
 *       404:
 *          description: The data was not found
 * 
 */

// delete book
router.delete("/:id",(req,res)=>{
    knex('Subjects')
    .where({ id: req.params.id })
    .del()
    .then((data) => {
        console.log("data deleted successfully",data);
        res.status(200).send({"data":"data deleted successfully..."})
    })
    .catch(err => {
        console.error(err.message);
        console.log('Error while deleting the Book');
        res.status(422).send({"error":err.message})
    })
})


module.exports = router;