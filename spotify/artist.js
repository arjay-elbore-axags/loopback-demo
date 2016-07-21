
import { Model, EntityBase } from '../../mw-model-binder';

export default class Artist extends EntityBase {

  constructor() {
    super('Artist');
  }

  getById(id, next) {
    Model.instance.Artist.getArtistById(id, next);
  }

}