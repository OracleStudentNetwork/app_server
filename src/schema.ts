export {};
const { gql } = require("apollo-server");

const typeDefs = gql`
    interface UserInterface{
        id: Int!
        displayName: String!
    }

    type User{
        id: Int!
        displayName: String!
    }

    type Tutor implements UserInterface{
        id: Int!
        displayName: String!
        tutoredSubjects: [String!]!
        isAvailable: Boolean!
    }

    type Student implements UserInterface{
        id: Int!
        displayName: String!
    }

    type Message{
        id: Int!
        author: UserInterface!
        content: String!
        timestamp: String!
    }

    type Channel{
        id: ID!
        users: [UserInterface!]!
        messages: [Message!]!
    }

    type RequestTutorReturn{
        requestId: ID!
        assignedTutor: Tutor!
    }

    type Query{
        requestTutor(reqBy: ID!, subject: String!, timestamp: String!): RequestTutorReturn
        getUserById(id: Int!): UserInterface
        getMessageById(id: Int!): Message
        hello: String
    }

    type Mutation{
        deleteMessageById(id: ID!): Int!
        addUser(displayName: String!): UserInterface
    }
`;

module.exports = typeDefs;