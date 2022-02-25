import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { sign } from 'jsonwebtoken';

export enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateOAuthLogin(
    thirdPartyId: string,
    name: string,
    provider: Provider,
  ): Promise<string> {
    try {
      // You can add some registration logic here,
      // to register the user using their thirdPartyId (in this case their googleId)
      // let user: IUser = await this.usersService.findOneByThirdPartyId(thirdPartyId, provider);

      // if (!user)
      // user = await this.usersService.registerOAuthUser(thirdPartyId, provider);

      let googleUser = await this.prisma.user.findUnique({
        where: { id: thirdPartyId },
      });

      console.log(googleUser)

      if (!googleUser) {
        await this.prisma.user.create({
          data: {
            id: thirdPartyId,
            name,
          },
        });
      }

      const payload = {
        thirdPartyId,
        provider,
      };

      const jwt: string = sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: 3600,
      });

      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }
}
