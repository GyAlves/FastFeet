import { Op } from 'sequelize';
import Deliveries from '../models/Deliveries';
import Deliveryman from '../models/Deliveryman';

class NotAvailableController {
  async index(req, res) {
    const { id } = req.params;
    const deliveryman = await Deliveryman.findByPk(id);
    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman not found' });
    }

    const deliveries = await Deliveries.findAll({
      where: {
        deliveryman_id: req.params.id,
        [Op.or]: [
          { canceled_at: { [Op.gt]: 0 } },
          { end_date: { [Op.gt]: 0 } },
        ],
      },
    });

    if (!deliveries) {
      return res.status(401).json({ error: 'No deliveries available' });
    }

    return res.json(deliveries);
  }
}
export default new NotAvailableController();
