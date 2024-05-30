import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { getUser } from '../model/users.js'
import { StatusCodes } from 'http-status-codes'


const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: `${process.env.JWT_SECRET}`,
}

passport.use(new Strategy(jwtOptions, async(jwtPayload, done) => {
	let user = jwtPayload?.userID ? await getUser(jwtPayload?.userID) : null
	// console.log(user, 'from passport');
	if(!user) {
		return done({ name: 'UnauthorizedError', message: 'Unauthorized'}, false)
	}
	return done(null, user)
}))

const requireAuth = (req, res, next) => {
	passport.authenticate('jwt', {session: false}, (error, user, info) => {
		// console.log(user);
		if(error) {
			console.log('Authentication error:', error);
			return res.status(StatusCodes.UNAUTHORIZED).json({ message: `Authentication Error: ${error}`})
		}
		if(!user) {
			console.log('Unauthorized Access:', info.message);
			return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized'})
		}
		req.user = user
		next()
	})(req, res, next)
}

function authRole(requiredRoles) {
	return (req, res, next) => {
		if (req?.user?.role && requiredRoles.includes(req.user.role)) {
			next()
		} else {
			return res.status(StatusCodes.FORBIDDEN).json({ msg: 'Access forbidden'})
		}
	}
}
export { requireAuth, authRole }