import { Injectable } from '@nestjs/common';

@Injectable()
export class GcpConfig {
  getCredentials() {
    return {
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      privateKey: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    };
  }

  getVisionApiConfig() {
    const credentials = this.getCredentials();
    
    if (!credentials.projectId || !credentials.privateKey || !credentials.clientEmail) {
      throw new Error('Google Cloud credentials not properly configured');
    }

    return {
      projectId: credentials.projectId,
      keyFilename: undefined, // We'll use credentials object instead
      credentials: {
        private_key: credentials.privateKey,
        client_email: credentials.clientEmail,
      },
    };
  }
}