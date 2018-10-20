/* SystemJS module definition */
declare var module: NodeModule;

interface NodeModule {
  id: string;
}

declare var global: any;

declare namespace NodeJS {
  export interface Global {
    setupTestBed: any;
  }
}

declare var setupTestBed: any;

declare var beforeAll: any;
declare var afterAll: any;
