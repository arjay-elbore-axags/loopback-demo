/// NOTE: Point to ModelBinder path
import { ModelBinder } from './e-commerce/mw-model-binder';
/// NOTE: motor-binder.config of demo
import { configs } from './e-commerce/demo/model-binder.config';

module.exports = (Artist) => {
  Artist.on('attached', () => {
     ModelBinder.bindTo(configs, Artist);
  });  
};
