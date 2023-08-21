import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common';
import {  request } from 'express';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'; 
@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  constructor( ) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((err) => {                         
        return throwError(
          () =>
            new HttpException(
              {
                message: err?.message || err?.detail || 'Something went wrong',
                timestamp: new Date().toISOString(),
                code: err?.code || ""
              },
              err.statusCode || 500
            )
        );
      })
    );
  }}