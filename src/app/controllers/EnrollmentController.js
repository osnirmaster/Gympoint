import * as yup from 'yup';
import { addMonths, format, parseISO, isBefore } from 'date-fns';
import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';
// import Student from '../models/Student';

class EnrollmentController {
  async index(req, res) {
    const enrollment = await Enrollment.findAll({});

    return res.json(enrollment);
  }

  async store(req, res) {
    const schema = yup.object().shape({
      start_date: yup.date().required(),
      student_id: yup.number().required(),
      plan_id: yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados de entrada Invalidos' });
    }

    const { student_id, plan_id, start_date } = req.body;

    if (isBefore(parseISO(start_date), new Date())) {
      return res
        .status(400)
        .json({ error: 'Data informada anterior a data atual' });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) return res.status(400).json({ error: 'Plano nao existe ' });

    const end_date = addMonths(parseISO(start_date), plan.duration);

    const price = plan.duration * plan.price;

    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    return res.json(enrollment);
  }

  async update(req, res) {
    const schema = yup.object().shape({
      start_date: yup.date(),
      student_id: yup.number(),
      plan_id: yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados de entrada inválido' });
    }

    const enrollment = await Enrollment.findByPk(req.params.id);

    if (!enrollment) {
      return res.status(400).json({ error: 'Matricula inexistente' });
    }

    const { start_date, student_id, plan_id } = req.body;

    const plan = await Plan.findByPk(plan_id);

    if (!plan) return res.status(400).json({ error: 'Plano nao existe ' });

    const end_date = addMonths(parseISO(start_date), plan.duration);

    const price = plan.duration * plan.price;

    await enrollment.update({ ...req.body, end_date, price });

    return res.json({
      start_date,
      student_id,
      plan_id,
      price,
      end_date,
    });
  }

  async delete(req, res) {
    const enrollment = await Enrollment.destroy({
      where: { id: req.params.id },
    });

    return res.json(enrollment);
  }
}

export default new EnrollmentController();
