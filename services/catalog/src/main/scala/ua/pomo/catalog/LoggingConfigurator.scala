package ua.pomo.catalog
import ch.qos.logback.classic.{Level, LoggerContext}
import ch.qos.logback.classic.layout.TTLLLayout
import ch.qos.logback.classic.spi.Configurator
import ch.qos.logback.core.{ConsoleAppender, FileAppender}
import ch.qos.logback.core.encoder.LayoutWrappingEncoder
import ch.qos.logback.core.spi.ContextAwareBase
import ch.qos.logback.classic.spi.ILoggingEvent
import scala.jdk.CollectionConverters._

class LoggingConfigurator extends ContextAwareBase with Configurator {
  override def configure(lc: LoggerContext): Unit = {
    addInfo("Setting up default configuration.")
    // same as
    // PatternLayout layout = new PatternLayout();
    // layout.setPattern("%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n");
    val layout = new TTLLLayout
    layout.setContext(lc)
    layout.start()

    val encoder = new LayoutWrappingEncoder[ILoggingEvent]
    encoder.setContext(lc)
    encoder.setLayout(layout)

    val ca = new ConsoleAppender[ILoggingEvent]
    ca.setContext(lc)
    ca.setName("consoleAppender")
    ca.setEncoder(encoder)
    ca.start()

    val logFile = Option(System.getenv("JAVA_LOG_FILE"))
      .filter(_.nonEmpty)
      .getOrElse(throw new IllegalArgumentException("java log file not found"))

    val fa = new FileAppender[ILoggingEvent]
    fa.setContext(lc)
    fa.setName("fileAppender")
    fa.setFile(logFile)
    fa.setEncoder(encoder)
    fa.start()

    val rootLogger = lc.getLogger(org.slf4j.Logger.ROOT_LOGGER_NAME)
    rootLogger.setLevel(Level.INFO)
    rootLogger.addAppender(ca)
    rootLogger.addAppender(fa)

  }
}