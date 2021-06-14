'use strict'

const UserRepository = require('../repositories/user-repository')

class UserService {

    async userExists({ phone }) {
        console.log('userExists')
        const user = await UserRepository.findByPhone({ phone })
        return user.length > 0
    }

    async createNewUser({ user }) {
        console.log('createNewContact')
        return await UserRepository.create({ user })
    }

    async countActiveUser() {
        const totalUser = await UserRepository.getCountUser()
        return totalUser
    }
}

module.exports = new UserService()