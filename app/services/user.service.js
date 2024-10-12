const { ObjectId } = require('mongodb');
class UserService{
    constructor(client){
        this.User = client.db().collection("users");
    }
    extractUserData(payload){
        const user={
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
        };
        Object.keys(user).forEach(
            (key)=> user[key] === undefined && delete user[key]
        );
        return user;
    }
    async create(payload){
        const user = this.extractUserData(payload);
        const result = await this.User.findOneAndUpdate(
            user,
            { $set:{ 
                address: "",
                phone:"",
            } },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }

    async find(filter){
        const cursor = await this.User.find(filter);
        return await cursor.toArray();
    }
}
module.exports = UserService;