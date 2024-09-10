import chalk from 'chalk';

const getStatusEmoji = (statusCode) => {
  if (statusCode >= 500) return '💥';
  if (statusCode >= 400) return '⚠️';
  if (statusCode >= 300) return '➡️';
  if (statusCode >= 200) return '✅';
  return '❓';
};

const getMethodColor = (method) => {
  switch (method.toUpperCase()) {
    case 'GET': return chalk.green;
    case 'POST': return chalk.yellow;
    case 'PUT': return chalk.blue;
    case 'DELETE': return chalk.red;
    default: return chalk.white;
  }
};

const loggerMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;
    const statusEmoji = getStatusEmoji(statusCode);
    const methodColor = getMethodColor(req.method);

    console.log(
      `${chalk.bold('🚀')} ${methodColor(req.method)} ${req.url} ` +
      `${statusEmoji} ${chalk.bold(statusCode)} ` +
      `${chalk.magenta(duration + 'ms')} ` +
      `${chalk.cyan('📦')} ${chalk.yellow(res.get('Content-Length') || '0')}b`
    );
  });

  next();
};

export default loggerMiddleware;