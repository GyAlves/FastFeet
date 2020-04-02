import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';
import auth from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }
    const { email, name } = req.body;

    const deliveryman = await Deliveryman.findOne({ where: { email, name } });
    if (!deliveryman) {
      return res.status(401).json({ messager: 'Deliveryman not found' });
    }

    const { id } = deliveryman;
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, auth.secret, {
        expiresIn: auth.expiresIn,
      }),
    });
  }
}
export default new SessionController();
