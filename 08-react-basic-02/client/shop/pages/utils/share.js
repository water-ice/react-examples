import net from '@shop/utils/net';
import API_ROOT from '@shop/constants/apiRoot';
import { shareFn } from '@common/js/utils/share';
export const setShare = shareFn(net, "shop", API_ROOT);
