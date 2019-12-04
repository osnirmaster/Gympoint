import * as yup from 'yup';
import Enrollment from '../models/Enrollment';

class EnrollmentController {
  async store(req, res) {
    const schema = yup.object().shape({
      start_date: yup.date().required(),
      end_date: yup.date().required(),
      price: yup.date().required(),
    });
  }
}

export default new EnrollmentController();
