import emailjs from 'emailjs-com';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Contact = () => {
  const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    message: yup.string().required('Message is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const templateParams = {
        from_name: values.name,
        from_email: values.email,
        message: values.message,
        to_email: 'medibridgeDev@gmail.com',
      };

      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
        .then((result) => {
          console.log(result.text);
          toast.success('Message sent successfully!');
          resetForm();
        }, (error) => {
          console.log(error.text);
          toast.error('Failed to send message. Please try again.');
        });
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer position="bottom-right" />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              rows="4"
              required
            ></textarea>
            {formik.touched.message && formik.errors.message ? (
              <div className="text-red-500 text-sm">{formik.errors.message}</div>
            ) : null}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-[#3cbece] transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};