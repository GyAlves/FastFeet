import Deliveries from '../models/Deliveries';
import Problems from '../models/Problems';

class ProblemAdminController {
  async index(req, res) {
    const problems = await Problems.findAll({
      attributes: ['id', 'description'],
      include: [
        {
          model: Deliveries,
          as: 'delivery',
          attributes: [
            'id',
            'product',
            'recipient_id',
            'deliveryman_id',
            'start_date',
            'end_date',
            'canceled_at',
          ],
        },
      ],
    });
    return res.json(problems);
  }

  async update(req, res) {
    const { id } = req.params;
    const problemExists = await Problems.findByPk(id);
    if (!problemExists) {
      return res.status(401).json({ error: 'This problem does not exists' });
    }

    return res.json();
  }
}
export default new ProblemAdminController();
