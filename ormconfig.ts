module.exports = {
    "name": "default",
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "synchronize": true,
    "logging": true,
    "entities": [
        "src/entity/*.*"
    ]
};
