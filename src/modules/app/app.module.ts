import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from '../products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { OrdersModule } from '../orders/orders.module';
import { OrderItems } from '../orders/entities/order.items';
import { Order } from '../orders/entities/order.entity';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/auth.guard';
import { RabbitmqmModule } from '../rabbitmqm/rabbitmqm.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      //TODO: Migrar para envs
      type: 'mysql',
      host: 'localhost',
      port: 3306, //porta padrão
      username: 'root',
      password: 'root',
      database: 'nest',
      entities: [Product, OrderItems, Order],
      synchronize: true,
      logging: false,
    }),
    ProductsModule,
    OrdersModule,
    AuthModule,
    RabbitmqmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
