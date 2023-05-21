const  firebase = require("firebase/app");
const firebaseConfig = require('@config/firebase.config');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});

firebase.initializeApp(firebaseConfig);

const storage = getStorage()

exports.uploadImage = [
    upload.single('avatar'),
    async (req, res)=>{
        try {
            const storageRef = ref(storage, `images/${Date.now()}_${req.file.originalname}`);
            const metadata = {
                contentType: req.file.mimetype
            };

            //upload
            const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

            //upload
            if(snapshot){
                const pathImage = await getDownloadURL(snapshot.ref);
                const actor = req.actor
                actor.avatar = pathImage
                await actor.save()
                return res.status(200).json({
                    success: true,
                    msg:"upload successfull",
                    name: req.file.originalname,
                    type: req.file.mimetype,
                    path: pathImage
                })
            }

        } catch (e) {
            console.log(e);
            res.status(500).send();
        }
    }
]

exports.uploadProfile = async (req, res)=>{
  const { image } = req.body;

  console.log('image', image);
    try {
      // const actor = req.actor
      const actor = await actor.findOne({
        where:{
          id_actor:req.params.id_actor
        },
        logging: false
      });

      if(actor){
        actor.avatar = image
        // const result = await actor.save()
        const result = await actor.update({ avatar: image},{
          where:{
            id_actor: req.params.id_actor
          }
        })
        if(result){
          return res.status(200).json({
            success: true,
            msg:"upload successfull",
            avatar: image
          });
        } 
      }
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
  }