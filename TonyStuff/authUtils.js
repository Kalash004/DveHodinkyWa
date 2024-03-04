import {sessions,getSessionFromToken,removeSession} from "./sessionService.js";
export const isAuth = async (req, res, next) => {
    if (!req.cookies) {
        return res.status(401).end()
    }

    const sessionToken = req.cookies['session_token']
    if (sessionToken === 'undefined') {
        console.log("token undefined");
        return res.redirect("/login");
    }

    if (!sessionToken) {
        console.log("token not exist");
        return res.redirect("/login");
    }

    const userSession = getSessionFromToken(sessionToken);

    if (!userSession) {
        console.log("session not exists");
        console.log(sessions);
        console.log(sessionToken);
        console.log(userSession);
        return res.redirect("/login");
    }

    if (userSession.isExpired()) {
        console.log("expired");
        removeSession(sessionToken)
        return res.redirect("/login");
    }
    console.log("You're in");
    return next();
}
