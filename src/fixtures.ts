import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const datasource = app.get<DataSource>(getDataSourceToken());
  await datasource.synchronize(true);

  const productRepo = datasource.getRepository('Product');
  await productRepo.insert([
    {
      id: '03810712-ea47-4892-90ee-ea8528246d59',
      name: 'produto 1',
      description: 'descrição produto 1',
      image_url: 'image_url',
      price: 2,
      active_status: true,
    },
    {
      id: '1edf0461-8a8a-48a2-9641-0512686dfc7b',
      name: 'produto 2',
      description: 'descrição produto 2',
      image_url: 'image_url',
      price: 2,
      active_status: true,
    },
    {
      id: '2546c91a-b96b-4894-beb3-67791a3e023c',
      name: 'produto 9',
      description: 'descrição produto 9',
      image_url: 'image_url',
      price: 9,
      active_status: true,
    },
    {
      id: '27b219cc-ee83-44fb-b649-34abf520fddd',
      name: 'produto 8',
      description: 'descrição produto 8',
      image_url: 'image_url',
      price: 8,
      active_status: true,
    },
    {
      id: '2991f7c3-8113-43a6-ae90-291ef77e16c0',
      name: 'produto 5',
      description: 'descrição produto 5',
      image_url: 'image_url',
      price: 5,
      active_status: true,
    },
    {
      id: '7071433b-8a7e-4fab-9a0a-414ec752d872',
      name: 'produto 4',
      description: 'descrição produto 4',
      image_url: 'image_url',
      price: 4,
      active_status: true,
    },
    {
      id: '8447a157-78bf-4195-ae1c-be608d7a30a0',
      name: 'produto 3',
      description: 'descrição produto 3',
      image_url: 'image_url',
      price: 3,
      active_status: true,
    },
    {
      id: 'debbb9e8-0c7a-4a70-9670-8ad66bd75d9b',
      name: 'produto 7',
      description: 'descrição produto 7',
      image_url: 'image_url',
      price: 7,
      active_status: true,
    },
    {
      id: 'ef5d6ed4-bda5-4eb0-9278-49109ecbc3af',
      name: 'produto 6',
      description: 'descrição produto 6',
      image_url: 'image_url',
      price: 7,
      active_status: true,
    },
  ]);
}
bootstrap();
