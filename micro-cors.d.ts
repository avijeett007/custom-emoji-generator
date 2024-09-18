declare module 'micro-cors' {
    import { RequestHandler } from 'micro';
    
    interface CorsOptions {
      allowMethods?: string[];
      allowHeaders?: string[];
      exposeHeaders?: string[];
      maxAge?: number;
      origin?: string | string[] | ((req: any) => string | string[]);
      allowCredentials?: boolean;
      runHandlerOnOptionsRequest?: boolean;
    }
  
    function cors(options?: CorsOptions): (handler: RequestHandler) => RequestHandler;
    export = cors;
  }