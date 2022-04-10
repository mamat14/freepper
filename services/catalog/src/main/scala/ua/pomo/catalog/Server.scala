package ua.pomo.catalog

import cats.effect.kernel.Resource
import cats.effect.{IO, IOApp}
import fs2.grpc.syntax.all.fs2GrpcSyntaxServerBuilder
import io.grpc.netty.shaded.io.grpc.netty.NettyServerBuilder
import io.grpc.protobuf.services.ProtoReflectionService
import ua.pomo.catalog.app.CatalogImpl
import ua.pomo.catalog.app.programs.{CategoryServiceImpl, ImageListServiceImpl, ModelServiceImpl, ProductServiceImpl}
import ua.pomo.catalog.infrastructure.persistance.{
  CategoryRepositoryImpl,
  ImageListRepositoryImpl,
  ModelRepositoryImpl,
  ProductRepositoryImpl
}

object Server extends IOApp.Simple {

  override def run: IO[Nothing] = AppConfig.loadDefault[IO].flatMap { config =>
    resource(config).useForever
  }

  def resource(config: AppConfig): Resource[IO, io.grpc.Server] = {
    val transactor = TransactorHelpers.fromConfig[IO](config.jdbc)
    val categoryService = CategoryServiceImpl(transactor, CategoryRepositoryImpl())
    val imageListService = ImageListServiceImpl(transactor, ImageListRepositoryImpl())
    val modelService = ModelServiceImpl(transactor, ModelRepositoryImpl())
    val productService = ProductServiceImpl(transactor, ProductRepositoryImpl())
    val catalogService =
      CatalogImpl.makeGrpc[IO](productService, categoryService, modelService, imageListService, config.catalog)
    catalogService.flatMap { service =>
      NettyServerBuilder
        .forPort(config.server.serverPort)
        .addService(service)
        .addService(ProtoReflectionService.newInstance())
        .resource[IO]
        .evalMap(server => IO(server.start()))
    }
  }
}
