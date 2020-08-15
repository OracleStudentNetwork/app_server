export {};
const { ApolloServer } = require("apollo-server");
const mysql = require('mysql');
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const SQLSource = require("./sql_datasource");
const fs = require("fs");
const credentials = require("../config.json");
var db = createStore();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: ()=>({
        "db": new SQLSource(db)
    }),
    context: ({req})=>{
        if(req.headers.authorization != credentials.pass) throw new Error("Unauthorized");
    }
});

function createStore(){
    var db = mysql.createConnection({
        host: 'localhost',
        user: credentials.db_user,
        password: credentials.db_pass,
        database: credentials.db_name,
        insecureAuth: true,
        multipleStatements: true
    })
    db.connect(function(err){
        if(err) throw err;
        console.log('Connected Successfully')
    });
    fs.readdir("./stored_procedures/", (err, files)=>{
        if(err) throw err;
        files.forEach(file => {
            fs.readFile('./stored_procedures/'+file, 'utf-8', async function(err, contents){
                if(err) throw err;
                new Promise((resolve, reject)=>{
                    db.query(contents), function(err, res, fields){
                        if(err) reject(err);
                        resolve();
                    }
                })
            })
        });
    })
    return db;
}


server.listen({port: 80}).then(({ url }: any)=>{
    console.log(`Server started on ${url}`);
});