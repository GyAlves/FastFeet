import { Op } from 'sequelize';
import Deliveries from '../models/Deliveries';
import File from '../models/File';
import Deliveryman from '../models/Deliveryman';
import Recipients from '../models/Recipients';

class AvailableDController {
  async index(req, res) {
    const delivery = await Deliveries.findAll({
      where: {
        deliveryman_id: req.deliverymanId,
        [Op.or]: [{ canceled_at: null }, { end_date: null }],
      },
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
    if (!delivery) {
      return res
        .status(401)
        .json({ error: 'This deliveryman does not have deliveries ' });
    }
    return res.json(delivery);
  }
}
export default new AvailableDController();
