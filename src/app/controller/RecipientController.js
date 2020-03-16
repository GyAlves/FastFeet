import * as Yup from 'yup';
import Recipient from '../models/Recipients';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.string().required(),
      cidade: Yup.string().required(),
      estado: Yup.string().required(),
      cep: Yup.string()
        .required()
        .max(8),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }
    const recipientExists = await Recipient.findOne({
      where: { name: req.body.name } && { numero: req.body.numero },
    });
    if (recipientExists) {
      return res.status(401).json({ error: 'Destinatário já existe' });
    }
    const recipient = await Recipient.create(req.body);
    return res.json(recipient);
  }

  async update(req, res) {
    const { id } = req.params;
    const recipient = await Recipient.findByPk(id);
    if (!recipient) {
      return res.status(401).json({ error: 'Recipient not found' });
    }

    const {
      name,
      rua,
      numero,
      complemento,
      cidade,
      estado,
      cep,
    } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      endereço: {
        rua,
        numero,
        complemento,
        cidade,
        estado,
        cep,
      },
    });
  }
}
export default new RecipientController();
