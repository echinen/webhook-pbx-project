'use strict'

const User = require('../models/userModel').User

class UserRepository {
    
    async findByPhone({ phone }) {
        console.log('findByPhone')
        return await User.find({ phone: phone})
    }

    async create({ user }) {
        console.log('create')
        return await User.create(user)
    }

    async getCountUser() {
        return await User.count()
    }
}

module.exports = new UserRepository()