import winston from 'winston';
import path from 'path';

const { combine, timestamp, printf, colorize, align } = winston.format;

export const logger = winston.createLogger({
  defaultMeta: { service: 'notification-service' },
  format: combine(
    colorize({ all: true }),
    timestamp(),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/error.log'),
    }),
  ],
});

export const logInit = ({
  env = 'development',
  logLevel,
}: {
  env: string | undefined;
  logLevel: string | undefined;
}) => {
  logger.add(
    new winston.transports.Console({
      level: logLevel,
      silent: env === 'testing',
    })
  );

  if (env !== 'development') {
    logger.add(
      new winston.transports.File({
        level: logLevel,
        filename: path.join(__dirname, '../../logs/auth-service.log'),
      })
    );
  }
};

export const logDestroy = () => {
  logger.clear();
  logger.close();
};
