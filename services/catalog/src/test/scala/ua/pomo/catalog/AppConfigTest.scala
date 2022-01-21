package ua.pomo.catalog

import cats.implicits.catsStdInstancesForTry
import org.scalatest.EitherValues
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers

import java.io.File
import java.nio.file.Files
import scala.io.Source
import scala.util.Try

class AppConfigTest extends AnyFlatSpec with Matchers with EitherValues {
  import AppConfigTest._

  "AppConfig" should "fail" in {
    val file = mockFile("qewrq qwer qwer")
    AppConfig.loadFromFile[Try](file).toEither.left.value
  }

  it should "read current config" in {
    val file: File = mockFile(Source.fromResource("application.conf").mkString)
    println(Files.readString(file.toPath))
    AppConfig.loadFromFile[Try](file).toEither.value
  }
}

object AppConfigTest {
  def mockFile(fileContents: String): File = {
    val file = File.createTempFile("tmpTestDir", s"application.conf")
    Files.writeString(file.toPath, fileContents)
    file
  }
}