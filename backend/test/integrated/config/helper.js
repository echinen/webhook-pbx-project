const assert = require('assert')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const expect = require('chai').expect
const faker = require('faker')
const HTTPStatus = require('http-status')
const should = require('chai').should
const request = require('supertest')
const server = require('../../../server').koa
const sinon = require('sinon')

const app = server.listen(4000)
chai.use(chaiAsPromised)
chai.should()

module.exports = { app, expect, faker, HTTPStatus, request }