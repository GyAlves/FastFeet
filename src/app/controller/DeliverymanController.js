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
  }

  async update(req, res) {
    const { id } = req.params;
    const deliveryman = await Deliveryman.findByPk(id);
    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman not found' });
    }
    const { name, email, avatar_id } = await deliveryman.update(req.body);

    return res.json({ id, name, email, avatar_id });
  }
}
export default new DeliverymanController();
