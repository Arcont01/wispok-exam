const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {

  constructor() { }

  async login(data) {
    const user = await models.User.findOne({ where: { email: data.email } })
    if (!user) throw new Error('Email no existe')

    const validPassword = await bcrypt.compare(data.password, user.password)
    if (!validPassword) throw new Error('Contraseña incorrecta')

    const token = jwt.sign({
      name: user.name,
      id: user.id
    }, process.env.TOKEN_SECRET)

    return token;
  }

}

module.exports = AuthService;