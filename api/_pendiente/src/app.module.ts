import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductSqlRepository } from './infrastructure/repositories/sql/product-sql.repository';
import { ProductNosqlRepository } from './infrastructure/repositories/nosql/product-nosql.repository';
import { ProductRepository } from './domain/repositories/product.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: 'ProductRepository',
      useFactory: (configService: ConfigService): ProductRepository => {
        const dbType = configService.get<string>('DB_TYPE', 'sql');
        const mongoUri = configService.get<string>('MONGO_URI');
        
        if (dbType === 'nosql' && mongoUri) {
          return new ProductNosqlRepository(mongoUri);
        }
        return new ProductSqlRepository(configService);
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}