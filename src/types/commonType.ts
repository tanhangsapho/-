import { Types } from 'mongoose';

type ObjectId = Types.ObjectId;

interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy';
  connection: {
    database: 'connected' | 'disconnected';
  };
}

export { ObjectId, HealthCheckResponse };
