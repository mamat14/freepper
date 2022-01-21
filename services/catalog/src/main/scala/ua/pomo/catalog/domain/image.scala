package ua.pomo.catalog.domain

import derevo.cats.{eqv, show}
import derevo.derive
import io.estatico.newtype.macros.newtype
import ua.pomo.catalog.optics.uuid

import java.util.UUID


object image {
  @derive(eqv, show, uuid)
  @newtype
  case class ImageId(uuid: UUID)

  @derive(eqv, show)
  @newtype
  case class ImageSrc(value: String)

  @derive(eqv, show)
  @newtype
  case class ImageAlt(value: String)

  @derive(eqv, show)
  case class Image(id: ImageId, src: ImageSrc, alt: ImageAlt)

  @derive(eqv, show, uuid)
  @newtype
  case class ImageListId(uuid: UUID)

  @derive(eqv, show)
  @newtype
  case class ImageListDisplayName(value: String)

  @derive(eqv, show)
  case class ImageList(id: ImageListId, displayName: ImageListDisplayName, images: List[Image])

  @derive(eqv, show)
  case class ImageListUpdate(id: ImageListId, displayName: Option[ImageListDisplayName], images: Option[List[Image]])

  trait ImageListRepository[F[_]] {
    def create(imageList: ImageList): F[ImageListId]
    def get(id: ImageListId): F[ImageList]
    def find(id: ImageListId): F[Option[ImageList]]
    def update(imageList: ImageListUpdate): F[Int]
    def delete(imageListId: ImageListId): F[Int]
  }

  trait ImageListService[F[_]] {
    def create(imageList: ImageList): F[ImageList]
    def get(id: ImageListId): F[ImageList]
    def update(imageList: ImageList): F[ImageList]
    def delete(imageListId: ImageListId): F[Unit]
  }
}