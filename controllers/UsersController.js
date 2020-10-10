const usersService = require('../services/usersService');

class UsersController {
    async create(req, res){
        if(req.body.username && req.body.password){
            usersService.create(req.body).then((response) => {
                res.json(response);
            });
        }
        else{
            res.json({ message: 'Usuário e senha não podem ser vazios' });
        }
    }

    async authenticate(req, res){
        if(req.body.username && req.body.password){
            usersService.authenticate(req.body.username, req.body.password).then((response) => {
                if(response.auth){
                    res.json({ userId: response.userId, token: response.token });
                }
                else{
                    res.status(401).json({ message: 'Usuário ou senha inválidos' });
                }
            });
        }
        else{
            res.json({ message: 'Usuário e senha não podem ser vazios' });
        }
    }
}

module.exports = UsersController;