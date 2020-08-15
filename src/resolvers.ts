import { rootCertificates } from "tls";

export {};


module.exports = {
    UserInterface: {
        __resolveType(user, context, info){
            if(user.isAvailable){
                return 'Tutor'
            }
            else return 'Student'
        }
    },
    
    Query:{
        hello: ()=>{
            return "Hello World!";
        },
        getUserById: (_, { id }, { dataSources })=> dataSources.db.getUserById(id),
        getMessageById: (_, { id })=>{
            var messages = {
                1:{
                    "id": 1,
                    "author": {
                        "id": 1,
                        "displayName": "johney"
                    },
                    "content":"hello world",
                    "timestamp": "8/11/2020"
                },
                2:{
                    "id": 1,
                    "author": {
                        "id": 2,
                        "displayName": "bort"
                    },
                    "content":"hello world",
                    "timestamp": "8/11/2020"
                }
            }
            return messages[id];
        }
    },
    Mutation:{
        addUser: (_, {displayName }, { dataSources })=> dataSources.db.addUser(displayName)
    }
}