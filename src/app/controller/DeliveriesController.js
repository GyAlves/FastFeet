import * as Yup from 'yup';
import Deliveries from '../models/Deliveries';

class DeliveriesController {
  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }

    const {
      id,
      product,
      recipient_id,
      deliveryman_id,
    } = await Deliveries.create(req.body);

    return res.json({
      id,
      product,
      recipient_id,
      deliveryman_id,
    });
  }

  async index(req, res) {
    const deliveries = await Deliveries.findAll();
    return res.json(deliveries);
  }

  async update(req, res) {
    const { id } = req.params;
    const deliveries = await Deliveries.findByPk(id);
    if (!deliveries) {
      return res.status(401).json({ error: 'Delivery does not exists' });
    }
    const {
      product,
      recipient_id,
      deliveryman_id,
      canceled_at,
      start_date,
      end_date,
    } = await deliveries.update(req.body);

    return res.json({
      product,
      recipient_id,
      deliveryman_id,
      canceled_at,
      start_date,
      end_date,
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const deliveries = await Deliveries.findByPk(id);
    if (!deliveries) {
      return res.status(401).json({ error: 'Delivery does not exists' });
    }

    await deliveries.destroy(id);
    return res.json({ message: 'Delivery deleted' });
  }
}
export default new DeliveriesController();
