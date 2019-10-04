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
const di_1 = require("@tsed/di");
const RepositoryService_1 = require("./RepositoryService");
const Order_1 = require("../entities/Order");
let OrderService = class OrderService {
    constructor(repoService) {
        this.repoService = repoService;
    }
    get orderRepo() {
        return this.repoService.getRepository(Order_1.Order);
    }
    getOrders() {
        return this.orderRepo.find();
    }
    createOrder(customerName, pizzaId) {
        return this.orderRepo.insert({
            customerName,
            item: { id: pizzaId }
        });
    }
    updateOrder(order) {
        return this.orderRepo.update(order.id, order);
    }
    deleteOrder(orderId) {
        return this.orderRepo.delete(orderId);
    }
};
OrderService = __decorate([
    di_1.Service(),
    __metadata("design:paramtypes", [RepositoryService_1.RepositoryService])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=OrderService.js.map