// @ts-ignore
import express from 'express'
import { Request, Response, Error } from '../interfaces/apiInterfaces';

interface LogOutRequest extends Request {
    logOut: Function
}

interface LogOutResponse extends Response {
    redirect: Function
}

export default function authRoutesWithoutPassword(passport: any) {
    const authRoutes = express.Router()

    authRoutes.get('/', passport.authenticate('auth0'));
    authRoutes.get('/callback', passport.authenticate('auth0', {
        successRedirect: `/`
    }));

    authRoutes.get('/signOut', (request: LogOutRequest, response: LogOutResponse, next: Function) => {
        request.logOut((error: Error) => {
            if (error) { return next(error); }
            response.redirect('/');
        });
    })

    return authRoutes
}