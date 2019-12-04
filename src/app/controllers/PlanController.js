import * as yup from 'yup';

import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll({});

    res.json(plans);
  }

  async store(req, res) {
    const schema = yup.object().shape({
      title: yup.string().required(),
      duration: yup
        .number()
        .integer()
        .positive()
        .required(),
      price: yup
        .number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados de entrada Invalidos' });
    }

    const { title, duration, price } = req.body;

    const plan = await Plan.create({
      title,
      duration,
      price,
    });

    return res.json(plan);
  }

  async update(req, res) {
    const schema = yup.object().shape({
      title: yup.string(),
      duration: yup
        .number()
        .integer()
        .positive(),
      price: yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados de entrada Invalidos' });
    }

    const plan = await Plan.findByPk(req.params.id);

    const { title, duration, price } = await plan.update(req.body);

    return res.json({
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    const plan = await Plan.destroy({ where: { id: req.params.id } });

    return res.json(plan);
  }
}

module.exports = new PlanController();
