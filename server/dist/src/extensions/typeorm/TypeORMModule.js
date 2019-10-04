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
const TypeORMService_1 = require("./services/TypeORMService");
let TypeORMModule = class TypeORMModule {
    constructor(typeORMService, injectorService) {
        this.typeORMService = typeORMService;
        this.injectorService = injectorService;
    }
    $onInit() {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = Object.keys(this.settings).map(key => this.typeORMService.createConnection(key, this.settings[key]));
            const result = yield Promise.all(promises);
            if (result.length > 0) {
                yield this.injectorService.emit('$afterDBInit');
            }
            return result;
        });
    }
    $onDestroy() {
        return this.typeORMService.closeConnections();
    }
};
__decorate([
    common_1.Constant('typeorm', {}),
    __metadata("design:type", Object)
], TypeORMModule.prototype, "settings", void 0);
TypeORMModule = __decorate([
    common_1.Service(),
    __metadata("design:paramtypes", [TypeORMService_1.TypeORMService, common_1.InjectorService])
], TypeORMModule);
exports.TypeORMModule = TypeORMModule;
//# sourceMappingURL=TypeORMModule.js.map