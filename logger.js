const util = require("util");
const {createLogger, transports, format} = require("winston");
const {combine, colorize, timestamp, printf, errors, splat} = format;

const myFormat = printf(({level, message, timestamp, stack, ...meta}) => {
  meta = Object.values(meta);
  meta = meta.length ? util.formatWithOptions({colors: true}, meta) : meta;
  let log = `\n${timestamp} -- ${level} -- ${message}`;
  log = stack ? `${log}\n${stack}` : log;
  log = meta.length ? `${log}\n${meta}` : log;
  return log;
});

const logger = createLogger({
  transports: [
    new transports.Console({
      format: combine(
        splat(),
        errors({stack: true, cause: true}),
        colorize(),
        timestamp(),
        myFormat
      )
    }),
    new transports.File({
      filename: "server_logs.log",
      dirname: "logs",
      format: combine(errors({stack: true, cause: true}), timestamp(), myFormat)
    })
  ]
});

module.exports = {logger};
