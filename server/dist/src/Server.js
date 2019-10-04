"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
require("@tsed/swagger");
const common_1 = require("@tsed/common");
const cookieParser = require("cookie-parser");
const compress = require("compression");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const history = require("connect-history-api-fallback");
const TypeOrm_1 = require("./TypeOrm");
const Express = require("express");
const cors = require("cors");
const uuid_1 = require("uuid");
const rootDir = __dirname;
const publicDir = path.join(rootDir, process.env.NODE_ENV === 'production' ? '/../../../public/' : '/../public/');
const jwtSecret = uuid_1.v4();
let Server = class Server extends common_1.ServerLoader {
    constructor() {
        super();
    }
    $onMountingMiddlewares() {
        this.use(common_1.GlobalAcceptMimesMiddleware)
            .use(history())
            .use(cookieParser())
            .use(compress())
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
            extended: true
        }))
            .use(cors())
            .use(Express.static(publicDir, { fallthrough: true }));
        return null;
    }
    $onReady() {
        console.log('Server started...');
    }
    $onServerInitError(error) {
        console.error(error);
    }
};
Server = __decorate([
    common_1.ServerSettings({
        rootDir,
        publicDir,
        httpPort: 8081,
        httpsPort: false,
        acceptMimes: ['application/json', 'multipart/form-data'],
        componentsScan: [
            '${rootDir}/middlewares/**/*.{js,ts}',
            '${rootDir}/services/**/*.{js,ts}',
            '${rootDir}/extensions/**/*.{js,ts}',
        ],
        mount: {
            '/api': [
                '${rootDir}/controllers/**/*.{js,ts}'
            ]
        },
        statics: {
            '/': `${rootDir}/uploads/**/*`
        },
        typeorm: [TypeOrm_1.typeorm],
        swagger: [
            {
                path: "/docs"
            }
        ]
    }),
    __metadata("design:paramtypes", [])
], Server);
exports.Server = Server;
//# sourceMappingURL=Server.js.map