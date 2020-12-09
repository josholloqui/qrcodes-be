import { Table, Column, Model, AllowNull, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table
export default class QrCode extends Model<QrCode> {

  @AllowNull(false)
  @Column
  title: string;

  @AllowNull(false)
  @Column
  url: string;

  @AllowNull(false)
  @Column
  qr_code: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

}
