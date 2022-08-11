const express=require("express")
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

/**
 * @swagger
 * components:
 *  schemas:
 *      SuccessResponse:
 *          type: object
 *          properties:
 *              success:
 *                  type: boolean
 *              msg:
 *                  type: string
 *                  default: ''
 *              data:
 *                  type: object
 *      ErrorResponse:
 *          type: object
 *          properties:
 *              success:
 *                  type: boolean
 *              msg:
 *                  type: string
 *              errors:
 *                  type: object
 */

 console.log(process.env.PORT);

 const specs = swaggerJsDoc({
     definition: {
         openapi : "3.0.0",
         info: {
             title: "Basic information",
             version: "1.0.0",
             description: "Basic information"
         },
         servers: [
             {
                 url: "http://localhost:" + 9000,
                 description: 'Dev Server'
             }
         ],
     },
     apis: [
         "./routes/data.js"
     ]
 });
 
 
 //parse raw json data
 app.use(express.json({extended:false}));
 
 
 // parse form data
 app.use(express.urlencoded({ extended: true }));
 
 //allow cors
 app.use(cors());
 
 //console out all the apis request
// app.use( (req, res, next) => {
//      if(req.path.includes('/api/')){
//          logger.info('Request Type: ' + req.method + ' Path:' + res.req.path);
//      }
//      next();
//  });
 
 //setup swagger UI
 if(process.env.IS_PROD !== '1') {
     app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
 }


// Init middleware
app.use(express.json({ extended:false }))  


// Define Routers
app.use("/",require("./routes/data"))

const PORT=process.env.PORT || 9000

app.listen(PORT,() => console.log(`server started on post ${PORT}`))