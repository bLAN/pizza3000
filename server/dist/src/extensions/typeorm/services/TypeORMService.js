"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@tsed/common");
const ts_log_debug_1 = require("ts-log-debug");
const typeorm_1 = require("typeorm");
let TypeORMService = class TypeORMService {
    constructor() {
        /**
         *
         * @type {Map<any, any>}
         * @private
         */
        this.instances = new Map();
    }
    /**
     *
     * @returns {Promise<"mongoose".Connection>}
     */
    createConnection(id, settings) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = settings.name || id;
            if (key && this.has(key)) {
                return this.get(key);
            }
            ts_log_debug_1.$log.info(`Create connection with typeorm to database: ${key}`);
            ts_log_debug_1.$log.debug(`options: ${JSON.stringify(settings)}`);
            try {
                const connection = yield typeorm_1.createConnection(settings);
                ts_log_debug_1.$log.info(`Connected with typeorm to database: ${key}`);
                this.instances.set(key || 'default', connection);
                return connection;
            }
            catch (err) {
                /* istanbul ignore next */
                ts_log_debug_1.$log.error(err);
                /* istanbul ignore next */
                process.exit();
            }
        });
    }
    /**
     *
     * @returns {"mongoose".Connection}
     */
    get(id = 'default') {
        return this.instances.get(id);
    }
    /**
     *
     * @param {string} id
     * @returns {boolean}
     */
    has(id = 'default') {
        return this.instances.has(id);
    }
    closeConnections() {
        const promises = Array.from(this.instances.values()).map(instance => instance.close());
        return Promise.all(promises);
    }
};
TypeORMService = __decorate([
    common_1.Service()
], TypeORMService);
exports.TypeORMService = TypeORMService;
//# sourceMappingURL=TypeORMService.js.map