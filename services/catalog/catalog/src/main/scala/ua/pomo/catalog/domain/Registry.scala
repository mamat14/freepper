package ua.pomo.catalog.domain

import ua.pomo.catalog.domain.category.CategoryCrud
import ua.pomo.catalog.domain.image.ImageCrud
import ua.pomo.catalog.domain.imageList.ImageListCrud
import ua.pomo.catalog.domain.model.ModelCrud
import ua.pomo.catalog.domain.parameter.ParameterListCrud
import ua.pomo.catalog.domain.product.ProductCrud
import ua.pomo.common.domain.registry
import ua.pomo.common.domain.crud.Crud

import scala.ValueOf

trait Registry[F[_ <: Crud]] {
  def category: F[CategoryCrud]

  def image: F[ImageCrud]

  def imageList: F[ImageListCrud]

  def model: F[ModelCrud]

  def product: F[ProductCrud]

  def parameterList: F[ParameterListCrud]
}

object Registry {
  implicit class RegistryOps[F[_ <: Crud]](r: Registry[F]) {
    def toUntyped: registry.Registry[F] = new registry.Registry[F] {
      override def apply[T <: Crud: ValueOf]: F[T] = {
        val res = implicitly[ValueOf[T]].value match {
          case category.Crud  => r.category
          case image.Crud     => r.image
          case imageList.Crud => r.imageList
          case model.Crud     => r.model
          case product.Crud   => r.product
          case parameter.Crud => r.parameterList
          case _              => throw new IllegalArgumentException("Unknown crud. Pls add this case to Registry type")
        }
        res.asInstanceOf[F[T]]
      }
    }
  }
}
