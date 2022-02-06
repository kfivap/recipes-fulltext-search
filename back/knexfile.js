module.exports ={
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: 'qwerty',
        database: 'recipes'
    },
    migrations: {
        directory: __dirname + '/migrations',
    }
}