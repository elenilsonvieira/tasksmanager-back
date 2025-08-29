import 'dotenv/config';
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Configuração do transporte (Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Rota para enviar convites
app.post("/send-invite", async (req, res) => {
  const { emailDestino, nomeDestino, nomeEquipe } = req.body;

  if (!emailDestino || !nomeDestino || !nomeEquipe) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes." });
  }

  try {
    await transporter.sendMail({
      from: '"SoftTech" <${process.env.EMAIL_USER}>',
      to: emailDestino,
      subject: `Convite para a equipe ${nomeEquipe}`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="text-align: center;">
              <img src="https://res.cloudinary.com/drb0irolz/image/upload/v1756353678/Logo_Gimp_2_e5qmpc.png" alt="SoftTech Logo" style="width: 180px;"/>
              <h2 style="color: #1976d2;">Convite Atarefado</h2>
            </div>
            <p style="font-size: 16px; color: #333;">Olá <strong>${nomeDestino}</strong>,</p>
            <p style="font-size: 15px; color: #333;">
              Você foi convidado(a) para participar da equipe <strong>${nomeEquipe}</strong> no app <strong>Atarefado</strong>.
            </p>
            <p style="font-size: 15px; color: #333;">
              Para aceitar, abra o aplicativo e confirme o convite na aba <em>Usuários</em>.
            </p>
            <div style="margin: 20px 0; text-align: center;">
              <a href="https://seuapp.com/aceitar" style="background: #1e88e5; color: #fff; text-decoration: none; padding: 12px 20px; border-radius: 5px; font-weight: bold; display: inline-block;">
                Aceitar Convite
              </a>
            </div>
            <p style="font-size: 12px; color: gray; text-align: center;">
              Se você não reconhece este convite, ignore este e-mail.
            </p>
          </div>
        </div>
      `,
    });

    const logMsg = `${new Date().toISOString()} - Enviado para: ${emailDestino}, Equipe: ${nomeEquipe}\n`;
    fs.appendFileSync('email_log.txt', logMsg);

    res.json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    const logErr = `${new Date().toISOString()} - ERRO para: ${emailDestino}, Erro: ${error.message}\n`;
    fs.appendFileSync('email_log.txt', logErr);

    res.status(500).json({ error: "Erro ao enviar email", detalhes: error.message });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
