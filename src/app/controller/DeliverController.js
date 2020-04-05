import { getHours, isSameDay } from 'date-fns';
import * as Yup from 'yup';
import Deliveries from '../models/Deliveries';
import File from '../models/File';
import Recipients from '../models/Recipients';
import Deliveryman from '../models/Deliveryman';

class DeliverController {
  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      signature_id: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }

    const { id } = req.body;
    const { date } = req.query;
    const searchDate = Number(date);
    const end_Date = isSameDay(searchDate, new Date());

    const deliveryCount = await Deliveries.findAndCountAll({
      where: id,
      deliveryman_id: req.deliverymanId,
      end_date: end_Date,
      attributes: ['id', 'product', 'start_date', 'end_date', 'canceled_at'],
    });

    const qtdDeliveiries = deliveryCount.count;
    if (qtdDeliveiries >= 5) {
      return res
        .status(401)
        .json({ error: 'You can only make 5 deliveries a day' });
    }
    const delivery = await Deliveries.findOne({
      where: { id, deliveryman_id: req.deliverymanId },
      attributes: ['id', 'product', 'start_date', 'end_date', 'canceled_at'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Recipients,
          as: 'recipient',
          attributes: [
            'id',
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
    if (!delivery) {
      res
        .status(401)
        .json({ error: 'Delivery man does not have this delivery' });
    }

    const endDate = getHours(searchDate);
    if (endDate < 8 || endDate > 19) {
      return res
        .status(401)
        .json({ error: 'Your can only make deliveries on your work period' });
    }
    delivery.end_date = searchDate;
    await delivery.save();

    return res.json(delivery);
  }
}
export default new DeliverController();
