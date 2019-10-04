"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
exports.type = process.env.DB_TYPE || 'postgres';
exports.host = process.env.DB_HOST || 'localhost';
exports.port = parseInt(process.env.DB_PORT || '5432');
exports.username = process.env.DB_USERNAME || 'postgres';
exports.password = process.env.DB_PASSWORD || 'postgres';
exports.database = process.env.DB_DATABASE || 'pizza';
const entities = path.join(__dirname, '/entities') + '/**/*.{js,ts}';
const migrations = path.join(__dirname, '/../migrations') + '/**/*.{js,ts}';
exports.typeorm = {
    name: 'default',
    type: exports.type,
    host: exports.host,
    port: exports.port,
    username: exports.username,
    password: exports.password,
    database: exports.database,
    synchronize: false,
    migrationsRun: true,
    entities: [entities],
    migrations: [migrations],
    cli: {
        entitiesDir: 'src/entities',
        migrationsDir: 'migrations'
    }
};
//# sourceMappingURL=TypeOrm.js.map