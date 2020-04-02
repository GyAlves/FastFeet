import * as Yup from 'yup';
import Deliveries from '../models/Deliveries';
import Deliveryman from '../models/Deliveryman';

class AvailableController {
  async index(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }

    const { id } = req.body;

    const deliveryman = await Deliveryman.findByPk(id);
    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman does not exists' });
    }

    const deliveries = await Deliveries.findAll({
      where: { deliveryman_id: req.body.id, canceled_at: null, end_date: null },
    });

    if (!deliveries) {
      return res.status(401).json({ error: 'No available delivery found' });
    }

    return res.json(deliveries);
  }
}
export default new AvailableController();
