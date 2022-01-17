package ua.pomo.catalog.infrastructure.persistance

import cats.data.OptionT
import cats.implicits.catsSyntaxApplicativeErrorId
import doobie._
import doobie.implicits._
import doobie.postgres.implicits._
import io.circe.Json
import shapeless._
import squants.market.{Money, USD}
import ua.pomo.catalog.domain.category.CategoryUUID
import ua.pomo.catalog.domain.image._
import ua.pomo.catalog.domain.model._

class ModelRepositoryImpl private(imageListRepository: ImageListRepository[ConnectionIO]) extends ModelRepository[ConnectionIO] {

  import ModelRepositoryImpl.Queries

  override def create(model: Model): ConnectionIO[ModelUUID] = for {
    imageListId <- imageListRepository.create(model.imageList)
    modelId <- Queries.create(model, imageListId).withUniqueGeneratedKeys[ModelUUID]("id")
  } yield modelId

  override def get(id: ModelId): ConnectionIO[Model] = {
    OptionT(find(id))
      .getOrElseF(new Exception(s"model with id $id not found").raiseError[ConnectionIO, Model])
  }

  override def find(id: ModelId): ConnectionIO[Option[Model]] = {
    val res = for {
      imageListId :: modelPart <- OptionT(Queries.getModel(id).option)
      imageList <- OptionT.liftF(imageListRepository.get(imageListId))
    } yield Generic[Model].from(modelPart :+ imageList)
    res.value
  }

  override def findAll(req: FindModel): ConnectionIO[List[Model]] = Queries
    .find(req)
    .to[List]

  override def delete(id: ModelId): ConnectionIO[Int] = {
    Queries.delete(id).run
  }

  override def update(req: UpdateModel): ConnectionIO[Int] = ???
}

object ModelRepositoryImpl {
  def apply(impl: ImageListRepository[ConnectionIO]): ModelRepository[ConnectionIO] = new ModelRepositoryImpl(impl)

  private[persistance] object Queries {
    private implicit val readModelMinimalPrice: Read[ModelMinimalPrice] = Read[Double].map(x => ModelMinimalPrice(Money(x, USD)))

    private def toWhereClause(modelId: ModelId): Fragment = {
      modelId.fold(uuid => fr"p.id = $uuid", readableId => fr"p.readable_id = $readableId")
    }

    def create(model: Model, imageListId: ImageListId): Update0 = {
      sql"""
           insert into models (readable_id, display_name, description, category_id, image_list_id)
           VALUES (${model.readableId}, ${model.displayName}, ${model.description}, ${model.categoryId}, $imageListId)
         """.update
    }

    type GetModelQuery = ImageListId :: ModelUUID :: ModelReadableId :: CategoryUUID :: ModelDisplayName :: ModelDescription :: ModelMinimalPrice :: HNil

    def getModel(modelId: ModelId): Query0[GetModelQuery] = {
      sql"""
           select m.image_list_id, m.id, m.readable_id, m.category_id, m.display_name, m.description, min(p.promo_price_usd)
           from models m join products p on m.id = p.model_id
           where ${toWhereClause(modelId)}
           group by m.id
         """.query[GetModelQuery]
    }

    def delete(modelId: ModelId): Update0 = {
      sql"""
           delete from models
           where ${toWhereClause(modelId)}
         """.update
    }

    private type FindQuery = ModelUUID :: ModelReadableId :: CategoryUUID :: ModelDisplayName :: ModelDescription :: ModelMinimalPrice ::
      ImageListId :: ImageListDisplayName :: List[Image] :: HNil
    def find(req: FindModel): Query0[Model] = {
      implicit val readImages: Read[List[Image]] = Read[Json].map { _ =>
        ???
      }

      sql"""
        select m.id, m.readable_id, m.category_id, m.display_name, m.description, min(p.promo_price_usd), il.id, il.display_name, json_agg((img.id, img.src, img.alt))
        from models m join products p on m.id = p.model_id
            join image_lists il on il.id = m.image_list_id
            join image_list_member ilm on m.image_list_id = ilm.image_list_id
            join images img on ilm.image_id = img.id
        where m.category_id = ${req.categoryUUID}
        group by m.id
        order by m.id
        limit ${req.limit}
        offset ${req.offset}
      """.query[FindQuery]
        .map { res =>
          val modelPart_imageListPart = res.split(Nat._6)
          val imageList = Generic[ImageList].from(modelPart_imageListPart._2)
          Generic[Model].from(modelPart_imageListPart._1 :+ imageList)
        }
    }
  }
}
