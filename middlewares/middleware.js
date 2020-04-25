import passport from './passport';
import cookieSession from 'cookie-session'
import { route } from 'next/dist/next-server/server/router';

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function middleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, result => {
        if (result instanceof Error) {
          return reject(result)
        }
  
        return resolve(result)
      })
    })
}


export default async function  (req, res) {
    await middleware(req, res, cookieSession({
        keys: ['aaaa'],
        secret: '123455',

        secureProxy: true,
        secure: true,
        proxy: true,
        cookie: {
          secureProxy: true,
          secure: true,
          proxy: true
        }
        //httpOnly: true
    }))

    await middleware(req, res, passport.initialize())
    await middleware(req, res, passport.session())

    return {
        req, 
        res
    }
}