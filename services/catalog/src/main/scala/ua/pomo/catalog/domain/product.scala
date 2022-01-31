package ua.pomo.catalog.domain

import cats.data.NonEmptyList
import derevo.cats.{eqv, show}
import derevo.derive
import io.estatico.newtype.macros.newtype
import ua.pomo.catalog.domain.image.{Image, ImageList, ImageListId}
import ua.pomo.catalog.domain.model.{ModelDisplayName, ModelId}

import java.util.UUID

object product {
  @derive(eqv, show)
  @newtype
  case class ProductId(value: UUID)

  @derive(eqv, show)
  @newtype
  case class ProductDisplayName(value: String)

  @derive(eqv, show)
  @newtype
  case class FabricUUID(value: UUID)

  @derive(eqv, show)
  @newtype
  case class FabricDisplayName(value: String)

  @derive(eqv, show)
  case class Fabric(id: FabricUUID, displayName: FabricDisplayName, image: Image)

  @derive(eqv, show)
  @newtype
  case class SizeUUID(value: UUID)

  @derive(eqv, show)
  @newtype
  case class SizeDisplayName(value: String)

  @derive(eqv, show)
  case class Size(uuid: SizeUUID, displayName: SizeDisplayName)

  @derive(eqv, show)
  @newtype
  case class ProductStandardPrice(value: Double)

  @derive(eqv, show)
  @newtype
  case class ProductPromoPrice(value: Double)

  @derive(eqv, show)
  case class ProductPrice(standard: ProductStandardPrice, promo: Option[ProductPromoPrice])

  @derive(eqv, show)
  case class Product(id: ProductId,
                     modelId: ModelId,
                     displayName: ProductDisplayName,
                     fabric: Fabric,
                     size: Size,
                     imageList: ImageList,
                     price: ProductPrice)

  object Product {
    def createDisplayName(m: ModelDisplayName, f: FabricDisplayName, s: SizeDisplayName): ProductDisplayName = {
      ProductDisplayName(m.value + f.value + s.value)
    }
  }

  @derive(eqv, show)
  case class CreateProduct(id: ProductId,
                            modelId: ModelId,
                           imageListId: ImageListId,
                           fabricId: FabricUUID,
                           sizeId: SizeUUID,
                           priceUsd: ProductStandardPrice,
                           promoPriceUsd: Option[ProductPromoPrice])

  case class ProductQuery(pageToken: PageToken.NonEmpty, selector: ProductSelector)

  sealed trait ProductSelector

  object ProductSelector {
    final case object All extends ProductSelector

    final case class IdIs(id: ProductId) extends ProductSelector

    final case class IdIn(ids: NonEmptyList[ProductId]) extends ProductSelector

    final case class ModelIs(modelId: ModelId) extends ProductSelector
  }

  @derive(eqv, show)
  case class UpdateProduct(id: ProductId,
                           modelId: Option[ModelId],
                           imageList: Option[ImageListId],
                           fabric: Option[FabricUUID],
                           size: Option[SizeUUID],
                           price: Option[ProductStandardPrice],
                           promoPrice: Option[Option[ProductPromoPrice]])

  trait ProductRepository[F[_]] {
    def create(command: CreateProduct): F[ProductId]

    def get(id: ProductId): F[Product]

    def find(id: ProductId): F[Option[Product]]

    def query(query: ProductQuery): F[List[Product]]

    def update(command: UpdateProduct): F[Int]

    def delete(id: ProductId): F[Unit]
  }

}
