import * as Yup from 'yup';
import Delivery from '../models/Delivery';

class DeliveryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }
    const encomenda = await Delivery.create(req.body);
    return res.json(encomenda);
  }

  async index(req, res) {
    const delivery = await Delivery.findAll();
    return res.json(delivery);
  }

  async update(req, res) {
    const { id } = req.params;
    const delivery = await Delivery.findByPk(id);
    if (!delivery) {
      return res.status(401).json({ error: 'Deliveryman not found' });
    }
    const { product, recipient_id, deliveryman_id } = await delivery.update(
      req.body
    );

    return res.json({
      id,
      product,
      recipient_id,
      deliveryman_id,
    });
  }
}
export default new DeliveryController();
