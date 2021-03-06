export const postUserRegisterSchema = {
    $id: "/user",
    type: "object",
    properties: {
        email: {
            description: "Unique email",
            type: "string",
            unique: true,
            lowercase: true,
            minLength: 1
        },
        name:{
            description: "userName",
            type: "string",
            minLength: 1
        },
        password: {
            description: "User secret",
            type: "string",
            minLength: 1
        },
    },
    required: [ "email", "name", "password" ],
    additionalProperties: false
}

