import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { CacheModule } from '@nestjs/cache-manager';
import { MemoryStore } from 'cache-manager-memory-store';
import { ConfigModule } from '@nestjs/config';
import { TrackingAssessmentModule } from 'src/modules/tracking_assessment/tracking_assessment.module';
import { TrackingContentModule } from 'src/modules/tracking_content/tracking_content.module';
import { PermissionMiddleware } from './common/middleware/permission.middleware';
import { RolePermissionModule } from './modules/permissionRbac/rolePermissionMapping/role-permission.module';
import { CertificateModule } from './modules/certificate/certificate.module';
import { UserCertificateModule } from './modules/user_certificate/user_certificate.module';

@Module({
  imports: [
    TrackingAssessmentModule,
    TrackingContentModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    CacheModule.register({ isGlobal: true, store: MemoryStore }),
    RolePermissionModule,
    CertificateModule,
    UserCertificateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(PermissionMiddleware).forRoutes('*'); // Apply middleware to the all routes
  // }
}
