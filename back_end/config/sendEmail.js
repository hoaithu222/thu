import { Resend } from 'resend';
import dotenv from "dotenv"
dotenv.config();


if (!process.env.RESEND_API) {
    console.log("Provider RESEND_API in side the .env file");
    process.exit(1); // Dừng ứng dụng nếu thiếu API key
}
const resend = new Resend(process.env.RESEND_API);
const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'MyShop <onboarding@resend.dev>',
            to: sendTo,
            subject: subject,
            html: html,
        });
        if (error) {
            return console.error({ error });
        }
        return data;

    } catch (error) {
        return console.error({ error });
    }

}

export default sendEmail;