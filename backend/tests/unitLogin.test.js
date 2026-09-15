jest.mock('../src/repositories/user.repo')
jest.mock('bcryptjs')
jest.mock('jsonwebtoken')
const userRepo=require('../src/repositories/user.repo')
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const {login}=require("../src/services/user.service")

describe('auth')