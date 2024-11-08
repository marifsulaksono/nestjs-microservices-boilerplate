import { HttpStatus } from '@nestjs/common';

// export class CustomError extends Error {
//    constructor(public statusCode: number, public message: string) {
//      super(message);
//    }
//  }

export class CustomHttpExceptionError extends Error {
   public statusCode: number;
   public details: any;
 
   constructor(message: string, statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR, details: any = {}) {
     super(message);
     this.statusCode = statusCode;
     this.details = details;
   }
 }