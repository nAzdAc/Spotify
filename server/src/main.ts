import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  try {
    const PORT = process.env.PORT || 4999;
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    await app.listen(PORT, () =>
      console.log(
        `The best server in the world has already been started on PORT ${PORT}`,
      ),
    );
  } catch (e) {
    console.log(e);
  }
}

start();
