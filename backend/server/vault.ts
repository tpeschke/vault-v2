// @ts-ignore
import express from 'express'
// @ts-ignore
import session from 'express-session'
// @ts-ignore
import passport from 'passport'
// @ts-ignore
import Auth0Strategy from 'passport-auth0'
// @ts-ignore
import bodyParser from 'body-parser'
// @ts-ignore
import cors from 'cors'
// @ts-ignore
import path from 'path'

import { callbackURL, clientID, clientSecret, domain, fakeAuth, secret, server } from './server-config'

import { Profile } from './interfaces/apiInterfaces'
import authRoutesWithoutPassword from './routes/authentication'
import query from './db/database'
import userSQL from './db/queries/user'
import userRoutes from './controllers/user/userRoutes'
import homeRoutes from './v1/controllers/home/HomeRoutes'
import characterRoutes from './v1/controllers/view/viewCharacterRoutes'
import editCharacterRoutes from './v1/controllers/edit/editCharacterRouter'

const app = express()
app.use(bodyParser.json({ limit: '10mb' }))
app.use(cors())

app.use(session({
    secret,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain,
    clientID,
    clientSecret,
    callbackURL,
    scope: 'openid profile'
}, async (accessToken: string, refreshToken: string, extraParams: Object, profile: Profile, finishingCallback: Function) => {
    accessToken; refreshToken; extraParams;
    const { displayName, user_id: userID } = profile;
    const [user] = await query(userSQL.find, userID)
    if (!user) {
        await query(userSQL.create, [displayName, userID])
    }
    return finishingCallback(null, user.id)
}))

passport.serializeUser((id: any, done: any) => {
    done(null, id)
})
passport.deserializeUser(async (id: any, done: any) => {
    const [user] = await query(userSQL.findSession, id)
    done(null, user);
})

// ================================== \\
app.use(fakeAuth)

app.use('/auth', authRoutesWithoutPassword(passport))
app.use('/user', userRoutes)
app.use('/home', homeRoutes)
app.use('/view', characterRoutes)
app.use('/edit', editCharacterRoutes)

app.use(express.static(__dirname + `/../../app/dist`));
// app.get('/*', (request: Request, response: Response) => {
//     response.sendFile(path.join(__dirname + '/../../app/dist/index.html'))
// })

// ================================== \\

app.listen(server, () => {
    console.log(`Weep a thousand tears and you won't drown the desert ${server}`)
})