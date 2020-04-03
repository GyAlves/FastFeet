import * as Yup from 'yup';
import Deliveries from '../models/Deliveries';
import Deliveryman from '../models/Deliveryman';
import Recipients from '../models/Recipients';
import File from '../models/File';

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
      signature_id,
      canceled_at,
      start_date,
      end_date,
    } = await Deliveries.create(req.body);
    return res.json({
      id,
      product,
      recipient_id,
      deliveryman_id,
      signature_id,
      canceled_at,
      start_date,
      end_date,
    });
  }

  async index(req, res) {
    const deliveries = await Deliveries.findAll({
      attributes: [
        'id',
        'product',
        'recipient_id',
        'deliveryman_id',
        'canceled_at',
        'start_date',
        'end_date',
      ],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Recipients,
          as: 'recipient',
          attributes: [
            'name',
            'rua',
            'numero',
            'complemento',
            'cidade',
            'estado',
            'cep',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(deliveries);
  }

  async update(req, res) {
    const { id } = req.params;
    const delivery = await Deliveries.findByPk(id);
    if (!delivery) {
      return res.status(401).json({ error: 'Delivery not found' });
    }
    await delivery.update(req.body);
    return res.json(delivery);
  }

  async delete(req, res) {
    const { id } = req.params;
    const delivery = await Deliveries.findByPk(id);
    if (!delivery) {
      return res.status(401).json({ error: 'Delivery not found' });
    }
    await delivery.destroy();
    return res.status(401).json({ error: 'Delivery deleted with sucess' });
  }
}
export default new DeliveriesController();
