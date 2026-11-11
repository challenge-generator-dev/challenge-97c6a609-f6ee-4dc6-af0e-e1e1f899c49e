import 'reflect-metadata';
import { Controller, Get, Module } from '@nestjs/common';

@Controller('health')
export class HealthController {
    @Get()
    check(): { status: string } {
        return { status: 'ok' };
    }
}

@Module({ controllers: [HealthController] })
export class SampleModule {}