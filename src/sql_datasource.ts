import { exception } from "console";

export {};
const { DataSource } = require("apollo-datasource");
const mysql = require('mysql');

class SQLSource extends DataSource {
    constructor(db){
        super();
        this.store = db;
        this.connected = [];
        console.log('done');
    }
    initialize (config){
        this.context = config.context;
    }
    async getUserById(id){
        try{
            var queryReturn = await this.query("select * from users where id = " + id);
            return queryReturn[0];
        }catch(err){
            //if promise rejects;
        }
        
    }

    async addUser(displayName){
        var queryReturn = await this.query(`call insert_user("?")`, [ displayName ]);
        console.log(queryReturn);
        return queryReturn[0][0];
    }
    
    query(selector, params=[]){
        return new Promise((resolve, reject)=>{
            this.store.query(selector, params, function(err, res, fields){
                if(err) reject(err);
                resolve(res);
            });
        });
    }

    addConnectedWs(ws: WebSocket){
        this.connected.push(ws);
    }
}

module.exports = SQLSource;