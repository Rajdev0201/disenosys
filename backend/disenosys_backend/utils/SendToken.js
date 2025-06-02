const SendToken = (user,res,statusCode)=>{

    const token = user.getJwtToken()

    const options={
        expires: new Date(Date.now() +  8 * 3600000 ), //8hours
        // httpOnly: true,
        // secure: true
    }

    res.status(statusCode).cookie('token',token,options).json({
        sucess: true,
        message: "Token is Sent",
        token,
        user
    })
}

module.exports = SendToken