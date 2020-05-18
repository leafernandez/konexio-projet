const router = require('express').Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const { Validator } = require('node-input-validator');
const picturesDir = './public/';
const User = require('../models/user.model');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, picturesDir);
  },
  filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, Date.now() + '-' + fileName);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error('Seulement formats .png, .jpg and .jpeg autorisés!'));
      }
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json('Erreur: ' + error);
  }
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

router.post('/add', upload.single('picture'), async (req, res) => {
  try {
    const { firstName, lastName, email, password, status, newsletter } = req.body;
    const picture = req.file.filename;
    
    const v = new Validator(req.body, {
      firstName: 'required',
      email: 'required|email',
      password: 'required',
      newsletter: 'boolean'
    });

    const matched = await v.check();
    if (!matched || !picture) {
      return res.status(400).json({
        text: "Validation de formulaire incorrecte"
      });
    }

    // On verifie en base si l'utilisateur existe déjà
    const findUser = await User.findOne({
      email
    });

    if (findUser) {
      return res.status(400).json({
        text: "L'utilisateur existe déjà"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      status,
      picture,
      newsletter
    });

    await newUser.save();

    res.json('Utilisateur ajouté!');
  } catch (error) {
    res.status(400).json('Erreur: ' + error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    const v = new Validator(req.body, {
      firstName: 'required',
    });

    const matched = await v.check();
    if (!matched) {
      return res.status(400).json({
        text: "Validation de formulaire incorrecte"
      });
    }

    user.firstName = req.body.firstName;

    await user.save();

    res.json({ status: 'Utilisateur modifié!' });
  } catch (error) {
    res.status(400).json('Erreur: ' + error);
  }
});

module.exports = router;