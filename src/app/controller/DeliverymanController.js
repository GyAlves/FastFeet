import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }
<<<<<<< HEAD
    const deliverymanExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });
    if (deliverymanExists) {
      return res.status(401).json({ error: 'Deliveryman already exists' });
    }
    const { id, name, email } = await Deliveryman.create(req.body);
    return res.json({
      id,
      name,
      email,
    });
  }

  async index(req, res) {
    const deliveryman = await Deliveryman.findAll();
    return res.json(deliveryman);
=======
    const DeliverymanExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });
    if (DeliverymanExists) {
      return res.status(401).json({ error: 'Deliveryman already exists' });
    }
    const deliveryman = await Deliveryman.create(req.body);
    return res.json(deliveryman);
  }

  async index(req, res) {
    const list = await Deliveryman.findAll();
    return res.json(list);
>>>>>>> 4f6769d9a545bd349792cc6f50ec7a3fa4764555
  }

  async update(req, res) {
    const { id } = req.params;
    const deliveryman = await Deliveryman.findByPk(id);
    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman not found' });
    }
    const { name, email, avatar_id } = await deliveryman.update(req.body);
<<<<<<< HEAD
    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const deliveryman = await Deliveryman.findByPk(id);
    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman not found' });
    }
    await deliveryman.destroy(id);
    return res.json({ message: 'Deliveryman deleted' });
=======

    return res.json({ id, name, email, avatar_id });
>>>>>>> 4f6769d9a545bd349792cc6f50ec7a3fa4764555
  }
}
export default new DeliverymanController();
