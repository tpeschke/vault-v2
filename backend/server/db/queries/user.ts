export default {
    find: "select * from usersAuth where auth0 = $1",
    create: "insert into usersAuth (username, auth0, tooltip) values ($1, $2, '1') RETURNING *",
    findSession: "select * from usersAuth where id = $1"
}