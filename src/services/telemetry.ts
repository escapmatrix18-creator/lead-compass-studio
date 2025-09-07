// Telemetry service for tracking user interactions and errors
import { config } from '@/config';

export interface TelemetryEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: Date;
  userId?: string;
  sessionId?: string;
}

export interface TelemetryError {
  error: Error | string;
  context?: Record<string, any>;
  userId?: string;
  timestamp?: Date;
}

class TelemetryService {
  private sessionId: string;
  private userId?: string;
  private events: TelemetryEvent[] = [];
  private errors: TelemetryError[] = [];

  constructor() {
    this.sessionId = this.generateSessionId();
    
    // Initialize session tracking
    if (config.features.ENABLE_TELEMETRY) {
      this.trackPageView(window.location.pathname);
    }
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  trackEvent(name: string, properties?: Record<string, any>) {
    if (!config.features.ENABLE_TELEMETRY) return;

    const event: TelemetryEvent = {
      name,
      properties,
      timestamp: new Date(),
      userId: this.userId,
      sessionId: this.sessionId,
    };

    this.events.push(event);

    // Console logging for development
    if (import.meta.env.DEV) {
      console.group(`📊 Telemetry Event: ${name}`);
      console.log('Properties:', properties);
      console.log('User ID:', this.userId);
      console.log('Session ID:', this.sessionId);
      console.groupEnd();
    }

    // TODO: Send to analytics service
    this.sendToAnalytics(event);
  }

  trackError(error: Error | string, context?: Record<string, any>) {
    if (!config.features.ENABLE_TELEMETRY) return;

    const errorEvent: TelemetryError = {
      error,
      context,
      userId: this.userId,
      timestamp: new Date(),
    };

    this.errors.push(errorEvent);

    // Console logging for development
    if (import.meta.env.DEV) {
      console.group('🚨 Telemetry Error');
      console.error('Error:', error);
      console.log('Context:', context);
      console.log('User ID:', this.userId);
      console.groupEnd();
    }

    // TODO: Send to error tracking service
    this.sendToErrorTracking(errorEvent);
  }

  trackPageView(path: string) {
    this.trackEvent('page_view', {
      path,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
    });
  }

  // Specific campaign-related tracking methods
  trackCampaignCreated(campaignId: string, campaignData: Record<string, any>) {
    this.trackEvent('campaign_created', {
      campaignId,
      ...campaignData,
    });
  }

  trackCampaignSent(campaignId: string, leadCount: number) {
    this.trackEvent('campaign_sent', {
      campaignId,
      leadCount,
    });
  }

  trackLeadsImported(count: number, source: string) {
    this.trackEvent('leads_imported', {
      count,
      source,
    });
  }

  trackEmailVerification(leadIds: string[], provider: string) {
    this.trackEvent('email_verification', {
      leadCount: leadIds.length,
      provider,
    });
  }

  trackTestSent(campaignId: string, testEmail: string) {
    this.trackEvent('test_sent', {
      campaignId,
      testEmail: testEmail.replace(/(.{2})(.*)(@.*)/, '$1***$3'), // Mask email for privacy
    });
  }

  // Analytics and debugging methods
  getEventSummary() {
    const eventCounts = this.events.reduce((acc, event) => {
      acc[event.name] = (acc[event.name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      sessionId: this.sessionId,
      userId: this.userId,
      totalEvents: this.events.length,
      totalErrors: this.errors.length,
      eventCounts,
    };
  }

  getRecentEvents(limit: number = 10) {
    return this.events.slice(-limit);
  }

  getRecentErrors(limit: number = 10) {
    return this.errors.slice(-limit);
  }

  private async sendToAnalytics(event: TelemetryEvent) {
    // Stub implementation - replace with actual analytics service
    try {
      // Example: await fetch('/api/analytics', { method: 'POST', body: JSON.stringify(event) });
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn('Failed to send analytics event:', error);
      }
    }
  }

  private async sendToErrorTracking(error: TelemetryError) {
    // Stub implementation - replace with actual error tracking service
    try {
      // Example: await fetch('/api/errors', { method: 'POST', body: JSON.stringify(error) });
    } catch (err) {
      if (import.meta.env.DEV) {
        console.warn('Failed to send error to tracking service:', err);
      }
    }
  }
}

// Export singleton instance
export const telemetry = new TelemetryService();

// Convenience export for easy importing
export default telemetry;