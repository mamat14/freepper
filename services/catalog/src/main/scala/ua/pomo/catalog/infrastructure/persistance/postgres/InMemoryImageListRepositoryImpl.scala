package ua.pomo.catalog.infrastructure.persistance.postgres

import cats.MonadThrow
import cats.effect.{Ref, Sync}
import cats.implicits.{catsSyntaxApplicativeErrorId, catsSyntaxApplicativeId, toFlatMapOps, toFunctorOps}
import monocle.syntax.AppliedLens
import monocle.syntax.all._
import shapeless._
import ua.pomo.catalog.domain.image._
import ua.pomo.catalog.domain.imageList._

import java.util.UUID

class InMemoryImageListRepositoryImpl[F[_]: MonadThrow] private (var mapRef: Ref[F, Map[ImageListId, ImageList]])
    extends ImageListRepository[F] {
  override def create(imageList: ImageList): F[ImageListId] = mapRef.modify { map =>
    val id = ImageListId(UUID.randomUUID())
    (map + (id -> imageList.copy(id = id)), id)
  }

  override def get(id: ImageListId): F[ImageList] = {
    find(id)
      .flatMap(_.fold(new Exception("not found").raiseError[F, ImageList])(_.pure[F]))
  }

  override def find(id: ImageListId): F[Option[ImageList]] = mapRef.get.map(_.get(id))
  override def query(query: ImageListQuery): F[List[ImageList]] = mapRef.get.map { map =>
    val filter = query.selector match {
      case ImageListSelector.IdsIn(ids) =>
        (i: ImageList) => ids.toList.toSet.contains(i.id)
      case ImageListSelector.All =>
        (_: ImageList) => true
    }
    map.values
      .filter(filter)
      .toList
      .slice(query.page.offset.toInt, query.page.offset.toInt + query.page.size.toInt)
  }

  override def update(command: ImageListUpdate): F[Int] = mapRef.modify { map =>
    object updateObj extends InMemoryUpdaterPoly[ImageList] {
      implicit val a: Res[ImageListDisplayName] = gen(_.focus(_.displayName))
      implicit val b: Res[List[ImageId]] =
        gen(x =>
          AppliedLens[ImageList, List[ImageId]](
            x,
            monocle.Lens[ImageList, List[ImageId]](_.images.map(_.id))(value =>
              imageList => imageList.copy(images = value.map(id => Image(id, ImageSrc(""), ImageAlt(""))))
            )
          )
        )
    }
    val updater = Generic[ImageListUpdate].to(command).drop(Nat._1).map(updateObj).toList.flatten.reduce(_ andThen _)
    (map.updatedWith(command.id)(_.map(updater)), if (map.contains(command.id)) 1 else 0)
  }

  override def delete(id: ImageListId): F[Int] = mapRef.modify { map =>
    (map - id, if (map.contains(id)) 1 else 0)
  }
}

object InMemoryImageListRepositoryImpl {
  def apply[F[_]: Sync](): ImageListRepository[F] = {
    val ref = Ref.unsafe[F, Map[ImageListId, ImageList]](Map())
    new InMemoryImageListRepositoryImpl[F](ref)
  }
}