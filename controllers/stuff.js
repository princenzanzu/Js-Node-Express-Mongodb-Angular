const Thing = require('../models/Thing');


exports.creatThing = (req, res, next) => {
    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id; // Supprimer l'id envoyé par le front car ce dernier est généré automatiquement par mogodb
      const thing = new Thing({
        //...req.body // recuperer le body du model, ... permet de recuperer tous les elements de req.body
        ...thingObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
        //Pour génerer l'url de l'image
    });
    thing.save() // enregistre notre thing
      .then(()=> res.status(201).json({message:'Objet enregistré'}))
      .catch(()=> res.status(400).json({error:'error'}));
      
  };

  exports.upddateThing = (req,res,next)=>{
        const thingObject = req.file ?
          {
            ...JSON.parse(req.body.thing),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
          } : { ...req.body };
        Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
    .then(()=>res.status(200).json({message:'Objet modifié'}))
    .catch(error =>res.status(400).json(error));
    
};

exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id }).then(
      (thing) => {
        if (!thing) {
          res.status(404).json({
            error: new Error('No such Thing!')
          }); 
        }
        if (thing.userId !== req.auth.userId) {
          res.status(400).json({
            error: new Error('Unauthorized request!')
          });
        }
        Thing.deleteOne({ _id: req.params.id }).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      }
    )
  };

exports.getOneThing = (req, res, next)=>{ // pour recuperer un element precis dans la BD
    Thing.findOne({_id:req.params.id})
    .then(thing =>res.status(200).json(thing))
    .catch(error => res.status(404).json(error));

};

exports.getAllThings = (req, res, next) => { // /api/stuff: endpoint de notre API
    Thing.find() // renvoie un tableau de tous les  things 
    .then(things => res.status(200).json(things)) // une Prmise
    .catch(error => res.status(400).json(error));
    
  };