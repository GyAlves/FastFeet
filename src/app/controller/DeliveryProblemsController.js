import DeliveryProblems from '../models/DeliveryProblems';
import Deliveryman from '../models/Deliveryman';
import Deliveries from '../models/Deliveries';

class DeliveryProblemsController {
  async store(req, res) {
    const { userId } = req.params;
    const deliveryman = await Deliveryman.findByPk(userId);
    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman not found' });
    }

    const { id } = req.body;
    const deliveries = await Deliveries.findOne({
      where: { deliveryman_id: userId, id },
    });
    if (!deliveries) {
      return res.status(401).json({ error: 'Delivery not found' });
    }

    const deliveryProblem = await DeliveryProblems.create(req.body);
    return res.json(deliveryProblem);
  }
}
export default new DeliveryProblemsController();
