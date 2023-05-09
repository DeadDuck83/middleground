// global.d.ts

declare global {
  namespace NodeJS {
    interface Global {
      mongo: {
        conn: null | { client: any; db: any };
        promise: null | Promise<{ client: any; db: any }>;
      };
    }
  }
}

// This empty export is necessary to make this a module instead of a script.
export {};
