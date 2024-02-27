const bcrypt = require('bcrypt');
const { models } = require('../libs/sequelize');
const readXlsxFile = require("read-excel-file/node");

class UsersService {

  constructor() { }

  async find({ page, pageSize }) {

    pageSize = pageSize ? parseInt(pageSize) : 10
    page = page ? parseInt(page) : 0

    const offset = page * pageSize;
    const limit = parseInt(pageSize);

    console.info(offset, limit);

    const res = await models.User.findAll({
      limit,
      offset,
    });

    return res;
  }

  async findOne(id) {
    const res = await models.User.findByPk(id);
    return res;
  }

  async create(data) {
    const isEmailExist = await models.User.findOne({ where: { email: data.email } });
    if (isEmailExist) throw new Error('Usuario ya existente')

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(data.password, salt);
    data.password = password

    const res = await models.User.create(data);
    return res;
  }

  async update(id, data) {
    const model = await this.findOne(id);

    const isEmailExist = await models.User.findOne({ where: { email: data.email } });
    if (isEmailExist) throw new Error('Ese email ya esta en uso')

    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(data.password, salt);
      data.password = password
    }

    const res = await model.update(data);
    return res;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { deleted: true };
  }

  async upload(file) {
    try {
      let path = __basedir + "/storage/app/uploads/" + file.filename;
      let usersExist = [];

      readXlsxFile(path).then((rows) => {
        rows.shift();

        rows.forEach(async (row) => {
          const isEmailExist = await models.User.findOne({ where: { email: row[1] } });
          if (isEmailExist) {
            usersExist.push({
              email: row[1],
              error: 'Ya existe este usuario'
            });
          } else {
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(row[2], salt);

            models.User.create({
              name: row[0],
              email: row[1],
              password: password,
            });
          }
        });

      });

      return {
        uploaded: true,
        errors: usersExist
      }
    } catch (error) {

    }
  }

}

module.exports = UsersService;