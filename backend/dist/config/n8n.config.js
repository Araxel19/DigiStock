"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.N8nConfig = void 0;
const common_1 = require("@nestjs/common");
let N8nConfig = class N8nConfig {
    getConfig() {
        return {
            host: process.env.N8N_HOST || 'localhost',
            port: parseInt(process.env.N8N_PORT) || 5678,
            webhookUrl: process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook',
        };
    }
    getWebhookUrl(workflowId) {
        const config = this.getConfig();
        return `${config.webhookUrl}/${workflowId}`;
    }
};
exports.N8nConfig = N8nConfig;
exports.N8nConfig = N8nConfig = __decorate([
    (0, common_1.Injectable)()
], N8nConfig);
//# sourceMappingURL=n8n.config.js.map