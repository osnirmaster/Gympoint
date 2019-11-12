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

  async update(req, res) {
    const schema = yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
      age: yup
        .number()
        .positive()
        .integer(),
      weight: yup.number().positive(),
      height: yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Dados de entrada inválidos' });
    }

    const { email } = req.body;

    const student = await Student.findByPk(req.userId);

    if (email !== student.email) {
      const userExist = await Student.findOne({ where: { email } });

      if (userExist) {
        return res.status(400).json({ error: 'Email em utilização' });
      }
    }

    const { id, name, age, weight, height } = await student.update(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }
}

export default new StudentController();
