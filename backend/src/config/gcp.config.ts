import { Injectable } from '@nestjs/common';

@Injectable()
export class GcpConfig {
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
}
