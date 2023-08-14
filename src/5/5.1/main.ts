import { createLoggerFactory } from "./logger-factory";

// В настройках нашего приложения администратор
// может указать уровень важности сообщений,
// попадающих в лог.
const settings = {
  logLevel: "warning",
} as const;

// Настройки позволяют создать специальную
// функцию для создания журналов разных категорий.
const createLoggerCategory = createLoggerFactory(settings.logLevel);

// Модуль, который хочет вести журнал, создаёт себе
// собственную категорию.
const logger = createLoggerCategory("demo-category");

// В нужных местах записывает в журнал сообщения,
// которые будут зарегистрированы, если их
// важность превышает установленный порог.
logger.error("demo error");
logger.info("demo info");
logger.warning("demo warning");
