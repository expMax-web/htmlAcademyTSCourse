import { register } from "./logger";
import { Logger, Severity, severityOrder } from "./types";

// Чтобы не смущать прикладного программиста вопросами,
// разрешают ли настройки администратора записывать в журнал
// записи определённого уровня,
// мы воспользуемся NULL-шаблоном.
const noop: () => void = () => undefined;

// Теперь настраиваемый логгер строится
// в два действия.
export const createLoggerFactory = (configuredLevel: Severity) => {
  const configuredIndex = severityOrder.indexOf(configuredLevel);
  // Вычислим функцию проверки
  // допустимости записи в журнал.
  const isLoggingOn = (reportingLevel: Severity) =>
    severityOrder.indexOf(reportingLevel) >= configuredIndex;

  // Вернём фабрику по производству журналов
  // разных категорий.
  return (category: string): Logger => {
    // Для производства журнала нужной категории
    // создадим отдельные методы,
    // где реализация будет зависеть от того,
    // будет ли выполняться реальная запись.
    return severityOrder.reduce((logger, reportingLevel) => {
      logger[reportingLevel] = isLoggingOn(reportingLevel)
        ? (message) => register({ category, message, severity: reportingLevel })
        : noop; // Если запись в журнал не включена, воспользуемся NULL-шаблоном и вернём пустую операцию.
      return logger;
    }, {} as Logger);
  };
};
