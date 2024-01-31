import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItems } from './order.items';

export enum OrderStatus {
  PENDING = 'pending',
  FAILED = 'failed',
  PAID = 'paid',
}

export type CraeteOrderCommand = {
  client_id: number;
  items: {
    product_id: string;
    quantity: number;
    price: number;
  }[];
};

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  total: number;

  @Column()
  client_id: number;

  @Column()
  status: OrderStatus = OrderStatus.PENDING;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => OrderItems, (item) => item.order, { cascade: ['insert'] })
  items: OrderItems[];

  static create(input: CraeteOrderCommand) {
    const order = new Order();
    order.client_id = input.client_id;
    order.items = input.items.map((item) => {
      const orderItem = new OrderItems();
      orderItem.product_id = item.product_id;
      orderItem.quantity = item.quantity;
      orderItem.price = item.price;
      return orderItem;
    });

    order.total = order.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    return order;
  }
}
