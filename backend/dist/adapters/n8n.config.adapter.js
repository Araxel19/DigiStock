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
exports.N8nConfigAdapter = void 0;
const common_1 = require("@nestjs/common");
const n8n_config_1 = require("../config/n8n.config");
let N8nConfigAdapter = class N8nConfigAdapter {
    constructor(n8nConfig) {
        this.n8nConfig = n8nConfig;
    }
    getWebhookUrl(workflowId) {
        return this.n8nConfig.getWebhookUrl(workflowId);
    }
    getBaseUrl() {
        return process.env.N8N_WEBHOOK_URL || 'http://n8n:5678/webhook-test';
    }
};
exports.N8nConfigAdapter = N8nConfigAdapter;
exports.N8nConfigAdapter = N8nConfigAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [n8n_config_1.N8nConfig])
], N8nConfigAdapter);
//# sourceMappingURL=n8n.config.adapter.js.map