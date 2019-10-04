"use strict";
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
const typeorm_1 = require("typeorm");
const TypeOrm_1 = require("./TypeOrm");
const ItemWithAvailability_1 = require("./entities/ItemWithAvailability");
function func() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield typeorm_1.createConnection(TypeOrm_1.typeorm);
        const qb = connection.createEntityManager();
        const items = yield qb.findOne(ItemWithAvailability_1.ItemWithAvailability);
    });
}
func();
//# sourceMappingURL=sandbox.js.map