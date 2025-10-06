"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GcpConfig = void 0;
const common_1 = require("@nestjs/common");
let GcpConfig = class GcpConfig {
    getCredentials() {
        return {
            projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
            private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
        };
    }
    getVisionApiConfig() {
        const credentials = this.getCredentials();
        if (!credentials.projectId || !credentials.private_key || !credentials.client_email) {
            throw new Error('Google Cloud credentials not properly configured');
        }
        return {
            projectId: credentials.projectId,
            credentials,
        };
    }
};
exports.GcpConfig = GcpConfig;
exports.GcpConfig = GcpConfig = __decorate([
    (0, common_1.Injectable)()
], GcpConfig);
//# sourceMappingURL=gcp.config.js.map