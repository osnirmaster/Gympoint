import { startOfWeek, endOfWeek } from 'date-fns';
import { Op } from 'sequelize';
import Checkin from '../models/Checkin';

class CheckinController {
  async store(req, res) {
    const { studentId } = req.params;

    const maxCheckins = await Checkin.findAll({
      where: {
        student_id: studentId,
        created_at: {
          [Op.between]: [startOfWeek(new Date()), endOfWeek(new Date())],
        },
      },
    });

    if (maxCheckins.length >= 5) {
      return res
        .status(400)
        .json({ error: 'Estudante já atingiu o limite semanal de Checkins' });
    }

    const checkin = await Checkin.create({
      student_id: studentId,
    });

    return res.json(checkin);
  }
}

export default new CheckinController();
