import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PRODUCTS_SERVICE } from 'src/config';
import { PaginationDto } from 'src/common';
import { CreateProductDto } from './dto/create-product.dto';
import { firstValueFrom } from 'rxjs';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE) private readonly productsClient: ClientProxy,
  ) {}
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      const productCreated = await firstValueFrom(
        this.productsClient.send({ cmd: 'create_product' }, createProductDto),
      );
      return productCreated;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  getProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send(
      { cmd: 'find_all_products' },
      paginationDto,
    );
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    try {
      const productFound = await firstValueFrom(
        this.productsClient.send({ cmd: 'find_one_product' }, { id }),
      );
      return productFound;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDto,
  ) {
    try {
      body.id = id;
      const productUpdated = await firstValueFrom(
        this.productsClient.send({ cmd: 'update_product' }, body),
      );
      return productUpdated;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    try {
      const productDeleted = await firstValueFrom(
        this.productsClient.send({ cmd: 'remove_product' }, { id }),
      );
      return productDeleted;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
