import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { AuthResolver } from './auth.resolver';
@Module({
	providers: [AuthService, AuthResolver],
	imports: [UserModule,
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.secret
		})
	],
	exports: [AuthService]
})
export class AuthModule {}
