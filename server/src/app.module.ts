import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { resolve } from 'path';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    AuthModule,
    UserModule,
    TrackModule,
    FileModule,
    MongooseModule.forRoot(
      'mongodb+srv://nAzdAc:nAzdAc1996d2d4e2e4@cluster0.d1aatbz.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
