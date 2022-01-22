package ua.pomo.catalog.domain

import cats.{Eq, Show}
import cats.implicits._
import derevo.cats._
import derevo.derive
import io.estatico.newtype.macros.newtype
import ua.pomo.catalog.optics.uuid

import java.util.UUID

object category {
  private type CategoryIdValue = CategoryUUID Either CategoryReadableId
  sealed abstract case class CategoryId private (value: CategoryIdValue)
  object CategoryId {
    def apply(id: CategoryUUID): CategoryId = new CategoryId(Left(id)) {}
    def apply(id: CategoryReadableId)(implicit d: DummyImplicit): CategoryId = new CategoryId(Right(id)) {}
    implicit val show: Show[CategoryId] = _.value.fold(_.show, _.show)
    implicit val eqv: Eq[CategoryId] = _ == _
  }

  @derive(eqv, show)
  @newtype
  case class CategoryReadableId(value: ReadableId)

  @derive(eqv, show, uuid)
  @newtype
  case class CategoryUUID(value: UUID)

  @derive(eqv, show)
  @newtype
  case class CategoryDisplayName(value: String)

  @derive(eqv, show)
  @newtype
  case class CategoryDescription(value: String)

  @derive(eqv, show)
  case class Category(id: CategoryUUID,
                      readableId: CategoryReadableId,
                      displayName: CategoryDisplayName,
                      description: CategoryDescription)

  @derive(eqv, show)
  case class UpdateCategory(id: CategoryId,
                            readableId: Option[CategoryReadableId],
                            displayName: Option[CategoryDisplayName],
                            description: Option[CategoryDescription])

  trait CategoryRepository[F[_]] {
    def create(category: Category): F[CategoryUUID]

    def get(id: CategoryId): F[Category]

    def find(id: CategoryId): F[Option[Category]]

    def findAll(): F[List[Category]]

    def update(req: UpdateCategory): F[Int]

    def delete(id: CategoryId): F[Unit]
  }

  trait CategoryService[F[_]] {
    def createCategory(category: Category): F[Category]

    def get(id: CategoryId): F[Category]

    def findAll(): F[List[Category]]

    def updateCategory(req: UpdateCategory): F[Category]

    def deleteCategory(id: CategoryId): F[Unit]
  }
}
