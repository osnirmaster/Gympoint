import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class EnrollmentMail {
  get key() {
    return 'EnrollmentMail';
  }

  async handle({ data }) {
    const enrollment = data.resultEnrollment;

    console.log('A fila executou');

    await Mail.sendMail({
      to: `${enrollment.student.name} <${enrollment.student.email}>`,
      subject: 'Matricula Efetuada com Sucesso',
      template: 'enrollment',
      context: {
        student: enrollment.student.name,
        idEnrollment: enrollment.id,
        namePlan: enrollment.plan.title,
        endEnrollment: format(
          parseISO(enrollment.end_date),
          "'Dia' dd 'de' MMMM 'de' yyy",
          { locale: pt }
        ),
        priceEnrollment: `R$ ${enrollment.price},00`,
      },
    });
  }
}

export default new EnrollmentMail();
