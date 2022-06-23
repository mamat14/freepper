package ua.pomo.catalog.infrastructure.persistance.postgres

import doobie.{ConnectionIO, Fragment, Update0}
import doobie.implicits.toSqlInterpolator
import doobie.postgres.implicits.UuidType
import ua.pomo.catalog.domain.PageToken
import ua.pomo.catalog.domain.error.NotFound
import ua.pomo.catalog.domain.image._
import cats.data.OptionT
import cats.implicits.catsSyntaxApplicativeErrorId

object ImageRepositoryImpl extends ImageRepository[ConnectionIO] {
  override def create(image: CreateImageMetadata): doobie.ConnectionIO[ImageId] = Queries
    .create(image)
    .withUniqueGeneratedKeys[ImageId]("id")

  override def get(id: ImageId): doobie.ConnectionIO[Image] = OptionT(Queries.get(id).option)
    .getOrElseF(NotFound("image", id).raiseError[ConnectionIO, Image])

  override def query(req: ImageQuery): doobie.ConnectionIO[List[Image]] = Queries.query(req).to[List]

  override def delete(id: ImageId): doobie.ConnectionIO[Int] = Queries.delete(id).run

  private[persistance] object Queries {
    private def compile(imageSelector: ImageSelector): Fragment = {
      imageSelector match {
        case ImageSelector.All      => fr"1 = 1"
        case ImageSelector.IdIs(id) => fr"im.id = $id"
      }
    }

    def create(image: CreateImageMetadata): doobie.Update0 = {
      sql"""
        insert into images (src, alt) values (${image.src}, ${image.alt})
      """.update
    }

    def query(req: ImageQuery): doobie.Query0[Image] = {
      sql"""
        select id, src, alt
        from images im
        where ${compile(req.selector)}
        ${compileToken(req.page)}
       """.query[Image]
    }

    def get(id: ImageId): doobie.Query0[Image] = query(ImageQuery(ImageSelector.IdIs(id), PageToken.Two))

    def delete(id: ImageId): Update0 = {
      sql"""
        delete from images im
        where ${compile(ImageSelector.IdIs(id))}
      """.update
    }

    def jsonList(imageListId: String): Fragment = {
      sql"""
        (select COALESCE((
            select json_agg(json_build_object('id', img.id, 'src', img.src, 'alt', img.alt) ORDER BY ilm.list_order)
            from images img join image_list_member ilm on img.id = ilm.image_id
            where ilm.image_list_id = ${Fragment.const0(imageListId)}
        ), '[]'::json))
      """
    }

    def json(imageId: String): Fragment =
      sql"""
           (select json_build_object('id', img.id, 'src', img.src, 'alt', img.alt)
            from images img
            where img.id = ${Fragment.const0(imageId)})
      """
  }
}