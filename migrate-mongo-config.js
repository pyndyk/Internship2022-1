/* eslint-disable linebreak-style */
const config = {
    mongodb: {
        url: 'mongodb+srv://Iryna:2022scorpions@users.kvr04tr.mongodb.net/?retryWrites=true&w=majority',
        databaseName: 'test',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
            //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
        },
    },
    migrationsDir: 'migrations',
    changelogCollectionName: 'changelog',
    migrationFileExtension: '.js',
    useFileHash: false,
    moduleSystem: 'commonjs',
};

module.exports = config;