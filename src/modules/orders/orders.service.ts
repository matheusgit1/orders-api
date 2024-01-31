import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  async create(createOrderDto: CreateOrderDto & { client_id: number }) {
    const productsIds = createOrderDto.items.map((item) => item.product_id);
    const uniquesProductsIds = [...new Set(productsIds)];
    const products = await this.productRepo.findBy({
      id: In(uniquesProductsIds),
    });

    if (products.length !== uniquesProductsIds.length) {
      throw new Error(
        `alguns produtos  não existem. Produtos encontrados: ${products.map(
          (p) => p.id,
        )}. Pordutos passados: ${uniquesProductsIds}`,
      );
    }

    const order = Order.create({
      client_id: createOrderDto.client_id,
      items: createOrderDto.items.map((item) => {
        const price = products.find((p) => p.id === item.product_id);
        return {
          price: price.price,
          product_id: item.product_id,
          quantity: item.quantity,
        };
      }),
    });

    await this.orderRepo.save(order);

    await this.amqpConnection.publish('amq.direct', 'OrderCreated', {
      order_id: order.id,
      card_hash: createOrderDto.card_hash,
      total: order.total,
    });
  }

  async findAll(clientId: number) {
    return await this.orderRepo.find({
      where: {
        client_id: clientId,
      },
    });
  }

  async findOne(id: string, clientId: number) {
    return await this.orderRepo.find({
      where: {
        client_id: clientId,
        id: id,
      },
    });
  }
}
