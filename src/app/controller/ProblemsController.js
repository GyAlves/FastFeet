import * as Yup from 'yup';
import Problems from '../models/Problems';
import Deliveries from '../models/Deliveries';

class ProblemsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      delivery_id: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }

    const { id, delivery_id, description } = await Problems.create(req.body);
    const problem = await Problems.findAll({
      where: id,
      attributes: ['id', 'description'],
      include: [
        {
          model: Deliveries,
          as: 'delivery',
          attributes: [
            'id',
            'product',
            'canceled_at',
            'start_date',
            'end_date',
          ],
        },
      ],
    });
    return res.json(problem);
  }

  async index(req, res) {
    const { id } = req.params;
    const delivery = await Problems.findAll({
      where: { delivery_id: id, deliveryman_id: req.deliverymanId },
      attributes: ['id', 'description'],
      include: [{ model: Deliveries, as: 'delivery' }],
    });
    if (!delivery) {
      return res.json({ error: 'Delivery not found' });
    }
    return res.json(delivery);
  }
}
export default new ProblemsController();
