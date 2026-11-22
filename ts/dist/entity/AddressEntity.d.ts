import { ArtilEntityBase } from '../ArtilEntityBase';
import type { ArtilSDK } from '../ArtilSDK';
import type { Control } from '../types';
import type { Address, AddressLoadMatch, AddressListMatch, AddressCreateData, AddressUpdateData, AddressRemoveMatch } from '../ArtilTypes';
declare class AddressEntity extends ArtilEntityBase<Address> {
    constructor(client: ArtilSDK, entopts: any);
    make(this: AddressEntity): AddressEntity;
    load(this: any, reqmatch?: AddressLoadMatch, ctrl?: Control): Promise<AddressEntity>;
    list(this: any, reqmatch?: AddressListMatch, ctrl?: Control): Promise<AddressEntity[]>;
    create(this: any, reqdata?: AddressCreateData, ctrl?: Control): Promise<AddressEntity>;
    update(this: any, reqdata?: AddressUpdateData, ctrl?: Control): Promise<AddressEntity>;
    remove(this: any, reqmatch?: AddressRemoveMatch, ctrl?: Control): Promise<AddressEntity>;
}
export { AddressEntity };
