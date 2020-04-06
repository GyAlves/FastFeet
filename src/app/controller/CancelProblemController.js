import Problems from '../models/Problems';
import Deliveries from '../models/Deliveries';

class CancelProblemController {
  async update(req, res) {
    const { id } = req.params;
    const problemExists = await Problems.findByPk(id);
    if (!problemExists) {
      return res.status(401).json({ error: 'This problem does not exists' });
    }
    const problem = await Problems.findByPk(id);
    const DeliveryId = problem.delivery_id;

    const cancelDelivery = await Deliveries.findByPk(DeliveryId);
    cancelDelivery.canceled_at = new Date();
    await cancelDelivery.save();

    return res.json({ problem, cancelDelivery });
  }
}
export default new CancelProblemController();
