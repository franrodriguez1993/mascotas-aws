import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/');

  const config = new DocumentBuilder()
    .setTitle('Pets AWS - Test')
    .setDescription('')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);


  const PORT = process.env.PORT;
  await app.listen(PORT, () => {
    console.log('running in ' + PORT);
  });
}
bootstrap();
