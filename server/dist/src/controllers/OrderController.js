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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const OrderService_1 = require("../services/OrderService");
const swagger_1 = require("@tsed/swagger");
const ItemService_1 = require("../services/ItemService");
const ts_httpexceptions_1 = require("ts-httpexceptions");
let OrderController = class OrderController {
    constructor(orderService, itemService) {
        this.orderService = orderService;
        this.itemService = itemService;
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orderService.getOrders();
        });
    }
    create({ customerName, itemId }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (customerName.trim().length === 0) {
                throw new ts_httpexceptions_1.BadRequest('CustomerName must not be blank');
            }
            const canOrder = yield this.itemService.canOrderItem(itemId);
            if (!canOrder) {
                throw new ts_httpexceptions_1.Gone('The item you requested is not available');
            }
            return this.orderService.createOrder(customerName, itemId);
        });
    }
    update(id, order) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id !== order.id) {
                throw new ts_httpexceptions_1.BadRequest('Cannot change the id of a resource');
            }
            return this.orderService.updateOrder(order);
        });
    }
    delete(id, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { affected } = yield this.orderService.deleteOrder(id);
            if (typeof affected === 'undefined' || affected < 1) {
                throw new ts_httpexceptions_1.InternalServerError('Couldn\'t delete the record');
            }
            response
                .status(204)
                .send();
        });
    }
};
__decorate([
    common_1.Get('/'),
    swagger_1.Summary('Get orders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "index", null);
__decorate([
    common_1.Post('/'),
    __param(0, common_1.BodyParams()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "create", null);
__decorate([
    common_1.Put('/:id'),
    __param(0, common_1.PathParams('id')), __param(1, common_1.BodyParams()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "update", null);
__decorate([
    common_1.Delete('/:id'),
    __param(0, common_1.PathParams('id')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "delete", null);
OrderController = __decorate([
    common_1.Controller('/orders'),
    __metadata("design:paramtypes", [OrderService_1.OrderService,
        ItemService_1.ItemService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=OrderController.js.map