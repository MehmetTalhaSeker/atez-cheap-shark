import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {CheapSharkDataSource} from '../datasources';
import {Game, Store} from '../models';

export interface CheapSharkStoreModel extends Store {
  storeID: string;
  storeName: string;
  images: {
    logo: string;
  };
}

export interface CheapShark {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  getAllStores(path: string): Promise<CheapSharkStoreModel[]>;

  searchGames(path: string, title: string): Promise<Game[]>;

  setAlarm(
    path: string,
    action: string,
    email: string,
    gameID: string,
    price: string,
  ): Promise<boolean>;
}

export class CheapSharkProvider implements Provider<CheapShark> {
  constructor(
    // CheapShark must match the name property in the datasource json file
    @inject('datasources.CheapShark')
    protected dataSource: CheapSharkDataSource = new CheapSharkDataSource(),
  ) {}

  value(): Promise<CheapShark> {
    return getService(this.dataSource);
  }
}
