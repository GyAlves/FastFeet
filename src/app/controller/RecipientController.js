import Recipient from '../models/Recipients';

class RecipientController {
  async store(req, res) {
    const recipientExists = await Recipient.findOne({
      where: { name: req.body.name } && { numero: req.body.numero },
    });
    if (recipientExists) {
      return res.status(401).json({ error: 'Destinatário já existe' });
    }
    const recipient = await Recipient.create(req.body);
    return res.json(recipient);
  }
}
export default new RecipientController();
