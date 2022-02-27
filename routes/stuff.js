const express = require('express');
const router = express.Router();


const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

router.post('/',auth,multer, stuffCtrl.creatThing);
  
  // Pour modifier un thing
  router.put('/:id', auth,multer, stuffCtrl.upddateThing);
  
  //Pour supprimer un élément
  router.delete('/:id',auth, stuffCtrl.deleteThing)
  router.get('/:id',auth, stuffCtrl.getOneThing);
  router.get('/',auth, stuffCtrl.getAllThings);

    module.exports = router;
  