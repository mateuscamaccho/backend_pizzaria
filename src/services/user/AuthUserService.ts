import prismaClient from '../../prisma';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {

        // Verificar se o e-mail existe
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error("E-mail not found!")
        }

        // Verificar a senha
        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("Incorrect password!")
        }

        // Se deu tudo certo 
        // gerar token JWT e devolver os dados do usuario como id , name, email

        const token = sign(
            {
                name: user.name,
                email:user.email
            },
            process.env.JWT_SECRET,
            {
                subject:user.id,
                expiresIn: '30d'
            }
        )


        return { 
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        };
    }
}

export { AuthUserService } 