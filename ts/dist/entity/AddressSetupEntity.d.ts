import { ArtilEntityBase } from '../ArtilEntityBase';
import type { ArtilSDK } from '../ArtilSDK';
import type { Control } from '../types';
import type { AddressSetup, AddressSetupCreateData } from '../ArtilTypes';
declare class AddressSetupEntity extends ArtilEntityBase<AddressSetup> {
    constructor(client: ArtilSDK, entopts: any);
    make(this: AddressSetupEntity): AddressSetupEntity;
    create(this: any, reqdata?: AddressSetupCreateData, ctrl?: Control): Promise<AddressSetupEntity>;
}
export { AddressSetupEntity };
