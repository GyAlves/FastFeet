import * as Yup from 'yup';
import { parseISO } from 'date-fns';
import Deliveryman from '../models/Deliveryman';
import Deliveries from '../models/Deliveries';

class NotAvailableController {
  async index(req, res) {
    return res.json();
  }
}
export default new NotAvailableController();
