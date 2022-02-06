package ua.pomo.catalog.domain

import derevo.cats._
import derevo.derive
import io.estatico.newtype.macros.newtype
import squants.market.Money
import ua.pomo.catalog.domain.category.{CategoryReadableId, CategoryUUID}
import ua.pomo.catalog.domain.image.{ImageList, ImageListId}
import ua.pomo.catalog.optics.uuid

import java.util.UUID

object model {
  @derive(eqv, show, uuid)
  @newtype
  case class ModelId(value: UUID)

  @derive(eqv, show)
  @newtype
  case class ModelReadableId(value: String)

  @derive(eqv, show)
  @newtype
  case class ModelDisplayName(value: String)

  @derive(eqv, show)
  @newtype
  case class ModelDescription(value: String)

  @derive(eqv, show)
  @newtype
  case class ModelImageList(value: ImageList)

  @derive(eqv, show)
  @newtype
  case class ModelMinimalPrice(value: Money)

  @derive(eqv, show)
  case class Model(uuid: ModelId,
                   readableId: ModelReadableId,
                   categoryId: CategoryUUID,
                   displayName: ModelDisplayName,
                   description: ModelDescription,
                   minimalPrice: ModelMinimalPrice,
                   imageList: ImageList)
  @derive(eqv, show)
  case class CreateModel(readableId: ModelReadableId,
                         categoryId: CategoryUUID,
                         displayName: ModelDisplayName,
                         description: ModelDescription,
                         imageListId: ImageListId)

  @derive(eqv, show)
  case class UpdateModel(id: ModelId,
                         readableId: Option[ModelReadableId],
                         categoryId: Option[CategoryUUID],
                         displayName: Option[ModelDisplayName],
                         description: Option[ModelDescription],
                         imageListId: Option[ImageListId])

  @derive(eqv, show)
  case class FindModel(categoryUUID: CategoryUUID, page: PageToken.NonEmpty)

  @derive(eqv, show)
  case class FindModelResponse(models: List[Model], nextPageToken: PageToken)

  trait ModelRepository[F[_]] {
    def create(model: CreateModel): F[ModelId]

    def get(id: ModelId): F[Model]

    def find(id: ModelId): F[Option[Model]]

    def findAll(req: FindModel): F[List[Model]]

    def update(req: UpdateModel): F[Int]

    def delete(id: ModelId): F[Unit]
  }

  trait ModelService[F[_]] {
    def create(category: CreateModel): F[Model]

    def get(id: ModelId): F[Model]

    def findAll(req: FindModel): F[FindModelResponse]

    def update(req: UpdateModel): F[Model]

    def delete(id: ModelId): F[Unit]
  }
}
