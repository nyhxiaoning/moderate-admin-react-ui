import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from 'src/app.module';
import { ConfigService } from '@nestjs/config';
import { ExceptionsFilter } from 'src/common/filters/exceptions-filter';
import { HttpExceptionsFilter } from 'src/common/filters/http-exceptions-filter';
import { MYValidationPipe } from 'src/common/pipes/validation.pipe';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { mw as requestIpMw } from 'request-ip';

// TODO:记录笔记 // NOTE：
//helmet 通过设置 HTTP 响应标头来帮助保护 Express 应用。
//request-ip 一个用于检索请求 IP 地址的微型Node.js模块。

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  const config = app.get(ConfigService);

  // 设置访问频率
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15分钟
      max: 10000, // 限制15分钟内最多只能访问1000次
    }),
  );

  // 设置 api 访问前缀
  const prefix = config.get<string>('app.prefix');
  console.log('prefix', prefix);
  app.setGlobalPrefix(prefix);
  app.useGlobalPipes(new MYValidationPipe());
  app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalFilters(new HttpExceptionsFilter());

  // TODO:web 安全，防常见漏洞
  // 注意： 开发环境如果开启 nest static module 需要将 crossOriginResourcePolicy 设置为 false 否则 静态资源 跨域不可访问
  app.use(helmet({ crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' }, crossOriginResourcePolicy: false }));

  // 这里配置了点击 "Authorize" 按钮确认授权。
  const swaggerOptions = new DocumentBuilder().setTitle('Nest-Admin').setDescription('Nest-Admin 接口文档').setVersion('2.0.0').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  // 项目依赖当前文档功能，最好不要改变当前地址
  // 生产环境使用 nginx 可以将当前文档地址 屏蔽外部访问
  SwaggerModule.setup(`${prefix}/swagger-ui`, app, document, {
    swaggerOptions: {
      // TODO:swagger打开的时候，
      //当你将 persistAuthorization 设置为 true 时，Swagger UI 会在用户的授权状态持久化，提高了用户体验，特别是在需要频繁进行授权的情况下。
      persistAuthorization: true,
    },
    customSiteTitle: 'Nest-Admin API Docs',
  });

  // 获取真实 ip
  app.use(requestIpMw({ attributeName: 'ip' }));

  //服务端口
  const port = config.get<number>('app.port') || 8080;
  await app.listen(port);

  console.log(`Nest-Admin 服务启动成功 `, '\n', '\n', '服务地址', `http://localhost:${port}${prefix}/`, '\n', 'swagger 文档地址        ', `http://localhost:${port}${prefix}/swagger-ui/`);
}
bootstrap();
