import { getHours } from 'date-fns';
import { Op } from 'sequelize';
import * as Yup from 'yup';
import Deliveries from '../models/Deliveries';
import Deliveryman from '../models/Deliveryman';

class StartDateController {
  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails' });
    }
    // //////////////////////////////////////////////////////////////
    const { userId } = req.params;
    const deliveryman = await Deliveryman.findByPk(userId);
    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman not found' });
    }

    const { id } = req.body;
    const qtdDeliveries = await Deliveries.findAndCountAll({
      where: {
        start_date: { [Op.gt]: 0 },
      },
    });
    if (qtdDeliveries.count >= 5) {
      return res
        .status(401)
        .json({ error: 'You can not do more than 5 deliveries a day' });
    }
    const deliveries = await Deliveries.findOne({
      where: { deliveryman_id: userId, id },
    });
    if (!deliveries) {
      return res.status(401).json({ error: 'Delivery not found' });
    }

    const { date } = req.query;
    if (!date) {
      return res.status(401).json({ error: 'Date was not provided' });
    }

    const searchDate = Number(date);
    const hour = getHours(searchDate);
    if (!(hour > 8 && hour < 18)) {
      return res.json({ message: 'Working Period is over' });
    }
    deliveries.start_date = searchDate;
    await deliveries.save();
    return res.json(deliveries);
  }
}
export default new StartDateController();
