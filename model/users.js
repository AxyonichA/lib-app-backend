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

const User = mongoose.model('User', userSchema)


const getUsers = async(req, res, next) => {
  const users = await User.find().select('-passwordHash').lean()
  req.users = users
  next()
}

async function getUser(userID) {
  try {
    const user = await User.findById(userID).lean()
    return user    
  } catch (error) {
    console.log(error);
  }

}

function deleteUser(req, res, next) {
  users = users.filter((user) => user.id !== Number(req.params.id))
  next()
}
async function updateUser(req, res, next) {
  console.log(req.params.id);
  let { nickName, login, role } = req.body
  console.log(req.body)
  switch (req.user.role) {
    case 'admin':
      const userUpdateResult = await User.findByIdAndUpdate(req.params.id, {nickName, login, role})
      next()      
      break;
    case 'user':
      if(req.user.id === userID) {
        const userUpdateResult = await User.findByIdAndUpdate(req.params.id, {nickName, login})
      }
      next()
      break;
  }
}

async function createUser(req, res, next) {
  try {
    let {login, password, nickName} = req.body 
    const isLoginExists = await User.find({login})
    if (isLoginExists == []) {
      res.status(StatusCodes.CONFLICT).json('Эта почта уже используется')
      return
    }  

    let passwordHash = await bcrypt.hash(password, 10)

    let newUser = {
      nickName,
      login,
      role: 'user',
      passwordHash
    }
    const user = new User(newUser)
    const createUserResult = await user.save()
    next()   
  } catch (err) {
    console.log(err);
  }
}

async function changeUserPassord(req, res, next) {
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
export {User, getUsers, getUser, createUser, deleteUser, updateUser, changeUserPassord}