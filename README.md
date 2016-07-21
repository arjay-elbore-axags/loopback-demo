- move 2 files from <root>/models/e-commerce/demo/models folder to <root-folder>/models

- the files from <root>/models/e-commerce/demo/models is the loopback model definition

 - to start 
  npm run start-dev

Definition of Terms;

- Model >> it is loopback Model, the schema or definition is define in <you-model>.json file;
  example schema: 
  {
    "name": "Artist",
    "plural": "Artists",
    "base": "PersistedModel",
    "http": {
      "path": "spotify"
    }
  }
  Please refer to loopback documentation for more details.

  For this demo Artist is Model, it has also have <your-model>.js file. 
  if the Model attached to app it will trigger an event, for this demo we have attached event.
  
  example:
  Artist.on('attached', () => {
    /// Any code here
  });  

- Model consist of entity/entities.
- Entity is features or specific functionality of your app.
  example:
    get list of artist from spotify:
- Entity has route in loopback they call it as remoteMethod.
  this will attached to a entity:

  example of route.
  {
    getById: {
      accepts: [
        { 
          arg: 'id', 
          type: 'string', 
          required: true, 
          default: '1Cs0zKBU1kc0i8ypK3B9ai' 
        }
      ],
      http: {
        verb: 'GET',
        path: '/artist/:id'
      }, 
      returns: {
        root: true
      } 
    },
    isEnable: true
  }

  getById => is your feature to get list of artist:
  isEnable => property is a value if you want to disable getById, set to true to enable it.

  - Route is the schema for your function, you can define parameters, url and return data;
    For more details, please look for loopback documentations under remoteMethods.

  ## How it works?
  When attached event of the Model trigger, it will call the 
    ModelBinder.bindTo(configs, Artist);

  ## Parameters
  - configs => is a configuration file contains all your entities.
    For configs example. please look at folder
      demo/model-binder.config.js
  - Artist => is the loopback Model that we define.

  ## ModelBinder works
  1. Get all files define on the configs.files[index].include;
  2. Create an instance of all files
  3. Check if it is instance of EntityBase
    EntityBase => is a base class of your Entity it has onInit function
  4. then execute the onInit function


  ### Exercise
  ## Create Entity the get the list of Related Artist with a given Id
  1. add template to our existing datasources.json (artistSpotifyRest.operations)
        {
          "template": {
            "method": "GET",
            "url": "https://api.spotify.com/v1/artists/{id}/related-artists"
          },
          "functions": {
            "getSpotifyRelatedArtistById": ["id"]
          }        
       }  
  2. add Entity for Related Artist
    - create a file in demo/spotify/related-artist.js
    - add this line to the file.

    import { Model, EntityBase  } from '../../mw-model-binder';

    export default class RelatedArtist extends EntityBase {
      constructor(){
        super('Artist');
      }
      getRelatedArtistById(id, next){
        Model.instance.Artist.getSpotifyRelatedArtistById(id, next);
      }
    }

    Note: notice in super we pass 'Artist'. 
      meaning, Model for Enity is Artist.

  3. Add Route to feature/function
    - create a file under demo/spotify/related-artist.route.js
    - add this line to the file.

    module.exports = {
      getRelatedArtistById: {
        accepts: [
          { 
            arg: 'id', 
            type: 'string', 
            required: true, 
            default: '1Cs0zKBU1kc0i8ypK3B9ai' 
          }
        ],
        http: {
          verb: 'GET',
          path: '/related-artists/:id'
        }, 
        returns: {
          root: true
        } 
      },
      isEnable: true
    }
  4. then `npm run start-dev`
  5. check the swagger if getRelatedArtistById is available
    - it should be under spotify
    