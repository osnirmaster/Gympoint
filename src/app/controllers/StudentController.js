import * as yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
      age: yup
        .number()
        .required()
        .integer()
        .positive(),
      weight: yup
        .number()
        .required()
        .positive(),
      height: yup
        .number()
        .required()
        .positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Dados Invalidos' });
    }

    const studentExist = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExist) {
      return res.status(400).json({ error: 'Estudante ja existe' });
    }

    const { id, name, email, age, weight, height } = await Student.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async updater(req, res) {}
}

export default new StudentController();
