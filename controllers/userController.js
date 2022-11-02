const bcryptjs = require("bcryptjs");
const userService = require("../services/userService");

exports.register = async (req, res, next) => {
    const {username, password} = req.body;
    console.log(username, password);
    if(!username || !password){
        return res.status(400).json({
            status: "INVALID_INPUT",
            message: "username or password is missing"
        })
    }
    try{
        const existed = await userService.findAccount({username: username});
        if(existed){
            return res.status(400).json({
                status: "EXISTED",
                message: "Username existed"
            })
        }
    } 
    catch(error)
    {
        console.log(error);
    }
    const salt = bcryptjs.genSaltSync(10);

    req.body.password = bcryptjs.hashSync(password, salt);

    userService.register(req.body, (error, result) => {
        if(error) {
            console.log(error);
            return next(error);
        }
        return res.status(200).json({
            status: "OK", 
            data: result,
        })
    })
}

exports.login = (req, res, next) => {
    const {username, password} = req.body;

    userService.login({ username, password}, (error, result) => {
        if(error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success", 
            data: result,
        })
    })
}