import bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
import mongoose, { Schema } from 'mongoose'


const userSchema = new Schema({
  nickName: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user"
  },
})

userSchema.pre("save", async function() {
  this.passwordHash = await bcrypt.hash(this.passwordHash, 10)
})

const User = mongoose.model('User', userSchema)



const getUsers = async(req, res, next) => {
  const users = await User.find().select('-passwordHash').lean()
  req.users = users
  next()
}


async function authUser(userID) {
  const user = await User.findById(userID).select('-passwordHash').lean()
  return user
}

async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash').lean()   
    req.foundUser = user
    next()
  } catch (error) {
    console.log(error);
  }

}

const deleteUser = async(req, res, next) => {
  const deleteUserResult = await User.findByIdAndDelete(req.params.id)
  next()
}

const updateUser = async(req, res, next) => {
  switch (req.user.role) {
    case 'admin':
      const updateUserResult = await User.findByIdAndUpdate(req.params.id, req.body)
      next()      
      break;
    case 'user':
      if(req.user.id === userID) {
        delete req.body.role
        const updateUserResult = await User.findByIdAndUpdate(req.params.id, req.body)
      }
      next()
      break;
  }
}

const createUser = async(req, res, next) => {
  try {
    let {login} = req.body 

    const isLoginAvailable = await User.findOne({login}).lean()
    console.log(isLoginAvailable)
    if(isLoginAvailable) {
      res.status(StatusCodes.CONFLICT).json('Эта почта уже используется')
      return
    }  
    const createUserResult = await User.create(req.body)
    next()   
  } catch (err) {
    console.log(err);
  }
}

const changeUserPassord = async(req, res, next) => {
  try {
    if(req.user._id != req.params.id) {
      return
    }
    let {oldPassword, newPassword} = req.body
    let user = await User.findById(req.params.id).lean()
  
    let isPasswordMatch = await bcrypt.compare(`${oldPassword}`, user.passwordHash)
    if(!isPasswordMatch) {
      res.status(StatusCodes.NOT_ACCEPTABLE).json('Wrong password')
      return
    } else {
      let passwordHash = await bcrypt.hash(newPassword, 10)
      let passportUpdateResult = await User.findByIdAndUpdate(req.params.id, {passwordHash})
      next()
    }    
  } catch (err) {
    console.log(err);
    next()
  }
}
export {User, authUser, getUsers, getUser, createUser, deleteUser, updateUser, changeUserPassord}